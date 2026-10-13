import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import "./hud.css";
import HashScroll from "@/components/HashScroll";
import BootScreen from "@/components/hud/BootScreen";
import HudObserver from "@/components/hud/HudObserver";
import { BOOT_MS } from "@/components/hud/boot";
import ThemeToggle from "@/components/ThemeToggle";
import BrandLogo from "@/components/BrandLogo";
import MotionProvider from "@/components/motion/MotionProvider";
import { SOCIAL_LINKS } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://khankhail.com"),
  title: "Bilal - Full-Stack Software Engineer",
  description:
    "Full-stack Software Engineer from Pakistan building production web apps and infrastructure with React, Next.js, Node.js, TypeScript, and modern DevOps. Available for freelance projects.",
  keywords:
    "Software Engineer, Full-Stack Developer, React Developer, Next.js, Node.js, TypeScript, DevOps, Web Developer, Pakistan, Freelancer",
  authors: [{ name: "Bilal" }],
  creator: "Bilal",
  openGraph: {
    title: "Bilal - Full-Stack Software Engineer",
    description:
      "Full-stack Software Engineer building production web apps and infrastructure",
    url: "https://khankhail.com",
    siteName: "Bilal Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bilal - Full-Stack Software Engineer",
    description:
      "Full-stack Software Engineer building production web apps and infrastructure",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Bilal",
    url: "https://khankhail.com",
    image: "https://khankhail.com/profile.png",
    email: `mailto:${SOCIAL_LINKS.email}`,
    sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin],
    jobTitle: "Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Sofject",
    },
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "PostgreSQL",
      "DevOps",
      "Full-Stack Development",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "Pakistan",
    },
  };

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className="dark [&::view-transition]:pointer-events-none [&::view-transition-group(root)]:animate-none [&::view-transition-group(theme-icon)]:z-20 [&::view-transition-group(theme-icon)]:animate-none [&::view-transition-group(theme-toggle)]:z-10 [&::view-transition-group(theme-toggle)]:animate-none [&::view-transition-new(root)]:animate-none [&::view-transition-new(root)]:mix-blend-normal [&::view-transition-new(theme-icon)]:animate-none [&::view-transition-new(theme-icon)]:mix-blend-normal [&::view-transition-new(theme-toggle)]:hidden [&::view-transition-old(root)]:animate-none [&::view-transition-old(root)]:mix-blend-normal [&::view-transition-old(theme-icon)]:hidden [&::view-transition-old(theme-toggle)]:animate-none [&::view-transition-old(theme-toggle)]:mix-blend-normal"
      suppressHydrationWarning
      style={{ "--boot-delay": `${BOOT_MS}ms` } as React.CSSProperties}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t="dark";try{var s=localStorage.getItem("portfolio-theme");if(s==="light"||s==="dark")t=s;}catch(e){}var r=document.documentElement;r.classList.remove("light","dark");r.classList.add(t);r.style.colorScheme=t;})();`,
          }}
        />
        {/* Without JavaScript, show HUD elements as-is instead of paused. */}
        <noscript>
          <style>{`.hud-expand,.hud-blink{animation:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.className} [&_:disabled]:cursor-not-allowed [&_:is(button,a[href],[role=button],[role=link],[role=tab],summary,input[type=button],input[type=submit],input[type=reset]):not(:disabled):not([aria-disabled=true])]:cursor-pointer [&_[aria-disabled=true]]:cursor-not-allowed`}
      >
        <MotionProvider>
          <BootScreen />
          <BrandLogo />
          <ThemeToggle />
          {children}
          <HashScroll />
          <HudObserver />
          <Analytics debug={false} />
        </MotionProvider>
      </body>
    </html>
  );
}
