export async function GET(request, { params }) {
  const { address } = await params;
  const backend_url = process.env.BACKEND_API_URL;

  try {
    const response = await fetch(`${backend_url}/pnl/${address}`);

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Backend fetch failed" }), {
        status: response.status,
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
