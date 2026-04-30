export async function POST(req: Request) {
  const body = await req.json();

  console.log("NEW LEAD:", body);

  return Response.json({ success: true });
}
