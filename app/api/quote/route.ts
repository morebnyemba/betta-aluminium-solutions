import { NextResponse } from "next/server";
import { validateQuote, type QuoteInput } from "@/lib/quote";
import { email as businessEmail } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Quote enquiry endpoint.
 *
 * No email or CRM provider is configured yet, so this route validates the
 * enquiry and then hands it to `deliver()`. To connect a backend, set
 * QUOTE_WEBHOOK_URL (any endpoint that accepts a JSON POST — Formspree, n8n,
 * a Zap, your own service), or replace the body of `deliver()` with a call to
 * Resend, SendGrid, Postmark or SMTP. Nothing else needs to change: the form
 * already reads the three outcomes below.
 */
async function deliver(payload: QuoteInput & { receivedAt: string }) {
  const webhook = process.env.QUOTE_WEBHOOK_URL;

  if (!webhook) {
    return { delivered: false as const, reason: "not_configured" as const };
  }

  const response = await fetch(webhook, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ...payload, to: businessEmail }),
  });

  if (!response.ok) {
    return { delivered: false as const, reason: "upstream_failed" as const };
  }

  return { delivered: true as const };
}

export async function POST(request: Request) {
  let body: Partial<QuoteInput>;

  try {
    body = (await request.json()) as Partial<QuoteInput>;
  } catch {
    return NextResponse.json(
      { ok: false, code: "bad_request" },
      { status: 400 },
    );
  }

  // Honeypot: silently accept so a bot gets no signal either way.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true, delivered: true });
  }

  const errors = validateQuote(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, code: "validation_failed", errors },
      { status: 400 },
    );
  }

  const payload: QuoteInput & { receivedAt: string } = {
    name: body.name!.trim(),
    phone: body.phone!.trim(),
    email: body.email!.trim(),
    projectType: body.projectType!.trim(),
    message: body.message!.trim(),
    receivedAt: new Date().toISOString(),
  };

  const result = await deliver(payload);

  if (!result.delivered) {
    return NextResponse.json(
      { ok: false, code: result.reason },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true, delivered: true });
}
