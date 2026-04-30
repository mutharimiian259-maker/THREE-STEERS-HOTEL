export type FunnelStep =
  | "VISIT"
  | "ROOM_VIEW"
  | "INTENT"
  | "CONTACT"
  | "BOOKED";

export function setFunnelStep(step: FunnelStep) {
  const current = localStorage.getItem("funnel_step");

  localStorage.setItem("funnel_step", step);

  console.log("FUNNEL:", current, "→", step);
}

export function getFunnelStep(): FunnelStep | null {
  return localStorage.getItem("funnel_step") as FunnelStep;
}
