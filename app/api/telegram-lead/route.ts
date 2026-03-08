import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  const lead = body.record;

  const message = `
🔥 New Lead

Name: ${lead.name}
Email: ${lead.email}
Company: ${lead.company}
Platforms: ${lead.platforms}
`;

  /* TELEGRAM */
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

  /* EMAIL */
  await resend.emails.send({
    from: "Junixo Leads <onboarding@resend.dev>",
    to: process.env.LEAD_EMAIL!,
    subject: "🔥 New Website Lead",
    text: message,
  });

  return new Response("ok");
}