"use client";

import React, { useState } from "react";
import { aadilFont } from "@/lib/fonts";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormData, FormErrors } from "@/types/types";
import ContactMap from "@/components/ContactMap";
import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Reveal from "@/components/motion/Reveal";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

let contactSchema = object({
  name: string().required("Please enter your name"),
  email: string().email("Invalid email format").required("Email is required"),
  message: string()
    .min(50, "Message must be at least 50 characters")
    .required(),
});

const ContactSection = () => {
  const reduced = useReducedMotion();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactSchema),
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 5000);
    } catch {
      setError("root", {
        message: "Failed to send message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="contact"
      className="dark:text-ink flex items-center justify-center py-10 md:h-screen md:py-0"
    >
      <div className="w-10/12">
        <Reveal className="flex justify-between gap-4 border-b-2 pb-4 sm:justify-start">
          <h1 className="text-ink text-4xl sm:text-6xl">Contact</h1>
          <h1
            className={`text-ink text-4xl sm:text-6xl ${aadilFont.className}`}
          >
            رابطہ
          </h1>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <Reveal className="border-ink/10 bg-ink/5 rounded-lg border p-6 backdrop-blur-md">
            <AnimatePresence initial={false}>
              {success && (
                <motion.div
                  key="success"
                  role="status"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.18 }}
                  className="mb-4 rounded-lg border border-green-500/30 bg-green-500/20 px-2 py-1 text-green-700 dark:text-green-300"
                >
                  ✓ Message sent successfully! I&apos;ll get back to you soon.
                </motion.div>
              )}

              {errors.root?.message && (
                <motion.p
                  key="error"
                  role="alert"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.18 }}
                  className="mb-4 rounded-lg border border-red-500/30 bg-red-500/20 px-2 py-1 text-red-700 dark:text-red-300"
                >
                  {errors.root.message}
                </motion.p>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <Input
                  {...register("name")}
                  type="text"
                  placeholder="Your Name"
                  className={`border-ink/10 bg-ink/5 text-ink focus-visible:ring-0 ${errors.name ? "border-red-500/50" : ""}`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p
                    id="name-error"
                    className="mt-1 text-sm text-red-700 dark:text-red-400"
                  >
                    {errors.name?.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="Your Email"
                  className={`border-ink/10 bg-ink/5 text-ink focus-visible:ring-0 ${errors.email ? "border-red-500/50" : ""}`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p
                    id="email-error"
                    className="mt-1 text-sm text-red-700 dark:text-red-400"
                  >
                    {errors.email?.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <Textarea
                  {...register("message")}
                  placeholder="Your Message"
                  rows={6}
                  className={`border-ink/10 bg-ink/5 text-ink h-46.25 focus-visible:ring-0 ${errors.message ? "border-red-500/50" : ""}`}
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                />
                {errors.message && (
                  <p
                    id="message-error"
                    className="mt-1 text-sm text-red-700 dark:text-red-400"
                  >
                    {errors.message?.message}
                  </p>
                )}
              </div>
              <Button
                className="bg-ink/10 text-ink hover:bg-ink/20 transition-colors"
                disabled={loading}
                type="submit"
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Reveal>
          <Reveal delay={0.08} className="grid h-full grid-cols-4 gap-3">
            {/* Email Card */}
            <div className="group border-ink/10 bg-ink/5 hover:bg-ink/10 col-span-4 rounded-lg border p-4 backdrop-blur-md transition-all">
              <div className="text-ink/80 flex items-center">
                <svg
                  className="group-hover:text-ink mr-3 h-5 w-5 transition-colors"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <div>
                  <p className="text-ink/60 text-xs">Email</p>
                  <span className="text-ink group-hover:text-ink text-sm transition-colors">
                    bilalkhalilkhankhail@gmail.com
                  </span>
                </div>
              </div>
            </div>

            <div className="col-span-4 grid grid-cols-2 gap-3">
              <div className="group border-ink/10 bg-ink/5 hover:bg-ink/10 rounded-lg border p-3 backdrop-blur-md transition-all">
                <a
                  href="https://github.com/bilalmkhalil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full w-full flex-col items-center justify-center"
                >
                  <svg
                    className="text-ink mb-1 h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="text-ink/60 text-xs">GitHub</span>
                </a>
              </div>

              <div className="group border-ink/10 bg-ink/5 hover:bg-ink/10 rounded-lg border p-3 backdrop-blur-md transition-all">
                <a
                  href="https://www.linkedin.com/in/bilal-khalil-khankhail"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full w-full flex-col items-center justify-center"
                >
                  <svg
                    className="text-ink mb-1 h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span className="text-ink/60 text-xs">LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Map Card */}
            <ContactMap />
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
