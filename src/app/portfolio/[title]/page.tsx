"use client";
import Link from "next/link";
import React from "react";
import { useParams } from "next/navigation";

const projects = [
  {
    title: "Morphonic Lab",
    img: "/morphonic-lab/IMG_0083.jpeg",
    desc: "Immersive audio-visual environment where feedback-driven light and sound respond to visitors in real time.",
  },
  {
    title: "Glitching Carlowitz",
    img: "/new-ecologies/IMG_8259.jpeg",
    desc: "Glitching portrait that fuses Chemnitz climate data with the legacy of sustainability pioneer Hans Carl von Carlowitz.",
  },
  {
    title: "Ships",
    img: "/ships/IMG_5487.jpeg",
    desc: "Digital scan experiments capturing vessels in motion as layered fields of reflection and memory.",
  },
  {
    title: "Globe Installation",
    img: "https://images.unsplash.com/photo-1465101178521-c1a4c8a0f8f9?auto=format&fit=crop&w=800&q=80",
    desc: "Large-scale kinetic sculpture representing global data flows. Displayed at the V&A Digital Futures event.",
  },
  {
    title: "Sinks",
    img: "/sinks/DSCF7647.jpg",
    desc: "Series of photographic studies exploring mirrored water, industrial textures, and controlled color washes.",
  },
];

export default function PortfolioDetail() {
  const params = useParams();
  const project = projects.find(p => p.title.replace(/\s+/g, "-").toLowerCase() === params.title);
  if (!project) return <div style={{ color: "#e0eafc", padding: "4rem" }}>Project not found.</div>;
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#181a20",
        color: "#e0eafc",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Link href="/" aria-label="Close" className="top-right-close">
        <span>×</span>
      </Link>
      <img src={project.img} alt={project.title} style={{ width: "80vw", maxWidth: "900px", aspectRatio: "2.35/1", objectFit: "cover", borderRadius: "18px", marginBottom: "2rem", boxShadow: "0 4px 32px #0006" }} />
      <h1 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>{project.title}</h1>
      <p style={{ fontSize: "1.25rem", maxWidth: "700px", textAlign: "center", background: "rgba(20,22,30,0.55)", borderRadius: "16px", padding: "2rem 2.5rem" }}>{project.desc}</p>
    </div>
  );
}
