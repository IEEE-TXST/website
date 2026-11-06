/**
 * CONNECT QR ("Scan to Connect")
 *
 * A reusable section that shows a scannable QR code for every social link a society has.
 * Use it on any page by passing that society's contact block from src/content/config.ts:
 *
 *   <ConnectQR contact={siteConfig.mainIEEEContact} />        // IEEE Student Branch (homepage)
 *   <ConnectQR contact={siteConfig.RASContact} />             // a society page
 *
 * Only the links that exist are shown (see src/content/channels.ts for the list). The codes are
 * generated at build time from config.ts, so they always match the buttons: to change a link,
 * edit config.ts only. For print-ready files, run `npm run qr` (see PRESIDENT_GUIDE.md).
 */

import QRCode from "qrcode";
import FadeIn from "@/components/animations/FadeIn";
import Section from "@/components/ui/Section";
import { channelsFor, type Contact } from "@/content/channels";

/** Makes the QR as an SVG, wrapped as an image address so it can go in a normal <img> tag. */
async function qrImage(url: string): Promise<string> {
  const svg = await QRCode.toString(url, {
    type: "svg",
    margin: 1, // white border ("quiet zone") so phones can scan it
    errorCorrectionLevel: "M",
    color: { dark: "#0A0F1E", light: "#FFFFFF" },
  });
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export default async function ConnectQR({
  contact,
  title = "Scan to Connect",
  subtitle = "Point your phone camera at a code to join our community.",
  className = "bg-gray-50",
}: {
  contact: Contact; // a contact block from config.ts
  title?: string;
  subtitle?: string;
  className?: string; // background of the section
}) {
  const channels = channelsFor(contact);
  if (channels.length === 0) return null; // nothing to show: render nothing

  const codes = await Promise.all(channels.map(async (c) => ({ ...c, image: await qrImage(c.url) })));

  return (
    <Section className={className}>
      <FadeIn>
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>
      </FadeIn>

      {/* Cards wrap and stay centered, whether there is 1 code or 5 */}
      <div className="flex flex-wrap justify-center gap-6">
        {codes.map((c, i) => (
          <FadeIn key={c.key} delay={i * 0.1}>
            <div className="w-full min-w-[220px] max-w-[240px] bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center">
              <h3 className="text-xl font-bold text-gray-900">{c.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{c.blurb}</p>
              {/* eslint-disable-next-line @next/next/no-img-element -- generated inline image, nothing to optimize */}
              <img
                src={c.image}
                alt={`QR code for ${c.name}`}
                width={176}
                height={176}
                className="mx-auto rounded-lg border border-gray-200"
              />
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-[#00629B] font-semibold hover:underline"
              >
                Or open the link
              </a>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
