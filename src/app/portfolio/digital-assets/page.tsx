"use client";

import Link from "next/link";
import { useState } from "react";

export default function DigitalAssetsPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <main className="digital-assets-root">
      <Link href="/" aria-label="Close" className="top-right-close">
        <span>×</span>
      </Link>
      <section className="digital-assets-body">
        <header className="digital-assets-header">
          <div className="digital-assets-card">
            <p className="digital-assets-eyebrow">AUTONOMOUS PERFORMANCE</p>
            <h1>Digital Assets</h1>
            <p className="digital-assets-description">
              HDD field recordings are processed live in the browser to create a continuously evolving, audio-reactive
              visual. Select the preloaded track or feed the engine with your own audio or microphone, then enter
              full-screen to perform.
            </p>
          </div>
        </header>
        <div className="digital-assets-player">
          {!isLoaded && (
            <div className="digital-assets-loader">Lade Digital Assets…</div>
          )}
          <iframe
            src="/digital-assets/index.html"
            title="Digital Assets audio visual player"
            allow="autoplay; microphone"
            allowFullScreen
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
          />
        </div>
      </section>
      <style jsx>{`
        .digital-assets-root {
          position: relative;
          min-height: 100vh;
          padding: clamp(2rem, 5vw, 3rem) clamp(1.5rem, 5vw, 3rem);
          background: radial-gradient(circle at top left, rgba(16, 24, 40, 0.7), rgba(2, 6, 12, 0.9)), #020610;
          color: #e2e8f0;
          display: flex;
          flex-direction: column;
          gap: clamp(2rem, 4vw, 3rem);
        }

        .digital-assets-body {
          display: flex;
          flex-direction: column;
          gap: clamp(1.5rem, 3vw, 2.5rem);
          margin-top: clamp(2rem, 6vw, 3rem);
        }

        .digital-assets-header {
          width: 100%;
          display: flex;
          justify-content: center;
          text-align: center;
        }

        .digital-assets-eyebrow {
          letter-spacing: 0.4em;
          text-transform: uppercase;
          font-size: 0.75rem;
          color: rgba(148, 163, 184, 0.7);
          margin: 0;
        }

        h1 {
          margin: 0;
          font-size: clamp(2.2rem, 5vw, 3rem);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .digital-assets-description {
          margin: 0;
          color: rgba(226, 232, 240, 0.82);
          font-size: clamp(1rem, 2.3vw, 1.15rem);
          line-height: 1.7;
        }

        .digital-assets-card {
          max-width: min(720px, 90vw);
          margin: 0 auto;
          padding: clamp(1.6rem, 4vw, 2.6rem) clamp(1.4rem, 4vw, 2.8rem);
          border-radius: 24px;
          background: rgba(11, 18, 32, 0.72);
          border: 1px solid rgba(148, 163, 184, 0.18);
          box-shadow: 0 24px 58px rgba(5, 10, 24, 0.4);
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          backdrop-filter: blur(12px);
        }

        .digital-assets-player {
          position: relative;
          flex: 1;
          min-height: min(70vh, 720px);
          background: rgba(15, 23, 42, 0.65);
          border: 1px solid rgba(148, 163, 184, 0.25);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 28px 60px rgba(8, 12, 24, 0.4);
        }

        .digital-assets-player iframe {
          position: absolute;
          inset: 0;
          border: none;
          width: 100%;
          height: 100%;
          background: #0b0b0c;
        }

        .digital-assets-loader {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(226, 232, 240, 0.75);
          background: rgba(2, 6, 12, 0.88);
          z-index: 1;
        }

        @media (max-width: 900px) {
          .digital-assets-root {
            padding: clamp(1.8rem, 7vw, 2.4rem) clamp(1rem, 6vw, 1.8rem);
          }

          .digital-assets-player {
            min-height: 70vh;
          }
        }
      `}</style>
    </main>
  );
}
