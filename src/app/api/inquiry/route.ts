import { Resend } from "resend";
import { NextResponse } from "next/server";

interface InquiryData {
  name: string;
  email: string;
  phone?: string;
  inquiryType: "viewing" | "investment" | "pricing" | "agent" | "other";
  preferredContact: ("email" | "phone")[];
  language: "hu" | "en" | "de";
  message?: string;
  privacyConsent: boolean;
}

const inquiryTypeLabels = {
  hu: {
    viewing: "Privát megtekintés",
    investment: "Befektetési információ",
    pricing: "Árazási részletek",
    agent: "Ingatlanközvetítő - ügyfél bejelentés",
    other: "Egyéb",
  },
  en: {
    viewing: "Private Viewing",
    investment: "Investment Information",
    pricing: "Pricing Details",
    agent: "Real Estate Agent - Client Submission",
    other: "Other",
  },
  de: {
    viewing: "Private Besichtigung",
    investment: "Investment-Informationen",
    pricing: "Preisdetails",
    agent: "Immobilienmakler - Kundeneinreichung",
    other: "Sonstiges",
  },
};

const confirmationSubjects = {
  hu: "Bem rakpart 26 - Érdeklődését megkaptuk",
  en: "Bem rakpart 26 - Inquiry Received",
  de: "Bem rakpart 26 - Anfrage erhalten",
};

const confirmationMessages = {
  hu: {
    greeting: "Kedves",
    thanks: "Köszönjük érdeklődését a Bem rakpart 26-os ingatlannál!",
    received: "Üzenetét megkaptuk. Csapatunk hamarosan, 24 órán belül felveszi Önnel a kapcsolatot.",
    details: "Az Ön érdeklődésének részletei",
    inquiryType: "Érdeklődés típusa",
    preferredContact: "Preferált kapcsolatfelvétel",
    message: "Üzenet",
    closing: "Üdvözlettel",
    team: "Endless Solutions Kft.",
  },
  en: {
    greeting: "Dear",
    thanks: "Thank you for your interest in Bem rakpart 26!",
    received: "We have received your inquiry. Our team will contact you within 24 hours.",
    details: "Your inquiry details",
    inquiryType: "Inquiry type",
    preferredContact: "Preferred contact",
    message: "Message",
    closing: "Best regards",
    team: "Endless Solutions Kft.",
  },
  de: {
    greeting: "Sehr geehrte/r",
    thanks: "Vielen Dank für Ihr Interesse an Bem rakpart 26!",
    received: "Wir haben Ihre Anfrage erhalten. Unser Team wird Sie innerhalb von 24 Stunden kontaktieren.",
    details: "Ihre Anfragedetails",
    inquiryType: "Art der Anfrage",
    preferredContact: "Bevorzugter Kontakt",
    message: "Nachricht",
    closing: "Mit freundlichen Grüßen",
    team: "Endless Solutions Kft.",
  },
};

export async function POST(request: Request) {
  try {
    const data: InquiryData = await request.json();

    // Validation
    if (!data.name || !data.email || !data.privacyConsent) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!data.email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Bem rakpart 26 <onboarding@resend.dev>";
    const toEmail = process.env.BEMRAKPART_INQUIRY_EMAIL || "dobomatyas@me.com";
    const lang = data.language || "en";

    // Send notification to property agent
    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `[Bem rakpart 26] New ${data.inquiryType} inquiry from ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background-color: #faf9f7;">
            <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <h1 style="color: #1a365d; margin: 0 0 24px 0; font-size: 24px;">
                New Property Inquiry
              </h1>

              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6b6b6b; width: 140px;">Name:</td>
                  <td style="padding: 8px 0; color: #1a1a1a; font-weight: 500;">${data.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b6b6b;">Email:</td>
                  <td style="padding: 8px 0; color: #1a1a1a;"><a href="mailto:${data.email}" style="color: #1a365d;">${data.email}</a></td>
                </tr>
                ${data.phone ? `
                <tr>
                  <td style="padding: 8px 0; color: #6b6b6b;">Phone:</td>
                  <td style="padding: 8px 0; color: #1a1a1a;"><a href="tel:${data.phone}" style="color: #1a365d;">${data.phone}</a></td>
                </tr>
                ` : ""}
                <tr>
                  <td style="padding: 8px 0; color: #6b6b6b;">Inquiry Type:</td>
                  <td style="padding: 8px 0; color: #1a1a1a;">${inquiryTypeLabels[lang][data.inquiryType]}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b6b6b;">Preferred Contact:</td>
                  <td style="padding: 8px 0; color: #1a1a1a;">${data.preferredContact.join(", ")}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b6b6b;">Language:</td>
                  <td style="padding: 8px 0; color: #1a1a1a;">${lang.toUpperCase()}</td>
                </tr>
              </table>

              ${data.message ? `
              <div style="margin-top: 24px; padding: 16px; background: #faf9f7; border-radius: 4px;">
                <h3 style="color: #1a365d; margin: 0 0 8px 0; font-size: 14px;">Message:</h3>
                <p style="color: #1a1a1a; margin: 0; white-space: pre-wrap;">${data.message}</p>
              </div>
              ` : ""}

              <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e3df; color: #6b6b6b; font-size: 12px;">
                <p style="margin: 0;">Received at: ${new Date().toISOString()}</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    // Send confirmation to inquirer
    const msg = confirmationMessages[lang];
    await resend.emails.send({
      from: fromEmail,
      to: data.email,
      subject: confirmationSubjects[lang],
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background-color: #faf9f7;">
            <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <div style="text-align: center; margin-bottom: 32px;">
                <h1 style="color: #1a365d; margin: 0; font-size: 28px; font-family: Georgia, serif;">
                  Bem rakpart 26
                </h1>
              </div>

              <p style="color: #1a1a1a; margin: 0 0 16px 0; font-size: 16px;">
                ${msg.greeting} ${data.name},
              </p>

              <p style="color: #1a1a1a; margin: 0 0 16px 0; font-size: 16px;">
                ${msg.thanks}
              </p>

              <p style="color: #4a4a4a; margin: 0 0 24px 0; font-size: 16px;">
                ${msg.received}
              </p>

              <div style="background: #faf9f7; border-radius: 4px; padding: 20px; margin: 24px 0;">
                <h3 style="color: #1a365d; margin: 0 0 16px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
                  ${msg.details}
                </h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 4px 0; color: #6b6b6b; font-size: 14px;">${msg.inquiryType}:</td>
                    <td style="padding: 4px 0; color: #1a1a1a; font-size: 14px;">${inquiryTypeLabels[lang][data.inquiryType]}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #6b6b6b; font-size: 14px;">${msg.preferredContact}:</td>
                    <td style="padding: 4px 0; color: #1a1a1a; font-size: 14px;">${data.preferredContact.join(", ")}</td>
                  </tr>
                  ${data.message ? `
                  <tr>
                    <td style="padding: 4px 0; color: #6b6b6b; font-size: 14px; vertical-align: top;">${msg.message}:</td>
                    <td style="padding: 4px 0; color: #1a1a1a; font-size: 14px;">${data.message}</td>
                  </tr>
                  ` : ""}
                </table>
              </div>

              <p style="color: #1a1a1a; margin: 24px 0 0 0; font-size: 16px;">
                ${msg.closing},<br>
                <strong>${msg.team}</strong>
              </p>

              <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e3df; text-align: center; color: #6b6b6b; font-size: 12px;">
                <p style="margin: 0;">Budapest, Hungary</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Property inquiry error:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}
