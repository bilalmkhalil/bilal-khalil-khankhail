"use client";

import React, { useState } from "react";
import localFont from "next/font/local";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormData, FormErrors } from "@/types/types";
import {
  Map,
  MapMarker,
  MarkerContent,
} from "@/components/ui/map";

const aadilFont = localFont({
  src: "../../public/fonts/Aadil.ttf",
});

const ContactSection = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setErrors({
        message: `Failed to send message. Please try again. ${error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="contact"
      className="flex h-screen items-center justify-center dark:text-white"
    >
      <div className="w-10/12">
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
            {success && (
              <div className="mb-6 rounded-lg border border-green-500/30 bg-green-500/20 p-4 text-green-300">
                ✓ Message sent successfully! I&apos;ll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Input
                  type="text"
                  placeholder="Your Name"
                  className={`border-white/10 bg-black/20 text-white focus-visible:ring-0 ${errors.name ? "border-red-500/50" : ""}`}
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <Input
                  type="email"
                  placeholder="Your Email"
                  className={`border-white/10 bg-black/20 text-white focus-visible:ring-0 ${errors.email ? "border-red-500/50" : ""}`}
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email)
                      setErrors({ ...errors, email: undefined });
                  }}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <Textarea
                  placeholder="Your Message"
                  rows={6}
                  className={`h-[185px] border-white/10 bg-black/20 text-white focus-visible:ring-0 ${errors.message ? "border-red-500/50" : ""}`}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message)
                      setErrors({ ...errors, message: undefined });
                  }}
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-sm text-red-400">
                    {errors.message}
                  </p>
                )}
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

            <div className="col-span-4 grid grid-cols-2 gap-3">
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
              <Map center={[67.00994, 24.86146]} zoom={9}>
                <MapMarker longitude={67.00994} latitude={24.86146}>
                  <MarkerContent>
                    <div className="relative flex items-center justify-center">
                      <div className="absolute rounded-full bg-emerald-500/20" />
                      <div className="absolute animate-ping rounded-full bg-emerald-500/40" />
                      <div className="relative rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" />
                    </div>
                  </MarkerContent>
                </MapMarker>
              </Map>

              {/* Location Label */}
              <div className="absolute bottom-3 left-3 z-20 rounded-md border border-white/10 bg-black/60 px-3 py-1.5 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-red-500"></div>
                  <span className="text-xs font-medium text-white">
                    Karachi, Pakistan
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
