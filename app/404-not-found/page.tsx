"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function NotFoundPage() {
  const [showForm, setShowForm] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setHintVisible(true);
    }, 6000); // 6 sec

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-[100vh] flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      <div className="max-w-3xl w-full mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden my-8">
        <div className="p-8 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link href="/">
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                <Image
                  src="/images/stc-logo.jpg"
                  alt="STC IIT Patna Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          <h1 className="text-6xl md:text-9xl font-bold text-blue-600 mb-4">
            404
          </h1>

          <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-4">
            Page Not Found... or is it?
          </h2>

          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Not everything is{" "}
            <span
              onClick={() => router.push("/registration/404-not-found")}
              className="text-gray-400 hover:text-blue-600 cursor-pointer transition-all duration-300"
            >
              lost
            </span>
            .
          </p>

          {!showForm && (
            <>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link
                  href="/"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
                >
                  Return Home
                </Link>
                <Link
                  href="/wings"
                  className="px-6 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-lg transition"
                >
                  Explore Our Wings
                </Link>
              </div>

              {hintVisible && (
                <p className="mt-4 text-sm text-gray-600 text-center">
                  (Something here feels clickable...)
                </p>
              )}
            </>
          )}
        </div>

        <div className="bg-gray-50 p-6 text-center border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Or maybe... you weren’t supposed to leave 👀
          </p>
        </div>
      </div>
    </div>
  );
}
