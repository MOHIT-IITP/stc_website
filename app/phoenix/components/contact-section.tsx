"use client";

import { useState } from "react";
import Image from "next/image";
import PhoenixBg from "./phoenix-bg";
export default function ContactSection() {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/event-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setSubmitError(null);
        setFormData({
          lastName: "",
          firstName: "",
          email: "",
          message: "",
        });

        setTimeout(() => setSubmitted(false), 3000);
      } else {
        setSubmitError("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="w-full  relative overflow-hidden py-12 flex items-center"
      id="contact"
    >
      <PhoenixBg />

      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <img
          src="/phoenix/Union.svg"
          alt="contact decorative background"
          className="w-3/4 max-w-[560px] opacity-20 dark:opacity-10 object-contain"
        />
      </div>
      <div className="container mx-auto px-4 md:px-12 lg:px-20 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left side - Form */}
          <div className="relative z-10 flex flex-col justify-center">
            <div className="mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Let's connect
              </h2>
              <p className="text-gray-400 text-sm">
                For sponsorship, events or participation inquiries, please reach
                out via email or phone. We'll get back to you ASAP.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Last Name and First Name - Two columns */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-white/6 border border-white/20 rounded-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#00C984]/25 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Last Name"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-white/6 border border-white/20 rounded-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#00C984]/25 transition-all duration-300 backdrop-blur-sm"
                    placeholder="First Name"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-white/6 border border-white/20 rounded-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#00C984]/25 transition-all duration-300 backdrop-blur-sm"
                  placeholder="Email"
                />
              </div>

              {/* Message Textarea */}
              <div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/6 border border-white/20 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#00C984]/25 transition-all duration-300 resize-none backdrop-blur-sm"
                  placeholder="Message"
                />
              </div>

              {/* Success Message */}
              {submitted && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 p-5 bg-linear-to-r from-green-500/15 via-emerald-500/10 to-green-500/15 border border-green-500/40 rounded-xl shadow-lg shadow-green-500/10 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 mt-1">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-500/20 animate-pulse">
                        <svg
                          className="h-6 w-6 text-green-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 py-1">
                      <h3 className="text-base font-bold text-green-300">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-sm text-green-200/90 mt-2 leading-relaxed">
                        Thank you for reaching out! Your message has been
                        delivered to our team. We'll review it and get back to
                        you as soon as possible.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {submitError && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 p-4 bg-red-500/10 border border-red-500/40 rounded-xl shadow-lg shadow-red-500/10 backdrop-blur-sm">
                  <p className="text-sm text-red-200">{submitError}</p>
                </div>
              )}

              {/* Loading State */}
              {isSubmitting && (
                <div className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-white/15 bg-white/5 backdrop-blur-sm">
                  <span className="h-5 w-5 rounded-full border-2 border-white/30 border-t-[#00C984] animate-spin" />
                  <span className="text-white/90 text-sm font-medium tracking-wide">
                    Sending message...
                  </span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full transition-all duration-500 hover:scale-105 active:scale-95 flex items-center justify-center ${
                  isSubmitting || submitted
                    ? "opacity-0 pointer-events-none scale-95"
                    : "opacity-100"
                }`}
              >
                <div className="relative flex items-center justify-center">
                  <div className="absolute bg-white p-1 shadow-lg w-64 h-10" />
                  <Image
                    src="/phoenix/contact-submit.png"
                    alt="Submit"
                    width={400}
                    height={120}
                    className="w-full h-auto max-w-md object-contain cursor-pointer relative z-10"
                    priority
                  />
                </div>
              </button>
            </form>
          </div>

          {/* Right side - Owl image */}
          <div className="relative z-10 hidden min-h-[420px] lg:flex lg:min-h-full items-start justify-center lg:justify-end lg:pt-2 lg:pr-2">
            <img
              src="/phoenix/contact-section.png"
              alt="Phoenix owl illustration"
              className="w-[115%] max-w-none h-auto max-h-[540px] object-contain translate-x-3 -translate-y-3 lg:w-[125%] lg:translate-x-6 lg:-translate-y-6"
            />
          </div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-[#00C984]/5 rounded-full blur-3xl -translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#33D9A0]/5 rounded-full blur-3xl translate-x-1/3 pointer-events-none"></div>
    </div>
  );
}
