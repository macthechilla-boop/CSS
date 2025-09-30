"use client";
import React from "react";

const projects = [
  {
    title: "Morphonic Lab",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    desc: "A generative art installation exploring morphogenesis and digital forms. Includes interactive projections and sound.",
  },
  {
    title: "New Ecologies",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    desc: "Mixed media series visualizing speculative landscapes and future habitats. Exhibited at ArtSpace Berlin.",
  },
  {
    title: "Laser Cyanotype",
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    desc: "Experimental photographic process combining laser etching and cyanotype chemistry. Collaboration with Studio X.",
  },
  {
    title: "Globe Installation",
    img: "https://images.unsplash.com/photo-1465101178521-c1a4c8a0f8f9?auto=format&fit=crop&w=800&q=80",
    desc: "Large-scale kinetic sculpture representing global data flows. Displayed at the V&A Digital Futures event.",
  },
  {
    title: "Sinks",
    img: "/sinks/DSCF7672.jpg",
    desc: "Choreographed reflections inside industrial sinks exploring liquid light and color grading.",
  },
];

export default function PortfolioGrid() {
  return (
    <div className="portfolio-grid-container">
      {projects.map((project, i) => (
        <div className="portfolio-grid-item" key={i}>
          <img src={project.img} alt={project.title} className="portfolio-grid-img" />
          <div className="portfolio-grid-info">
            <h3>{project.title}</h3>
            <p>{project.desc}</p>
          </div>
        </div>
      ))}
      <style>{`
        .portfolio-grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 2.5rem;
          padding: 4vw 4vw 2vw 4vw;
          background: #181a20;
        }
        .portfolio-grid-item {
          background: #222;
          border-radius: 18px;
          box-shadow: 0 4px 32px #0003;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s cubic-bezier(.77,.2,.18,1), box-shadow 0.3s;
        }
        .portfolio-grid-item:hover {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 0 8px 48px #0005;
        }
        .portfolio-grid-img {
          width: 100%;
          aspect-ratio: 2.35 / 1;
          object-fit: cover;
          border-bottom: 1px solid #333;
        }
        .portfolio-grid-info {
          padding: 1.5rem;
          color: #eee;
        }
        .portfolio-grid-info h3 {
          font-size: 1.3rem;
          margin-bottom: 0.7rem;
          font-weight: 600;
        }
        .portfolio-grid-info p {
          font-size: 1.05rem;
          color: #bbb;
        }
      `}</style>
    </div>
  );
}
