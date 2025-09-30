"use client";

import Link from "next/link";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1465101178521-c1a4c8a0f8f9?auto=format&fit=crop&w=1600&q=80";

export default function GlobeInstallationPage() {
  return (
    <main className="project-page">
      <Link href="/" aria-label="Close" className="top-right-close">
        <span>×</span>
      </Link>
      <header className="project-hero">
        <img src={HERO_IMAGE} alt="Globe Installation" className="project-hero__image" />
        <div className="project-hero__video">
          <video controls playsInline preload="metadata">
            <source src="/media/globe-installation.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </header>

      <section className="project-details">
        <p className="project-eyebrow">KINETIC SCULPTURE</p>
        <h1 className="project-title">GLOBE INSTALLATION</h1>
        <p className="project-summary">
          LARGE-SCALE KINETIC SCULPTURE REPRESENTING GLOBAL DATA FLOWS. DISPLAYED AT THE V&A DIGITAL FUTURES EVENT.
        </p>
        <Link href="/" className="project-back">
          BACK TO HOME
        </Link>
      </section>

      <style jsx>{`
        .project-page {
          min-height: 100vh;
          background: #020617;
          color: #f8fafc;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(2.5rem, 6vw, 4rem);
          padding: clamp(3rem, 7vw, 4rem) clamp(1.5rem, 5vw, 4rem) clamp(4rem, 8vw, 5rem);
          font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .project-hero {
          width: min(1080px, 100%);
          display: flex;
          flex-direction: column;
          gap: clamp(1.5rem, 3vw, 2rem);
        }

        .project-hero__image {
          width: 100%;
          border-radius: 28px;
          object-fit: cover;
          box-shadow: 0 24px 60px rgba(2, 6, 23, 0.55);
        }

        .project-hero__video video {
          width: 100%;
          border-radius: 28px;
          background: rgba(15, 23, 42, 0.8);
          box-shadow: 0 24px 60px rgba(2, 6, 23, 0.45);
        }

        .project-details {
          width: min(900px, 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: clamp(1.2rem, 3vw, 1.8rem);
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.78), rgba(15, 23, 42, 0.52));
          border: 1px solid rgba(148, 163, 184, 0.22);
          border-radius: 32px;
          padding: clamp(2rem, 5vw, 3rem);
          box-shadow: 0 35px 70px rgba(2, 6, 23, 0.45);
        }

        .project-eyebrow {
          letter-spacing: 0.32em;
          font-size: clamp(0.8rem, 1.4vw, 0.95rem);
          text-transform: uppercase;
          color: rgba(148, 163, 184, 0.8);
          margin: 0;
        }

        .project-title {
          font-size: clamp(2.6rem, 3.6vw, 3.2rem);
          letter-spacing: 0.22em;
          font-weight: 700;
          text-transform: uppercase;
          margin: 0;
        }

        .project-summary {
          font-size: clamp(1.1rem, 2vw, 1.3rem);
          letter-spacing: 0.22em;
          line-height: 1.8;
          text-transform: uppercase;
          color: rgba(226, 232, 240, 0.85);
          margin: 0;
          max-width: 38ch;
        }

        .project-back {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.65rem 1.8rem;
          border-radius: 999px;
          letter-spacing: 0.26em;
          font-size: clamp(1.1rem, 2vw, 1.3rem);
          text-transform: uppercase;
          color: rgba(248, 250, 252, 0.85);
          border: 1px solid rgba(148, 163, 184, 0.35);
          background: rgba(15, 23, 42, 0.4);
          text-decoration: none;
          transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease;
        }

        .project-back:hover {
          transform: translateY(-4px);
          border-color: rgba(148, 163, 184, 0.55);
          background: rgba(30, 41, 59, 0.6);
        }

        @media (max-width: 720px) {
          .project-page {
            gap: 2.5rem;
          }

          .project-details {
            border-radius: 24px;
          }
        }
      `}</style>
    </main>
  );
}
