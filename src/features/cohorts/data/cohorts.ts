import type { Cohort, Loadable } from "@/types/domain";

/**
 * Cohort data adapter. Returns no cohorts until the backend is connected — the reference site
 * showed "No Active Cohorts" when observed, and we must not fake availability.
 * Swap the body for a server call (src/server/services/cohorts.ts) later; the UI handles every state.
 */
export async function listActiveCohorts(): Promise<Loadable<Cohort[]>> {
  const cohorts: Cohort[] = [];
  return cohorts.length ? { state: "ready", data: cohorts } : { state: "empty" };
}
