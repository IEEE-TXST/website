/**
 * GENERATE QR CODE FILES (for printing: flyers, posters, slides)
 *
 * Reads every society's social links from src/content/config.ts and writes, for each link:
 *   public/images/qr/<society>-<channel>.svg   (sharp at any size, best for print)
 *   public/images/qr/<society>-<channel>.png   (1024 x 1024, for slides and chats)
 * e.g. student-branch-discord.png, student-branch-org-hub.png, ras-instagram.svg, hkn-linkedin.png
 *
 * Run it after changing a link in config.ts:   npm run qr
 * (The QR codes on the website itself don't need this: they are generated automatically.)
 */
import fs from "fs";
import path from "path";
import QRCode from "qrcode";
// Node 22.6+ can read these TypeScript files directly (see the "qr" script in package.json).
import { siteConfig } from "../src/content/config.ts";
import { channelsFor } from "../src/content/channels.ts";

// File-name prefix -> contact block. Add a society here to get print files for it.
const sets = {
  "student-branch": siteConfig.mainIEEEContact,
  ras: siteConfig.RASContact,
  hkn: siteConfig.HKNContact,
  "computer-society": siteConfig.computerSocContact,
};

const out = path.join(process.cwd(), "public", "images", "qr");
fs.rmSync(out, { recursive: true, force: true }); // start clean so removed links don't leave old files
fs.mkdirSync(out, { recursive: true });

const options = { margin: 2, errorCorrectionLevel: "M", color: { dark: "#0A0F1E", light: "#FFFFFF" } };

for (const [society, contact] of Object.entries(sets)) {
  for (const { key, url } of channelsFor(contact)) {
    const name = `${society}-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`; // orgHub -> org-hub
    fs.writeFileSync(path.join(out, `${name}.svg`), await QRCode.toString(url, { ...options, type: "svg" }));
    await QRCode.toFile(path.join(out, `${name}.png`), url, { ...options, width: 1024 });
    console.log(`[qr] ${name}: ${url}`);
  }
}
