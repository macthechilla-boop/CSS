"use client";
import Link from "next/link";
import React from "react";

export default function NewEcologiesPage() {
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
      <button
        type="button"
        aria-label="Back to homepage"
        style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          padding: '1rem 2.5rem',
          borderRadius: '2rem',
          background: '#181a20',
          color: '#e0eafc',
          border: '3px solid #222',
          cursor: 'pointer',
          marginBottom: '2rem',
          letterSpacing: '0.04em',
          display: 'inline-flex',
          alignItems: 'center',
          textAlign: 'center',
          textDecoration: 'none',
        }}
      >
        <span style={{ fontWeight: 900, fontSize: '2.5rem' }}>New Ecologies</span>
      </button>
      <p style={{ fontSize: "1.5rem", maxWidth: "700px", textAlign: "center" }}>
        Mixed media series visualizing speculative landscapes and future habitats. Exhibited at ArtSpace Berlin.
      </p>
      {/* Add media and more text here */}
    </div>
  );
}
