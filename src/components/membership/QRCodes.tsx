/**
 * QR CODES ("Scan to Connect")
 *
 * Shows a scannable QR code for the main IEEE TXST Discord, LinkedIn and GroupMe.
 * The codes are generated at build time from the links in src/content/config.ts, so they always
 * match the buttons on the site. To change a link, edit config.ts only: no images to re-make.
 * (For print-ready files, run `npm run qr`; see PRESIDENT_GUIDE.md.)
 */

import QRCode from "qrcode";
import FadeIn from "@/components/animations/FadeIn";
import { siteConfig } from "@/content/config";

const channels = [
  { name: "Discord", blurb: "Chat with the community", url: siteConfig.mainIEEEContact.discord },
  { name: "LinkedIn", blurb: "Follow us for updates", url: siteConfig.mainIEEEContact.linkedin },
  { name: "GroupMe", blurb: "Get meeting reminders", url: siteConfig.mainIEEEContact.groupme },
];

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

export default async function QRCodes() {
  const codes = await Promise.all(
    channels.filter((c) => c.url).map(async (c) => ({ ...c, image: await qrImage(c.url) }))
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
      {codes.map((c, i) => (
        <FadeIn key={c.name} delay={i * 0.1}>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center">
            <h3 className="text-xl font-bold text-gray-900">{c.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{c.blurb}</p>
            {/* eslint-disable-next-line @next/next/no-img-element -- generated inline image, nothing to optimize */}
            <img
              src={c.image}
              alt={`QR code to join IEEE TXST on ${c.name}`}
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
  );
}
