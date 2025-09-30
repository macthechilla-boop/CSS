import Link from "next/link";
import React from "react";
import "./landing.css";

export default function LandingPage() {
  return (
    <main className="landing-container">
      <Link href="/" aria-label="Close" className="top-right-close">
        <span>×</span>
      </Link>
      <div className="landing-overlay">
        <h1 className="landing-title">CHRISTIAN SILVESTER SEEMANN</h1>
        <p className="landing-subtitle">space technology perception</p>
      </div>
      <video
        className="landing-bg"
        src="/111111.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/name-collage.jpg"
      />
    </main>
  );
}
