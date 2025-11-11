"use client";

import React from "react";
import Link from "next/link";

// Drop this file as either `pages/404.jsx` (Pages Router)
// or `app/not-found.jsx` (App Router) — if you use the App Router,
// keep the `"use client"` at the top so the animations run on the client.

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white px-6">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left - animated 404 artwork */}
        <section className="relative flex items-center justify-center p-6">
          <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-2xl bg-gradient-to-tr from-white/5 to-white/3 backdrop-blur-md shadow-2xl overflow-hidden border border-white/5">
            {/* Floating blobby shapes */}
            <div className="absolute -left-8 -top-6 w-32 h-32 rounded-full opacity-30 animate-blob mix-blend-screen bg-pink-400/40"></div>
            <div className="absolute right-4 -bottom-6 w-40 h-40 rounded-full opacity-25 animate-blob animation-delay-2000 mix-blend-screen bg-emerald-400/30"></div>

            {/* 404 digits */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="flex items-baseline gap-3 md:gap-6">
                <span className="text-6xl md:text-8xl font-extrabold leading-none tracking-tight transform-gpu animate-bounce-slow">
                  4
                </span>
                <div className="relative w-20 md:w-28 h-20 md:h-28">
                  {/* animated 'orbiting' astronaut (SVG) */}
                  <svg
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 w-full h-full animate-orbit"
                  >
                    <g fill="none" fillRule="evenodd">
                      <circle
                        cx="32"
                        cy="32"
                        r="20"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="2"
                      />
                      <g transform="translate(16 14)">
                        <path
                          d="M22 6c1 0 2 1 2 2v8c0 1-1 2-2 2h-8c-1 0-2-1-2-2V8c0-1 1-2 2-2h8z"
                          fill="rgba(255,255,255,0.06)"
                        />
                        <circle
                          cx="11"
                          cy="11"
                          r="4"
                          fill="white"
                          opacity="0.95"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
                <span className="text-6xl md:text-8xl font-extrabold leading-none tracking-tight transform-gpu animate-bounce">
                  4
                </span>
              </div>

              <p className="mt-4 text-sm md:text-base text-white/75">
                Hey — looks like the page you were looking for floated away.
              </p>
            </div>

            {/* tiny twinkling stars */}
            <div className="absolute inset-0 pointer-events-none">
              <span className="star star-1" />
              <span className="star star-2" />
              <span className="star star-3" />
              <span className="star star-4" />
              <span className="star star-5" />
            </div>
          </div>
        </section>

        {/* Right - content and CTA */}
        <section className="p-6 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-black mb-3">
            Page not found
          </h1>
          <p className="text-lg text-white/80 mb-6">
            The URL you tried to reach either doesn't exist, or the page took a
            rocket and left. Don't worry — we've got your back.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/6 backdrop-blur-md transition-transform transform hover:-translate-y-1 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
              Back to home
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg hover:scale-105 transition-transform"
            >
              Contact support
            </Link>

            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/6 hover:bg-white/12 border border-white/6 transition"
            >
              Try reload
            </button>
          </div>

          <div className="mt-6 text-sm text-white/60">
            Tip: try checking the URL or returning to the homepage. If you think
            something's broken — tell us.
          </div>
        </section>
      </div>

      {/* Decorative floating confetti bottom-right */}
      <div className="pointer-events-none fixed right-6 bottom-6 w-40 h-40">
        <div className="confetti" />
      </div>

      <style jsx>{`
        .animate-blob {
          animation: blob 6s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }

        @keyframes blob {
          0% {
            transform: translateY(0) scale(1);
          }
          33% {
            transform: translateY(-8px) scale(1.05);
          }
          66% {
            transform: translateY(4px) scale(0.98);
          }
          100% {
            transform: translateY(0) scale(1);
          }
        }

        .animate-orbit {
          animation: orbit 8s linear infinite;
          transform-origin: 50% 50%;
        }
        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(0px) rotate(0deg);
          }
          50% {
            transform: rotate(180deg) translateX(2px) rotate(-180deg);
          }
          100% {
            transform: rotate(360deg) translateX(0px) rotate(-360deg);
          }
        }

        .animate-bounce {
          animation: bounce 1.6s infinite cubic-bezier(0.22, 0.7, 0.32, 1);
        }
        .animate-bounce-slow {
          animation: bounce 2.2s infinite cubic-bezier(0.22, 0.7, 0.32, 1);
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        /* stars */
        .star {
          position: absolute;
          display: block;
          width: 6px;
          height: 6px;
          background: white;
          border-radius: 999px;
          opacity: 0.85;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.15);
        }
        .star-1 {
          left: 8%;
          top: 12%;
          transform: scale(0.6);
          animation: twinkle 4s infinite;
        }
        .star-2 {
          left: 78%;
          top: 6%;
          transform: scale(0.45);
          animation: twinkle 3s infinite;
        }
        .star-3 {
          left: 42%;
          top: 20%;
          transform: scale(0.35);
          animation: twinkle 3.8s infinite;
        }
        .star-4 {
          left: 62%;
          top: 70%;
          transform: scale(0.55);
          animation: twinkle 5s infinite;
        }
        .star-5 {
          left: 20%;
          top: 66%;
          transform: scale(0.4);
          animation: twinkle 4.6s infinite;
        }
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.1;
            transform: scale(0.6);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* confetti */
        .confetti {
          width: 100%;
          height: 100%;
          position: relative;
        }
        .confetti::before,
        .confetti::after {
          content: "";
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 2px;
          background: linear-gradient(45deg, #fff, #f0f);
          opacity: 0.9;
          transform: translateY(0);
          animation: confetti-fall 3s linear infinite;
          left: 10%;
        }
        .confetti::after {
          left: 70%;
          background: linear-gradient(45deg, #7af, #0ff);
          animation-delay: 0.6s;
        }
        @keyframes confetti-fall {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(90px) rotate(360deg);
            opacity: 0;
          }
        }

        /* small responsive tweaks */
        @media (max-width: 768px) {
          .confetti {
            display: none;
          }
        }
      `}</style>
    </main>
  );
}
