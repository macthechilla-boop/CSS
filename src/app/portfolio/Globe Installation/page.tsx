"use client";
import Link from "next/link";
import React from "react";

export default function GlobeInstallationPage() {
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
        aria-label="Globe Installation"
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
        <span style={{ fontWeight: 900, fontSize: '2.5rem' }}>Globe Installation</span>
      </button>
      <p style={{ fontSize: "1.5rem", maxWidth: "700px", textAlign: "center" }}>
        Large-scale kinetic sculpture representing global data flows. Displayed at the V&A Digital Futures event.
      </p>
      {/* Add media and more text here */}
    </div>
  );
}
