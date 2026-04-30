export function trackLead(source: string) {
  fetch("/api/leads", {
    method: "POST",
    body: JSON.stringify({
      source,
      time: new Date().toISOString(),
    }),
  });
}
