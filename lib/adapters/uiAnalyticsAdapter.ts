import { track as coreTrack } from "@/lib/core/analytics";

/* =============================================================
   UI TRACK ALIAS (PURE PASS-THROUGH CONTRACT BOUNDARY)
   ============================================================= */

/**
 * This is a STRICT pass-through boundary.
 *
 * RULES:
 * - No logic
 * - No transformation
 * - No extensions
 * - No fallback behavior
 *
 * PURPOSE:
 * Enforces a single controlled entry point into Core Analytics.
 */

export const track = coreTrack;
