import { track as coreTrack } from "@/lib/core/analytics";

/**
 * UI TRACK ALIAS (NO LOGIC LAYER)
 *
 * RULES:
 * - NO side effects
 * - NO imports of event types
 * - NO transformations
 * - NO future extensions allowed
 *
 * This exists ONLY for ergonomic imports.
 */
export const track = coreTrack;
