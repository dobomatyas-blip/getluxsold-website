import { Resend } from "resend";
import { NextResponse } from "next/server";

interface ServiceInquiryData {
  name: string;
  email: string;
  propertyAddress: string;
  message?: string;
  language: "hu" | "en" | "de";
}

const confirmationSubjects = {
  hu: "Endless Solutions - Luxus Ingatlan Landing Page Érdeklődés",
  en: "Endless Solutions - Luxury Property Landing Page Inquiry",
  de: "Endless Solutions - Luxusimmobilien-Landingpage Anfrage",
};

const confirmationMessages = {
  hu: {
    greeting: "Kedves",
    thanks: "Köszönjük érdeklődését az Endless Solutions luxus ingatlan landing page szolgáltatása iránt!",
    received: "Jelentkezését megkaptuk. Csapatunk hamarosan, 48 órán belül felveszi Önnel a kapcsolatot a részletek egyeztetése céljából.",
    freeNote: "Az első 10 prémium ingatlannak INGYENES szolgáltatást biztosítunk.",
    details: "A beküldött adatok",
    propertyAddress: "Ingatlan címe",
    message: "Üzenet",
    closing: "Üdvözlettel",
    team: "Endless Solutions Kft.",
  },
  en: {
    greeting: "Dear",
    thanks: "Thank you for your interest in Endless Solutions' luxury property landing page service!",
    received: "We have received your application. Our team will contact you within 48 hours to discuss the details.",
    freeNote: "We're offering FREE service to the first 10 premium properties.",
    details: "Submitted information",
    propertyAddress: "Property address",
    message: "Message",
    closing: "Best regards",
    team: "Endless Solutions Kft.",
  },
  de: {
    greeting: "Sehr geehrte/r",
    thanks: "Vielen Dank für Ihr Interesse am Luxusimmobilien-Landingpage-Service von Endless Solutions!",
    received: "Wir haben Ihre Bewerbung erhalten. Unser Team wird Sie innerhalb von 48 Stunden kontaktieren, um die Details zu besprechen.",
    freeNote: "Wir bieten KOSTENLOSEN Service für die ersten 10 Premium-Immobilien an.",
    details: "Eingereichte Informationen",
    propertyAddress: "Immobilienadresse",
    message: "Nachricht",
    closing: "Mit freundlichen Grüßen",
    team: "Endless Solutions Kft.",
  },
};

export async function POST(request: Request) {
  try {
    const data: ServiceInquiryData = await request.json();

    // Validation
    if (!data.name || !data.email || !data.propertyAddress) {
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
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Endless Solutions <onboarding@resend.dev>";
    const toEmail = process.env.ENDLESS_SOLUTIONS_EMAIL || "info@endlesssolutions.net";
    const lang = data.language || "en";

    // Send notification to Endless Solutions
    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `[Property Landing Page] FREE offer application from ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background-color: #faf9f7;">
            <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <div style="background: linear-gradient(135deg, #d4af37 0%, #b8962e 100%); color: white; padding: 16px; border-radius: 4px; margin-bottom: 24px; text-align: center;">
                <span style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">New Application</span>
                <h2 style="margin: 8px 0 0 0; font-size: 20px;">FREE Property Landing Page</h2>
              </div>

              <h1 style="color: #1a365d; margin: 0 0 24px 0; font-size: 24px;">
                Service Inquiry from Bem rakpart 26
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
                <tr>
                  <td style="padding: 8px 0; color: #6b6b6b;">Property Address:</td>
                  <td style="padding: 8px 0; color: #1a1a1a; font-weight: 500;">${data.propertyAddress}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b6b6b;">Language:</td>
                  <td style="padding: 8px 0; color: #1a1a1a;">${lang.toUpperCase()}</td>
                </tr>
              </table>

              ${data.message ? `
              <div style="margin-top: 24px; padding: 16px; background: #faf9f7; border-radius: 4px;">
                <h3 style="color: #1a365d; margin: 0 0 8px 0; font-size: 14px;">About the property:</h3>
                <p style="color: #1a1a1a; margin: 0; white-space: pre-wrap;">${data.message}</p>
              </div>
              ` : ""}

              <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e3df; color: #6b6b6b; font-size: 12px;">
                <p style="margin: 0;">Received at: ${new Date().toISOString()}</p>
                <p style="margin: 4px 0 0 0;">Source: Bem rakpart 26 Agent CTA Section</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    // Send confirmation to applicant
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
                  Endless Solutions
                </h1>
                <p style="color: #d4af37; margin: 8px 0 0 0; font-size: 14px; letter-spacing: 1px;">
                  LUXURY PROPERTY LANDING PAGES
                </p>
              </div>

              <p style="color: #1a1a1a; margin: 0 0 16px 0; font-size: 16px;">
                ${msg.greeting} ${data.name},
              </p>

              <p style="color: #1a1a1a; margin: 0 0 16px 0; font-size: 16px;">
                ${msg.thanks}
              </p>

              <p style="color: #4a4a4a; margin: 0 0 16px 0; font-size: 16px;">
                ${msg.received}
              </p>

              <div style="background: linear-gradient(135deg, #d4af37 0%, #b8962e 100%); color: white; padding: 16px; border-radius: 4px; margin: 24px 0; text-align: center;">
                <p style="margin: 0; font-size: 14px; font-weight: 500;">
                  ${msg.freeNote}
                </p>
              </div>

              <div style="background: #faf9f7; border-radius: 4px; padding: 20px; margin: 24px 0;">
                <h3 style="color: #1a365d; margin: 0 0 16px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
                  ${msg.details}
                </h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 4px 0; color: #6b6b6b; font-size: 14px;">${msg.propertyAddress}:</td>
                    <td style="padding: 4px 0; color: #1a1a1a; font-size: 14px;">${data.propertyAddress}</td>
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
                <p style="margin: 4px 0 0 0;">
                  <a href="https://endlesssolutions.net" style="color: #1a365d;">endlesssolutions.net</a>
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Service inquiry error:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}
