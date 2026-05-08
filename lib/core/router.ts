import type { StoredEvent } from "./types";

/* =============================================================
   CORE ROUTER
   -------------------------------------------------------------
   Central adapter fanout pipeline.

   Responsibilities:
   - adapter registration
   - dispatch orchestration
   - adapter isolation
   - dispatch observability
   - runtime diagnostics

   Forbidden:
   - business logic
   - analytics semantics
   - UI concerns
   - localStorage ownership
   ============================================================= */

/* =============================================================
   ADAPTER CONTRACT
   ============================================================= */

export type EventAdapter = Readonly<{
  name: string;

  handle(
    event: StoredEvent
  ): void | Promise<void>;
}>;

/* =============================================================
   DISPATCH RESULT
   ============================================================= */

export type DispatchResult = Readonly<{
  success: boolean;

  adapter: string;

  duration_ms: number;

  error?: unknown;
}>;

/* =============================================================
   ROUTER STATE
   ============================================================= */

const adapters = new Map<
  string,
  EventAdapter
>();

let DEBUG = false;

let LOCKED = false;

/* =============================================================
   DEBUG CONTROL
   ============================================================= */

export function setRouterDebug(
  value: boolean
): void {
  DEBUG = value;
}

/* =============================================================
   LOGGER
   ============================================================= */

function debugLog(
  message: string,
  payload?: unknown
): void {
  if (!DEBUG) return;

  console.log(
    `[ROUTER] ${message}`,
    payload ?? ""
  );
}

/* =============================================================
   INVARIANT
   ============================================================= */

function invariant(
  condition: unknown,
  message: string
): asserts condition {
  if (!condition) {
    throw new Error(`[ROUTER] ${message}`);
  }
}

/* =============================================================
   TIMEOUT WRAPPER
   Prevent hanging adapters
   ============================================================= */

async function withTimeout<T>(
  promise: Promise<T>,
  timeout_ms = 3000
): Promise<T> {
  return await Promise.race([
    promise,

    new Promise<T>((_, reject) =>
      setTimeout(() => {
        reject(
          new Error(
            `Adapter timeout after ${timeout_ms}ms`
          )
        );
      }, timeout_ms)
    ),
  ]);
}

/* =============================================================
   REGISTER ADAPTER
   ============================================================= */

export function registerAdapter(
  adapter: EventAdapter
): void {
  invariant(
    !LOCKED,
    `Cannot register adapter "${adapter.name}" after router initialization`
  );

  invariant(
    adapter &&
      typeof adapter.name === "string" &&
      typeof adapter.handle === "function",
    "Invalid adapter contract"
  );

  if (adapters.has(adapter.name)) {
    debugLog(
      `adapter already registered: ${adapter.name}`
    );

    return;
  }

  adapters.set(adapter.name, Object.freeze(adapter));

  debugLog(
    `adapter registered: ${adapter.name}`
  );
}

/* =============================================================
   INITIALIZE ROUTER
   Prevent future mutation
   ============================================================= */

export function initializeRouter(): void {
  LOCKED = true;

  debugLog("router locked", {
    adapters: [...adapters.keys()],
  });
}

/* =============================================================
   RESET ROUTER (DEV ONLY)
   ============================================================= */

export function resetAdapters(): void {
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "[ROUTER] resetAdapters() forbidden in production"
    );
  }

  adapters.clear();

  LOCKED = false;

  debugLog("router reset");
}

/* =============================================================
   DISPATCH
   Controlled async fanout pipeline
   ============================================================= */

export async function dispatch(
  event: StoredEvent
): Promise<
  readonly DispatchResult[]
> {
  invariant(event, "dispatch requires event");

  if (adapters.size === 0) {
    console.warn(
      "[ROUTER] no adapters registered — event dropped",
      event
    );

    return Object.freeze([]);
  }

  const dispatch_id =
    crypto.randomUUID();

  debugLog("dispatch started", {
    dispatch_id,
    event_id: event.id,
    type: event.type,
    adapters: adapters.size,
  });

  const adapterList = [
    ...adapters.values(),
  ];

  const results = await Promise.allSettled(
    adapterList.map(async (adapter) => {
      const started = performance.now();

      try {
        await withTimeout(
          Promise.resolve(
            adapter.handle(event)
          )
        );

        const result: DispatchResult =
          Object.freeze({
            success: true,

            adapter: adapter.name,

            duration_ms:
              performance.now() - started,
          });

        debugLog("adapter success", {
          dispatch_id,
          adapter: adapter.name,
        });

        return result;
      } catch (error) {
        console.error(
          `[ROUTER ERROR] ${adapter.name}`,
          error
        );

        const result: DispatchResult =
          Object.freeze({
            success: false,

            adapter: adapter.name,

            duration_ms:
              performance.now() - started,

            error,
          });

        return result;
      }
    })
  );

  const normalizedResults =
    results.map((result) => {
      if (result.status === "fulfilled") {
        return result.value;
      }

      return Object.freeze({
        success: false,

        adapter: "unknown",

        duration_ms: 0,

        error: result.reason,
      });
    });

  debugLog("dispatch completed", {
    dispatch_id,

    successful:
      normalizedResults.filter(
        (r) => r.success
      ).length,

    failed:
      normalizedResults.filter(
        (r) => !r.success
      ).length,
  });

  return Object.freeze(
    normalizedResults
  );
}

/* =============================================================
   INTROSPECTION
   ============================================================= */

export function getAdapters(): readonly string[] {
  return Object.freeze([
    ...adapters.keys(),
  ]);
}

/* =============================================================
   ROUTER STATUS
   ============================================================= */

export function getRouterStatus() {
  return Object.freeze({
    locked: LOCKED,

    debug: DEBUG,

    adapters: getAdapters(),

    adapter_count: adapters.size,
  });
}
