import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./landing.css";

export default function LandingPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const capturedRef = useRef(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [posterSrc, setPosterSrc] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedPoster = window.localStorage.getItem("landingVideoPoster");
    if (storedPoster) {
      setPosterSrc(storedPoster);
    }
  }, []);

  const handleLoadedData = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (capturedRef.current) return;
    if (video.videoWidth === 0 || video.videoHeight === 0) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    try {
      const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
      setPosterSrc(dataUrl);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("landingVideoPoster", dataUrl);
      }
    } catch {
      // Ignore storage issues
    } finally {
      capturedRef.current = true;
    }
  }, []);

  const handleCanPlay = useCallback(() => {
    setIsVideoReady(true);
  }, []);

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
        ref={videoRef}
        className="landing-bg"
        src="/111111.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={handleLoadedData}
        onCanPlay={handleCanPlay}
        style={{ opacity: isVideoReady ? 1 : 0 }}
      />
      <div
        className={`landing-poster ${isVideoReady ? "is-hidden" : ""} ${
          posterSrc ? "has-image" : ""
        }`}
        style={posterSrc ? { backgroundImage: `url(${posterSrc})` } : undefined}
      />
    </main>
  );
}
