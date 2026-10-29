/** Liveness probe for uptime monitoring. Reports nothing sensitive. */
export function GET() {
  return Response.json({ status: "ok" }, { headers: { "Cache-Control": "no-store" } });
}
