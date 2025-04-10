"use client";

import React, { useState } from "react";
import localFont from "next/font/local";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const aadilFont = localFont({
  src: "../../public/fonts/Aadil.ttf",
});

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      alert(`An error occurred while sending the message. ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="contact"
      className="relative m-auto w-10/12 pb-32 md:pb-32 dark:text-white"
    >
      <div className="flex justify-between gap-4 border-b-2 pb-4 sm:justify-start">
        <h1 className="text-4xl text-white sm:text-6xl">Contact</h1>
        <h1
          className={`text-4xl text-white sm:text-6xl ${aadilFont.className}`}
        >
          رابطہ
        </h1>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Your Name"
                className="border-white/10 bg-black/20 text-white"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-4">
              <Input
                type="email"
                placeholder="Your Email"
                className="border-white/10 bg-black/20 text-white"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-4">
              <Textarea
                placeholder="Your Message"
                rows={6}
                className="border-white/10 bg-black/20 text-white"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
              />
            </div>
            <Button
              className="bg-white/10 text-white transition-colors hover:bg-white/20"
              disabled={loading}
              type="submit"
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
        <div className="grid h-full grid-cols-4 gap-3">
          {/* Email Card */}
          <div className="group col-span-4 rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-all hover:bg-white/10">
            <div className="flex items-center text-gray-300">
              <svg
                className="mr-3 h-5 w-5 transition-colors group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <div>
                <p className="text-xs text-gray-400">Email</p>
                <span className="text-sm text-white transition-colors group-hover:text-white">
                  bilalkhalilkhankhail@gmail.com
                </span>
              </div>
            </div>
          </div>

          {/* Social Links Container */}
          <div className="col-span-4 grid grid-cols-2 gap-3">
            {/* GitHub Card */}
            <div className="group rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur-md transition-all hover:bg-white/10">
              <a
                href="https://github.com/bilalmkhalil"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full w-full flex-col items-center justify-center"
              >
                <svg
                  className="mb-1 h-6 w-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="text-xs text-gray-400">GitHub</span>
              </a>
            </div>

            {/* LinkedIn Card */}
            <div className="group rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur-md transition-all hover:bg-white/10">
              <a
                href="https://www.linkedin.com/in/bilal-khalil-khankhail"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full w-full flex-col items-center justify-center"
              >
                <svg
                  className="mb-1 h-6 w-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span className="text-xs text-gray-400">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Map Card */}
          <div className="relative col-span-4 h-[220px] overflow-hidden rounded-lg border border-white/10 bg-white/5 backdrop-blur-md">
            <div className="pointer-events-none absolute inset-0 z-10 bg-black/30"></div>
            <iframe
              src="https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=24.860736,67.001136&zoom=10&maptype=roadmap&language=en&region=PK"
              className="h-full w-full"
              style={{
                border: 0,
                filter: "invert(100%)",
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen={false}
            ></iframe>
            <div className="absolute bottom-3 left-3 z-10 rounded-md bg-white/10 px-3 py-1.5 backdrop-blur-md">
              <span className="text-xs text-white">Karachi, Pakistan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
