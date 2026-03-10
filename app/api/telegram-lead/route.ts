import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  const lead = body.record;

  const createdAt = lead.created_at
    ? new Date(lead.created_at).toLocaleString("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Europe/London",
      })
    : new Date().toLocaleString("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Europe/London",
      });

  /* ─────────────────────────────────────────
     TELEGRAM — clean, emoji-rich plain text
  ───────────────────────────────────────── */
  const telegramMessage = `
🚀 *New Lead — Junixo Digital*

👤 *Name:* ${lead.full_name ?? "—"}
📧 *Email:* ${lead.email ?? "—"}
📞 *Phone:* ${lead.phone ?? "—"}
🌐 *Website:* ${lead.website_url ?? "—"}
🎯 *Service:* ${lead.service ?? "—"}
📄 *Source Page:* ${lead.source_page ?? "—"}
🕐 *Received:* ${createdAt}

💬 *Message:*
${lead.message ?? "—"}

━━━━━━━━━━━━━━━━━━━━
_Reply within 24 hrs to confirm the strategy call._
`.trim();

  await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: "Markdown",
      }),
    }
  );

  /* ─────────────────────────────────────────
     EMAIL — rich HTML template
  ───────────────────────────────────────── */
  const detailRows = [
    { label: "👤 Full Name",  value: lead.full_name   ?? "—", link: undefined },
    { label: "📧 Email",      value: lead.email       ?? "—", link: lead.email       ? `mailto:${lead.email}`   : undefined },
    { label: "📞 Phone",      value: lead.phone       ?? "—", link: lead.phone       ? `tel:${lead.phone}`      : undefined },
    { label: "🌐 Website",    value: lead.website_url ?? "—", link: lead.website_url ?? undefined },
    { label: "🎯 Service",    value: lead.service     ?? "—", link: undefined },
    { label: "📄 Source",     value: lead.source_page ?? "—", link: undefined },
  ];

  const detailRowsHtml = detailRows
    .map(
      ({ label, value, link }) => `
      <tr>
        <td style="padding:11px 0;width:36%;vertical-align:top;border-bottom:1px solid #f3f4f6;">
          <span style="font-size:13px;font-weight:600;color:#6b7280;">${label}</span>
        </td>
        <td style="padding:11px 0;vertical-align:top;border-bottom:1px solid #f3f4f6;">
          ${
            link && value !== "—"
              ? `<a href="${link}" style="font-size:13px;font-weight:700;color:#f97316;text-decoration:none;">${value}</a>`
              : `<span style="font-size:13px;font-weight:700;color:#111827;">${value}</span>`
          }
        </td>
      </tr>`
    )
    .join("");

  const htmlEmail = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>New Lead — Junixo Digital</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f3f4f6;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;">

          <!-- ── HEADER ── -->
          <tr>
            <td style="background:linear-gradient(135deg,#f97316 0%,#ea580c 100%);border-radius:16px 16px 0 0;padding:36px 44px 32px;text-align:center;">
              <p style="margin:0 0 8px;color:#fed7aa;font-size:11px;font-weight:800;letter-spacing:3px;text-transform:uppercase;">Junixo Digital · Lead Alert</p>
              <h1 style="margin:0 0 6px;color:#ffffff;font-size:28px;font-weight:900;letter-spacing:-0.5px;">🔥 New Lead Received</h1>
              <p style="margin:0;color:#ffedd5;font-size:13px;">📅 ${createdAt}</p>
            </td>
          </tr>

          <!-- ── ALERT BANNER ── -->
          <tr>
            <td style="background:#fff7ed;border-left:1px solid #fed7aa;border-right:1px solid #fed7aa;padding:16px 44px;">
              <p style="margin:0;font-size:13px;color:#9a3412;font-weight:600;line-height:1.5;">
                ⚡ Incoming enquiry via <strong>${lead.source_page ?? "your website"}</strong>.
                Respond within 24 hours to maximise conversion.
              </p>
            </td>
          </tr>

          <!-- ── MAIN CARD ── -->
          <tr>
            <td style="background:#ffffff;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;padding:32px 44px 36px;">

              <!-- Contact details heading -->
              <p style="margin:0 0 14px;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#9ca3af;">Contact Details</p>

              <!-- Details rows -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:32px;">
                ${detailRowsHtml}
              </table>

              <!-- Message heading -->
              <p style="margin:0 0 10px;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#9ca3af;">💬 Their Message</p>

              <!-- Message bubble -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:36px;">
                <tr>
                  <td style="background:#f9fafb;border:1px solid #e5e7eb;border-left:4px solid #f97316;border-radius:0 12px 12px 0;padding:18px 22px;">
                    <p style="margin:0;font-size:14px;color:#374151;line-height:1.75;">${(lead.message ?? "—").replace(/\n/g, "<br/>")}</p>
                  </td>
                </tr>
              </table>

              <!-- CTA button -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td align="center">
                    <a href="mailto:${lead.email ?? ""}"
                      style="display:inline-block;background:#f97316;color:#ffffff;font-size:14px;font-weight:800;text-decoration:none;padding:15px 40px;border-radius:50px;letter-spacing:0.4px;box-shadow:0 4px 14px rgba(249,115,22,0.35);">
                      Reply to ${lead.full_name?.split(" ")[0] ?? "Lead"} →
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ── FOOTER ── -->
          <tr>
            <td style="background:#f9fafb;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 16px 16px;padding:20px 44px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.6;">
                Sent automatically by the <strong style="color:#6b7280;">Junixo Digital</strong> lead management system.<br/>
                You're receiving this because a visitor submitted a form on your website.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`.trim();

  /* ── Plain-text fallback ── */
  const textFallback = `
New Lead — Junixo Digital
Received: ${createdAt}

Name:        ${lead.full_name   ?? "—"}
Email:       ${lead.email       ?? "—"}
Phone:       ${lead.phone       ?? "—"}
Website:     ${lead.website_url ?? "—"}
Service:     ${lead.service     ?? "—"}
Source Page: ${lead.source_page ?? "—"}

Message:
${lead.message ?? "—"}
`.trim();

  await resend.emails.send({
    from: "Junixo Leads <onboarding@resend.dev>",
    to: process.env.LEAD_EMAIL!,
    replyTo: lead.email ?? undefined,
    subject: `🔥 New Lead: ${lead.service ?? "Website Enquiry"} — ${lead.full_name ?? "Unknown"}`,
    html: htmlEmail,
    text: textFallback,
  });

  return new Response("ok");
}