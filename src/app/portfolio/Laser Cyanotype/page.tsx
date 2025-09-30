"use client";
import Link from "next/link";
import React from "react";

export default function LaserCyanotypePage() {
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
        aria-label="Laser Cyanotype"
        style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          padding: '1rem 2.5rem',
          borderRadius: '2rem',
          background: '#181a20',
          color: '#e0eafc',
          border: '3px solid #222',
          cursor: 'default',
          marginBottom: '2rem',
          letterSpacing: '0.04em',
          display: 'inline-flex',
          alignItems: 'center',
          textAlign: 'center',
          textDecoration: 'none',
        }}
        disabled
      >
        <span style={{ fontWeight: 900, fontSize: '2.5rem' }}>Laser Cyanotype</span>
      </button>
      <p style={{ fontSize: "1.5rem", maxWidth: "700px", textAlign: "center" }}>
        Experimental photographic process combining laser etching and cyanotype chemistry. Collaboration with Studio X.
      </p>
      {/* Add media and more text here */}
    </div>
  );
}
