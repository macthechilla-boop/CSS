"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

type TimelineItem = {
  title: string;
  detail: string;
};

type TimelineYear = {
  year: string;
  items: TimelineItem[];
};

type VitaData = {
  timeline: TimelineYear[];
  contact?: string;
};

const FALLBACK_VITA = `Christian Silvester Seemann

VITA

Group Exhibition / Selection

2024
„New ecologies“ - Kunst Sammlungen, Chemnitz
climate/weather reactive installation
„Kollektiv Rabatzzz“ - Segment 3.0, Dresden
AV installation

2023
„Stresstest“ – New Scenario
Sculpture
„Dark Matter III“ – C. Rockefeller Center, Dresden
AV installation
„Crashtest 12“ – Jilska 14, Praha
AV installation

2022
„Geschäft gesucht“ – Weiße Gasse 8, Dresden
Intervention with Lisa Maria Baier for anniversary of Nazi Progrome
„Opening“ – Juri, Dresden
Sound cyanotype
„Circuit Control 2022“ Alte Feuerwache, Loschwitz
Visual performance
„Hauptsache mit Stecker“ – Oswalz, Dresden
Curation and visual installation
„DIWO“ – Konglomerat, Dresden
Visual Installation an Organisation
„Kodekü 2022“ – Stadt Weißwasser
Sound performance

2021
“Glass in your shoes“ – Weisse Gasse 8, Dresden
Intervention with Lisa Maria Baier for anniversary of Nazi Progrome
„Territorien II“ – Kunsthalle Oktogon, Dresden
Audiovisuell Installation
„Circuit Control 2021“ – Medienkulturzentrum, Dresden
Organisation
„Kodekü 2021“ – Eastclub, Bischofswerda
AV installation

2020
„Space Baitler for sewing machines” Galerie Ursula Walter, Dresden
Virtuell AV object
„Circuit Control 2020“ – Sektor, Dresden
Participation
„Kodekü 2020“ – Eastclub, Bischofswerda
Audio installation
„M20 Meisterschüler*innen“ – Motorenhalle, Dresden
Visual experiments
„Liminalität oder das peinliche Alter / Nebliger Mai“ – Zentralwerk, Dresden
Room intervention

2019
„Intervention auf dem Heidefriedhof“ – Kunsthaus, Dresden
Intervention and video
„Art for Humanism“ – Kunsthalle im Lipsiusbau, Dresden
Co-Curation
„What are you looking at?“ – Kunsthalle Oktogon, Dresden

Contact: christianseemann@me.com
`;

const VitaPage = () => {
  const [vitaRaw, setVitaRaw] = useState("");
  useEffect(() => {
    fetch("/vita.txt")
      .then((res) => res.text())
      .then(setVitaRaw)
      .catch(() => setVitaRaw(""));
  }, []);

  const vitaSource = vitaRaw.trim() ? vitaRaw : FALLBACK_VITA;
  const { timeline, contact } = useMemo(() => parseVita(vitaSource), [vitaSource]);

  return (
    <main className="vita-root">
      <Link href="/" aria-label="Close Vita" className="top-right-close">
        <span>×</span>
      </Link>

      <section className="vita-intro">
        <p className="vita-eyebrow">vita</p>
        <h1>Christian Silvester Seemann</h1>
      </section>

      <section className="vita-timeline" aria-label="Exhibition timeline">
        {timeline.map((yearBlock) => (
          <article key={yearBlock.year} className="vita-year">
            <header className="vita-year-header">
              <span className="vita-year-label">{yearBlock.year}</span>
            </header>
            <ul className="vita-year-list">
              {yearBlock.items.map((item, index) => (
                <li key={`${yearBlock.year}-${index}`} className="vita-year-item">
                  <h3>{item.title}</h3>
                  {item.detail && <p>{item.detail}</p>}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      {contact && (
        <section className="vita-contact" aria-label="Contact">
          <h2>Contact</h2>
          <a className="vita-contact-link" href={`mailto:${contact}`}>
            {contact}
          </a>
          <p className="vita-legal">
            Legal / Impressum: <a href="/legal">/legal</a>
          </p>
        </section>
      )}

      <style jsx>{`
        .vita-root {
          position: relative;
          min-height: 100vh;
          padding: clamp(3.2rem, 6vw, 5.4rem) clamp(1.6rem, 5vw, 4rem) clamp(3.2rem, 6vw, 5.4rem);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(2rem, 4vw, 3rem);
          background:
            linear-gradient(180deg, rgba(5, 7, 13, 0.95), rgba(5, 7, 13, 0.98)),
            url("/name-collage.jpg");
          background-size: cover;
          background-position: center;
          color: #e2e8f0;
          overflow: hidden;
        }

        .vita-intro {
          width: min(640px, 100%);
          margin: 0 auto;
          text-align: center;
          border-bottom: 1px solid rgba(148, 163, 184, 0.16);
          padding-bottom: 0.75rem;
        }

        .vita-eyebrow {
          letter-spacing: 0.32em;
          text-transform: uppercase;
          font-size: 0.64rem;
          color: rgba(148, 163, 184, 0.6);
          margin-bottom: 0.4rem;
        }

        h1 {
          font-size: clamp(1.5rem, 2.4vw, 2rem);
          letter-spacing: 0.04em;
          margin: 0;
        }

        .vita-timeline {
          width: min(640px, 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(1.6rem, 3vw, 2.2rem);
        }

        .vita-year {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.9rem;
          text-align: center;
        }

        .vita-year::before {
          content: "";
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(148, 197, 255, 0.9);
          border: 2px solid rgba(226, 232, 240, 0.9);
          box-shadow: 0 0 12px rgba(148, 197, 255, 0.55);
          margin-bottom: 0.4rem;
        }

        .vita-year-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
        }

        .vita-year-label {
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(148, 197, 255, 0.82);
        }

        .vita-year-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          align-items: center;
        }

        .vita-year-item h3 {
          font-size: 0.98rem;
          margin: 0 0 0.3rem 0;
          font-weight: 500;
          letter-spacing: 0.02em;
        }

        .vita-year-item p {
          margin: 0;
          font-size: 0.88rem;
          line-height: 1.5;
          color: rgba(226, 232, 240, 0.68);
          max-width: 38ch;
        }

        .vita-contact {
          width: min(640px, 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.9rem;
          border-top: 1px solid rgba(148, 163, 184, 0.18);
          padding-top: 1.4rem;
          margin-top: 0.4rem;
          text-align: center;
        }

        .vita-contact::before {
          content: "";
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, rgba(59, 130, 246, 0.8), rgba(192, 132, 252, 0.5));
        }

        .vita-contact h2 {
          margin: 0;
          font-size: 0.9rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(248, 250, 252, 0.75);
        }

        .vita-contact-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #f8fafc;
          background: rgba(51, 65, 85, 0.4);
          padding: 0.55rem 1.5rem;
          border-radius: 999px;
          text-decoration: none;
          border: 1px solid rgba(148, 163, 184, 0.35);
          transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease;
        }

        .vita-contact-link:hover {
          transform: translateY(-2px);
          background: rgba(71, 85, 105, 0.55);
          border-color: rgba(148, 163, 184, 0.55);
        }

        .vita-legal {
          margin-top: 0.8rem;
          font-size: 0.95rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(148, 163, 184, 0.75);
        }

        .vita-legal a {
          color: #9db5ff;
          text-decoration: none;
        }

        .vita-legal a:hover {
          text-decoration: underline;
        }

        @media (max-width: 720px) {
          .vita-close-button {
            top: 1rem;
            right: 1rem;
            width: 42px;
            height: 42px;
            font-size: 1.7rem;
          }

          .vita-intro {
            width: min(92vw, 100%);
          }

          .vita-intro-text {
            padding: 0 24px;
          }

          .vita-timeline,
          .vita-contact {
            width: min(92vw, 100%);
          }
        }
      `}</style>
    </main>
  );
};

export default VitaPage;

function parseVita(raw: string): VitaData {
  const lines = raw.split("\n").map((line) => line.trim());
  const timeline: TimelineYear[] = [];
  let currentYear: string | null = null;
  let currentItems: TimelineItem[] = [];
  let pendingTitle: string | null = null;
  let contact: string | undefined;

  for (const line of lines) {
    if (!line) {
      continue;
    }

    if (/^contact:/i.test(line)) {
      contact = line.split(":").slice(1).join(":").trim();
      continue;
    }

    if (/^\d{4}$/.test(line)) {
      if (currentYear && currentItems.length) {
        timeline.push({ year: currentYear, items: currentItems });
      }
      currentYear = line;
      currentItems = [];
      pendingTitle = null;
      continue;
    }

    if (!currentYear) {
      continue;
    }

    if (!pendingTitle) {
      pendingTitle = line;
    } else {
      currentItems.push({ title: pendingTitle, detail: line });
      pendingTitle = null;
    }
  }

  if (currentYear) {
    if (pendingTitle) {
      currentItems.push({ title: pendingTitle, detail: "" });
    }
    if (currentItems.length) {
      timeline.push({ year: currentYear, items: currentItems });
    }
  }

  return { timeline, contact };
}
