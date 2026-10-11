"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormData } from "@/types/types";
import ContactMap from "@/components/ContactMap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Brackets from "@/components/hud/Brackets";
import SectionHeading from "@/components/hud/SectionHeading";
import { hudDelay } from "@/components/hud/hudDelay";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { contactSchema } from "@/lib/contact-schema";
import { SOCIAL_LINKS } from "@/lib/constants";

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
    const company =
      (document.getElementById("contact-company") as HTMLInputElement | null)
        ?.value ?? "";

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, company }),
      });

      if (!response.ok) {
        const { error } = await response.json().catch(() => ({}));
        throw new Error(error);
      }

      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      setError("root", {
        message:
          (error instanceof Error && error.message) ||
          "Failed to send message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // HUD field: numbered label, square input, and a plain "!" error line.
  const fieldClass = (invalid: boolean) =>
    `border-ink/20 bg-transparent text-ink placeholder:text-ink/30 rounded-none text-sm focus-visible:border-ink focus-visible:ring-0 ${invalid ? "border-ink" : ""}`;
  const errorClass = "text-ink mt-1.5 text-xs tracking-[0.08em]";

  return (
    <div
      id="contact"
      className="dark:text-ink flex items-center justify-center pt-10 pb-28 md:min-h-screen md:pt-16 md:pb-28"
    >
      <div className="w-10/12">
        <SectionHeading title="Contact" urdu="رابطہ" />

        <div className="hud-mono mt-14 grid gap-8 md:grid-cols-2">
          <div className="hud-expand border-ink/15 relative border p-6">
            <Brackets />
            <p className="hud-blink text-ink/50 mb-5 text-[10px] tracking-[0.16em] uppercase" style={hudDelay(150)}>
              00 / Send a message
            </p>
            <AnimatePresence initial={false}>
              {success && (
                <motion.div
                  key="success"
                  role="status"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.18 }}
                  className="border-ink text-ink mb-5 border px-3 py-2 text-xs tracking-[0.1em] uppercase"
                >
                  ✓ Sent. I&apos;ll get back to you soon.
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
                  className="border-ink text-ink mb-5 border border-dashed px-3 py-2 text-xs tracking-[0.1em]"
                >
                  ! {errors.root.message}
                </motion.p>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Honeypot: hidden from people, filled in by spam bots. */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="contact-company">Company</label>
                <input
                  id="contact-company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="contact-name" className="text-ink/60 mb-2 block text-[10px] tracking-[0.16em] uppercase">
                  01 / Name
                </label>
                <Input
                  {...register("name")}
                  id="contact-name"
                  type="text"
                  placeholder="Your name"
                  autoComplete="name"
                  className={fieldClass(!!errors.name)}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className={errorClass}>
                    ! {errors.name?.message}
                  </p>
                )}
              </div>
              <div className="mb-5">
                <label htmlFor="contact-email" className="text-ink/60 mb-2 block text-[10px] tracking-[0.16em] uppercase">
                  02 / Email
                </label>
                <Input
                  {...register("email")}
                  id="contact-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={fieldClass(!!errors.email)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className={errorClass}>
                    ! {errors.email?.message}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label htmlFor="contact-message" className="text-ink/60 mb-2 block text-[10px] tracking-[0.16em] uppercase">
                  03 / Message
                </label>
                <Textarea
                  {...register("message")}
                  id="contact-message"
                  placeholder="Tell me about your project"
                  rows={6}
                  className={`${fieldClass(!!errors.message)} h-40`}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <p id="message-error" className={errorClass}>
                    ! {errors.message?.message}
                  </p>
                )}
              </div>
              <button
                disabled={loading}
                type="submit"
                style={hudDelay(300)}
                className="hud-blink bg-ink text-background hover:bg-ink/85 inline-flex h-11 items-center justify-center px-6 text-xs tracking-[0.14em] uppercase transition-colors disabled:opacity-60"
              >
                {loading ? "Sending…" : "Send message"}
              </button>
            </form>
          </div>

          <div className="flex flex-col gap-4">
            {/* Email */}
            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              style={hudDelay(100)}
              className="hud-expand group border-ink/15 hover:border-ink/40 relative flex items-center gap-4 border p-4 transition-colors"
            >
              <Brackets />
              <span className="border-ink/20 group-hover:bg-ink group-hover:text-background flex size-10 shrink-0 items-center justify-center border transition-colors">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </span>
              <span className="min-w-0">
                <span className="text-ink/50 block text-[10px] tracking-[0.16em] uppercase">04 / Email</span>
                <span className="text-ink block text-[11px] break-all sm:text-sm">{SOCIAL_LINKS.email}</span>
              </span>
            </a>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                n: "05",
                label: "GitHub",
                href: SOCIAL_LINKS.github,
                path: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
              },
              {
                n: "06",
                label: "LinkedIn",
                href: SOCIAL_LINKS.linkedin,
                path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
              },
            ].map(({ n, label, href, path }, i) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={hudDelay(200 + i * 100)}
                className="hud-expand group border-ink/15 hover:border-ink/40 relative flex items-center gap-3 border p-4 transition-colors"
              >
                <Brackets />
                <span className="border-ink/20 group-hover:bg-ink group-hover:text-background flex size-10 shrink-0 items-center justify-center border transition-colors">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={path} />
                  </svg>
                </span>
                <span>
                  <span className="text-ink/50 block text-[10px] tracking-[0.16em] uppercase">{n} / Social</span>
                  <span className="text-ink block text-sm tracking-[0.08em] uppercase">{label}</span>
                </span>
              </a>
            ))}
            </div>

            <ContactMap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
