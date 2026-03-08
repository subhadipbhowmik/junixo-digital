export async function POST(req: Request) {
  const body = await req.json();

  const lead = body.record;

  const message = `
🔥 New Lead

👤 Name: ${lead.name}
📧 Email: ${lead.email}
🏢 Company: ${lead.company}
📱 Platforms: ${lead.platforms}
`;

  await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message,
      }),
    }
  );

  return new Response("ok");
}