"use client";

import { useState } from "react";
import Image from "next/image";
import PhoenixBg from "./phoenix-bg";
import AppConfig from "@/config/appConfig";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

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
        setFormData({
          lastName: "",
          firstName: "",
          email: "",
          message: "",
        });

        setTimeout(() => setSubmitted(false), 3000);
      } else {
        alert("Failed to send message");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div
      className="w-full  relative overflow-hidden py-12 flex items-center"
      id="contact"
    >
      <PhoenixBg />
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

            <form onSubmit={handleSubmit} className="space-y-5">
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
                    className="w-full px-4 py-3 bg-white/10 border border-[#1C3F35]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#1C3F35] focus:ring-1 focus:ring-[#1C3F35]/50 transition-all duration-300"
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
                    className="w-full px-4 py-3 bg-white/10 border border-[#1C3F35]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#1C3F35] focus:ring-1 focus:ring-[#1C3F35]/50 transition-all duration-300"
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
                  className="w-full px-4 py-3 bg-white/10 border border-[#1C3F35]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#1C3F35] focus:ring-1 focus:ring-[#1C3F35]/50 transition-all duration-300"
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
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-[#1C3F35]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#1C3F35] focus:ring-1 focus:ring-[#1C3F35]/50 transition-all duration-300 resize-none"
                  placeholder="Message"
                />
              </div>

              {/* Success Message */}
              {submitted && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 p-5 bg-gradient-to-r from-green-500/15 via-emerald-500/10 to-green-500/15 border border-green-500/40 rounded-xl shadow-lg shadow-green-500/10 backdrop-blur-sm">
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

              {/* Submit Button with Image */}
              <button
                type="submit"
                className={`w-full transition-all duration-500 hover:scale-105 active:scale-95 flex items-center justify-center ${
                  submitted
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

          {/* Right side - Image with overlapping contact details */}
          <div className="relative z-10 h-[400px] md:h-[450px] rounded-2xl overflow-hidden">
            {/* Background image */}
            <div className="absolute inset-0">
              <img
                src={AppConfig.imageUrls.phoenix.contactSection}
                alt="Contact illustration"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0D261C]/20 to-[#0D261C]/60"></div>
            </div>

            {/* Overlapping contact details - positioned absolutely */}
            <div className="absolute inset-0 flex flex-col items-start justify-start p-6 md:p-8">
              <div className="flex flex-col gap-4 w-full md:w-96">
                {/* Email Card */}
                <div className="rounded-xl p-4 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#00C984]/10 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-[#00C984]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Email</p>
                      <div className="space-y-1">
                        <p className="text-white text-sm font-medium">
                          stc_iitp@iitp.ac.in
                        </p>
                        <p className="text-white text-sm font-medium">
                          tatva@iitp.ac.in
                        </p>
                        <p className="text-white text-sm font-medium">
                          arthniti@iitp.ac.in
                        </p>
                        <p className="text-white text-sm font-medium">
                          disha@iitp.ac.in
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="rounded-xl p-4 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#00C984]/10 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-[#00C984]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Phone</p>
                      <div className="space-y-1">
                        <p className="text-white text-sm font-medium">
                          +91-93267-60945
                        </p>
                        <p className="text-white text-sm font-medium">
                          +91-62022-36461
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Card */}
                <div className="rounded-xl p-4 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#00C984]/10 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-[#00C984]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">
                        Location
                      </p>
                      <p className="text-white text-sm font-medium">
                        IIT Patna, Bihar
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#00C984]/40 rounded-tl-2xl"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#00C984]/40 rounded-br-2xl"></div>
          </div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-[#00C984]/5 rounded-full blur-3xl -translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#33D9A0]/5 rounded-full blur-3xl translate-x-1/3 pointer-events-none"></div>
    </div>
  );
}
