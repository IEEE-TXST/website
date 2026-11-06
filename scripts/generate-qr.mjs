/**
 * GENERATE QR CODE FILES (for printing: flyers, posters, slides)
 *
 * Reads the main Discord / LinkedIn / GroupMe links from src/content/config.ts and writes:
 *   public/images/qr/<name>.svg   (sharp at any size, best for print)
 *   public/images/qr/<name>.png   (1024 x 1024, for slides and chats)
 *
 * Run it after changing a link in config.ts:   npm run qr
 * (The QR codes on the website itself don't need this: they are generated automatically.)
 */
import fs from "fs";
import path from "path";
import QRCode from "qrcode";
// Node 22.6+ can read the TypeScript config file directly (see the "qr" script in package.json).
import { siteConfig } from "../src/content/config.ts";

const out = path.join(process.cwd(), "public", "images", "qr");
fs.mkdirSync(out, { recursive: true });

const links = {
  discord: siteConfig.mainIEEEContact.discord,
  linkedin: siteConfig.mainIEEEContact.linkedin,
  groupme: siteConfig.mainIEEEContact.groupme,
};
const colors = { dark: "#0A0F1E", light: "#FFFFFF" };

for (const [name, url] of Object.entries(links)) {
  if (!url) {
    console.warn(`[qr] skipped ${name}: no link in config.ts`);
    continue;
  }
  const options = { margin: 2, errorCorrectionLevel: "M", color: colors };
  fs.writeFileSync(path.join(out, `${name}.svg`), await QRCode.toString(url, { ...options, type: "svg" }));
  await QRCode.toFile(path.join(out, `${name}.png`), url, { ...options, width: 1024 });
  console.log(`[qr] ${name}: ${url}`);
}
