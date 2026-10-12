import localFont from "next/font/local";
import { Titillium_Web } from "next/font/google";

export const aadilFont = localFont({ src: "../public/fonts/Aadil.woff2", display: "swap" });
export const portfolioFont = Titillium_Web({ subsets: ["latin"], weight: "300" });
