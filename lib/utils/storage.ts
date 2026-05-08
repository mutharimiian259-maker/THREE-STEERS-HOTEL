export function safeJsonParse<T>(raw: string | null): T | null {
  if (!raw) return null;

  try {
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn("[storage] JSON parse failed", err);
    return null;
  }
}

/* =============================================================
   STORAGE READ
   ============================================================= */

export function storageGet<T>(key: string): T | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(key);
    return safeJsonParse<T>(raw);
  } catch (err) {
    console.error("[storage] read failed", { key, err });
    return null;
  }
}

/* =============================================================
   STORAGE WRITE (QUOTA SAFE)
   ============================================================= */

export function storageSet<T>(key: string, value: T): boolean {
  if (typeof window === "undefined") return false;

  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.error("[storage] write failed", { key, err });

    // optional hook point for future fallback (IndexedDB, server sync)
    return false;
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
    console.error("[storage] remove failed", { key, err });
  }
}

/* =============================================================
   BOUNDED ARRAY APPEND (SAFE + CONSISTENT)
   ============================================================= */

export function storageAppend<T>(
  key: string,
  item: T,
  maxLength: number
): boolean {
  if (typeof window === "undefined") return false;

  try {
    const existing = storageGet<T[]>(key);

    const arr = Array.isArray(existing) ? existing : [];

    const updated = [...arr, item];

    const trimmed =
      updated.length > maxLength
        ? updated.slice(updated.length - maxLength)
        : updated;

    return storageSet(key, trimmed);
  } catch (err) {
    console.error("[storage] append failed", {
      key,
      err,
    });

    return false;
  }
}

/* =============================================================
   STORAGE HEALTH CHECK
   ============================================================= */

export function storageHealthCheck(): {
  available: boolean;
  quota_test: boolean;
} {
  if (typeof window === "undefined") {
    return { available: false, quota_test: false };
  }

  try {
    const testKey = "__storage_test__";

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
