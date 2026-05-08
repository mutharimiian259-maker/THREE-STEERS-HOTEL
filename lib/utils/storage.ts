/* =============================================================
   STORAGE UTILITIES — GOVERNED PERSISTENCE LAYER

   Responsibilities:
   - Safe localStorage access
   - Schema corruption protection
   - Version-safe data handling
   - Bounded array management

   Rules:
   - No business logic
   - No event knowledge
   - No schema assumptions
   - No cross-key coupling
   ============================================================= */

/* =============================================================
   SAFE JSON PARSE
   ============================================================= */

export function safeJsonParse<T>(
  raw: string | null
): T | null {
  if (!raw) return null;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

/* =============================================================
   STORAGE READ
   ============================================================= */

export function storageGet<T>(
  key: string
): T | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(key);
    return safeJsonParse<T>(raw);
  } catch (err) {
    console.warn("[storage] read failed", {
      key,
      err,
    });
    return null;
  }
}

/* =============================================================
   STORAGE WRITE
   ============================================================= */

export function storageSet<T>(
  key: string,
  value: T
): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  } catch (err) {
    console.error("[storage] write failed", {
      key,
      err,
    });
  }
}

/* =============================================================
   STORAGE REMOVE
   ============================================================= */

export function storageRemove(key: string): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error("[storage] remove failed", {
      key,
      err,
    });
  }
}

/* =============================================================
   BOUNDED ARRAY APPEND (SAFE EVENT LOGGING)
   ============================================================= */

export function storageAppend<T>(
  key: string,
  item: T,
  maxLength: number
): void {
  if (typeof window === "undefined") return;

  const existing =
    storageGet<T[]>(key);

  const arr = Array.isArray(existing)
    ? existing
    : [];

  const updated = [...arr, item];

  // enforce bounded storage (prevents memory leaks)
  const trimmed =
    updated.length > maxLength
      ? updated.slice(
          updated.length - maxLength
        )
      : updated;

  storageSet(key, trimmed);
}

/* =============================================================
   STORAGE HEALTH CHECK (DEBUGGING ONLY)
   ============================================================= */

export function storageHealthCheck(): {
  available: boolean;
  quota_test: boolean;
} {
  if (typeof window === "undefined") {
    return {
      available: false,
      quota_test: false,
    };
  }

  try {
    const testKey =
      "__storage_test__";

    localStorage.setItem(testKey, "1");
    localStorage.removeItem(testKey);

    return {
      available: true,
      quota_test: true,
    };
  } catch {
    return {
      available: false,
      quota_test: false,
    };
  }
}
