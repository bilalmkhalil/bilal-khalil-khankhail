import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HashScroll from "@/components/HashScroll";
import ThemeToggle from "@/components/ThemeToggle";
import MotionProvider from "@/components/motion/MotionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bilal Khalil Khankhail - Frontend Engineer & Developer",
  description:
    "Passionate Frontend Engineer from Pakistan crafting digital experiences. Specializing in React, Next.js, TypeScript, and modern web technologies. Available for freelance projects.",
  keywords:
    "Frontend Engineer, React Developer, Next.js, TypeScript, Web Developer, Pakistan, Freelancer, JavaScript, TailwindCSS",
  authors: [{ name: "Bilal Khalil Khankhail" }],
  creator: "Bilal Khalil Khankhail",
  openGraph: {
    title: "Bilal Khalil Khankhail - Frontend Engineer",
    description:
      "Passionate Frontend Engineer crafting digital experiences with modern technologies",
    url: "https://bilal-khalil-khankhail.vercel.app",
    siteName: "Bilal Khalil Khankhail Portfolio",
    images: [
      {
        url: "/profile.png",
        width: 1200,
        height: 630,
        alt: "Bilal Khalil Khankhail",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bilal Khalil Khankhail - Frontend Engineer",
    description: "Passionate Frontend Engineer crafting digital experiences",
    images: ["/profile.png"],
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
    name: "Bilal Khalil Khankhail",
    url: "https://bilal-khalil-khankhail.vercel.app",
    image: "/profile.png",
    sameAs: [
      "https://github.com/bilal-khalil",
      "https://linkedin.com/in/bilal-khalil",
    ],
    jobTitle: "Frontend Engineer",
    worksFor: {
      "@type": "Organization",
      name: "MOD Ventures",
    },
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "TailwindCSS",
      "Frontend Development",
      "Web Development",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "Pakistan",
    },
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t="dark";try{var s=localStorage.getItem("portfolio-theme");if(s==="light"||s==="dark")t=s;}catch(e){}var r=document.documentElement;r.classList.remove("light","dark");r.classList.add(t);r.style.colorScheme=t;})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.className} [&_:disabled]:cursor-not-allowed [&_:is(button,a[href],[role=button],[role=link],[role=tab],summary,input[type=button],input[type=submit],input[type=reset]):not(:disabled):not([aria-disabled=true])]:cursor-pointer [&_[aria-disabled=true]]:cursor-not-allowed`}
      >
        <MotionProvider>
          <ThemeToggle />
          {children}
          <HashScroll />
        </MotionProvider>
      </body>
    </html>
  );
}
