import puppeteer from "puppeteer";
import os from "os";
import path from "path";

export async function saveCoverLetterAsPDF(content: string, company: string, position: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(`<html><body><pre>${content}</pre></body></html>`);

  const fileName = `${company}_${position}_CoverLetter.pdf`.replace(/\s+/g, "_");
  const downloadPath = path.join(os.homedir(), "Downloads", fileName);

  await page.pdf({ path: downloadPath, format: "A4" });
  await browser.close();
} 