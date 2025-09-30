"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useState } from "react";

const sinkImages = [
  { src: "/sinks/DSCF7620.jpg", alt: "Sinks installation — mirrored basin with magenta lighting" },
  { src: "/sinks/DSCF7630.jpg", alt: "Sinks installation — cool cyan gradients across still water" },
  { src: "/sinks/DSCF7638.jpg", alt: "Sinks installation — close-up of refracted projection" },
  { src: "/sinks/DSCF7647.jpg", alt: "Sinks installation — dual basins with gold reflections" },
  { src: "/sinks/DSCF7653.jpg", alt: "Sinks installation — overhead view with color split" },
  { src: "/sinks/DSCF7663.jpg", alt: "Sinks installation — rippled surface with indigo lighting" },
  { src: "/sinks/DSCF7667.jpg", alt: "Sinks installation — warm gradient spilling from faucet" },
  { src: "/sinks/DSCF7672.jpg", alt: "Sinks installation — mirrored backsplash with orange hues" },
  { src: "/sinks/DSCF7678.jpg", alt: "Sinks installation — detail of water movement and reflections" },
];

const rootStyles: CSSProperties = {
  minHeight: "100vh",
  background: "radial-gradient(circle at top left, rgba(148,163,184,0.08), transparent 55%)",
  backgroundColor: "#181a20",
  color: "#e0eafc",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "3rem",
  padding: "4rem 1.5rem 5rem",
};

const heroStyles: CSSProperties = {
  width: "min(960px, 100%)",
  background: "linear-gradient(135deg, rgba(30,32,40,0.9), rgba(10,12,18,0.75))",
  borderRadius: "24px",
  border: "1px solid rgba(148,163,184,0.15)",
  padding: "2.5rem clamp(1.5rem, 6vw, 3rem)",
  boxShadow: "0 24px 48px rgba(8,10,18,0.45)",
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  textAlign: "center",
};

const galleryStyles: CSSProperties = {
  width: "min(1100px, 100%)",
  display: "grid",
  gap: "1.8rem",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
};

const imageWrapperStyles: CSSProperties = {
  position: "relative",
  borderRadius: "20px",
  overflow: "hidden",
  border: "1px solid rgba(148,163,184,0.18)",
  background: "rgba(15,17,24,0.85)",
  boxShadow: "0 20px 36px rgba(8,10,18,0.4)",
  aspectRatio: "3 / 2",
};

const mediaWrapperStyles: CSSProperties = {
  position: "relative",
  width: "100%",
  height: "100%",
};

const overlayStyles: CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(2, 6, 23, 0.94)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 200,
  padding: "clamp(1.5rem, 4vw, 3rem)",
};

const overlayImageWrapperStyles: CSSProperties = {
  position: "relative",
  width: "min(90vw, 1100px)",
  height: "min(80vh, 720px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "clamp(0.6rem, 1vw, 1.2rem)",
  borderRadius: "20px",
  background: "rgba(10, 18, 32, 0.85)",
  boxShadow: "0 32px 72px rgba(15, 23, 42, 0.8)",
};

const overlayNavButton: CSSProperties = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  background: "rgba(15, 23, 42, 0.7)",
  color: "#e2e8f0",
  border: "1px solid rgba(148, 163, 184, 0.4)",
  borderRadius: "50%",
  width: "56px",
  height: "56px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "2rem",
  cursor: "pointer",
  boxShadow: "0 18px 40px rgba(2, 6, 23, 0.55)",
};

const overlayCloseButton: CSSProperties = {
  position: "absolute",
  top: "clamp(1.5rem, 4vw, 2.6rem)",
  right: "clamp(1.5rem, 4vw, 2.6rem)",
  background: "rgba(15, 23, 42, 0.7)",
  color: "#f8fafc",
  border: "1px solid rgba(148, 163, 184, 0.4)",
  borderRadius: "50%",
  width: "48px",
  height: "48px",
  fontSize: "1.8rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

export default function SinksPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current + 1) % sinkImages.length;
    });
  }, []);

  const showPrev = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current - 1 + sinkImages.length) % sinkImages.length;
    });
  }, []);

  useEffect(() => {
    if (activeIndex === null) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }
      if (event.key === "ArrowRight") {
        showNext();
      }
      if (event.key === "ArrowLeft") {
        showPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, closeLightbox, showNext, showPrev]);

  return (
    <div style={rootStyles}>
      <Link href="/" aria-label="Close" className="top-right-close">
        <span>×</span>
      </Link>

      <header style={heroStyles}>
        <p style={{ letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(148,163,184,0.7)", margin: 0 }}>
          PHOTO SERIES
        </p>
        <h1 style={{ fontSize: "clamp(2.4rem, 6vw, 3.4rem)", letterSpacing: "0.12em", margin: 0 }}>SINKS</h1>
        <p style={{ fontSize: "1.15rem", lineHeight: 1.8, margin: 0, color: "rgba(224,234,252,0.82)" }}>
          Documentation of various sinks in the studios of HFBK Dresden. The photographs show the sinks as everyday focal
          points within the studios. Their differing uses reflect individual working methods and reveal traces of
          artistic practice, demonstrating how seemingly inconspicuous places can provide insight into ongoing processes.
        </p>
      </header>

      <section style={galleryStyles}>
        {sinkImages.map((image, index) => (
          <figure key={image.src} style={imageWrapperStyles}>
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              style={{
                padding: 0,
                border: "none",
                background: "none",
                display: "block",
                width: "100%",
                height: "100%",
                cursor: "zoom-in",
              }}
            >
              <div style={mediaWrapperStyles}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 90vw, 320px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </button>
          </figure>
        ))}
      </section>

      {activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          style={overlayStyles}
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              closeLightbox();
            }}
            style={overlayCloseButton}
            aria-label="Close gallery"
          >
            ×
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPrev();
            }}
            style={{ ...overlayNavButton, left: "3%" }}
            aria-label="Previous image"
          >
            ‹
          </button>
          <div
            style={overlayImageWrapperStyles}
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={sinkImages[activeIndex].src}
              alt={sinkImages[activeIndex].alt}
              fill
              sizes="90vw"
              style={{ objectFit: "contain" }}
            />
          </div>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            style={{ ...overlayNavButton, right: "3%" }}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
