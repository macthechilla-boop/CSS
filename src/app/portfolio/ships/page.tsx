"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";

type Orientation = "square" | "landscape";

type GalleryImage = {
  src: string;
  alt: string;
  orientation: Orientation;
};

const shipImages: GalleryImage[] = [
  {
    src: "/ships/IMG_5484.jpeg",
    alt: "Composite scan showing multiple ship silhouettes layered together",
    orientation: "square",
  },
  {
    src: "/ships/IMG_5485.jpeg",
    alt: "Ship hull revealed through scanner distortion",
    orientation: "square",
  },
  {
    src: "/ships/IMG_5486.jpeg",
    alt: "Fragmented hull forming glitch echoes across the scan",
    orientation: "square",
  },
  {
    src: "/ships/IMG_5487.jpeg",
    alt: "Overlay of vessel outlines forming a spectral topography",
    orientation: "square",
  },
  {
    src: "/ships/IMG_5600.jpeg",
    alt: "Vertical streak capturing ship velocity through the scanner",
    orientation: "square",
  },
  {
    src: "/ships/IMG_5979.jpeg",
    alt: "Pixel vortices produced by ship wake translation",
    orientation: "square",
  },
  {
    src: "/ships/IMG_3597.jpeg",
    alt: "Port scene reconstructed from multiple scanning passes",
    orientation: "landscape",
  },
];

const rootStyles: CSSProperties = {
  minHeight: "100vh",
  background:
    "linear-gradient(180deg, rgba(8,12,20,0.9), rgba(4,6,12,0.96)), url('/ships/IMG_3597.jpeg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  color: "#e0eafc",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "3rem",
  padding: "4rem 1.5rem 5rem",
  overflow: "hidden",
};

const heroStyles: CSSProperties = {
  width: "min(960px, 100%)",
  background: "rgba(10,16,28,0.78)",
  borderRadius: "24px",
  border: "1px solid rgba(148,163,184,0.2)",
  padding: "2.5rem clamp(1.5rem, 6vw, 3rem)",
  boxShadow: "0 24px 48px rgba(6,10,18,0.55)",
  display: "flex",
  flexDirection: "column",
  gap: "1.6rem",
  textAlign: "center",
  backdropFilter: "blur(14px)",
};

const galleryStyles: CSSProperties = {
  width: "min(1100px, 100%)",
  display: "flex",
  flexWrap: "wrap",
  gap: "1.5rem",
  justifyContent: "center",
};

const baseCardStyles: CSSProperties = {
  position: "relative",
  borderRadius: "20px",
  overflow: "hidden",
  border: "1px solid rgba(148,163,184,0.25)",
  background: "rgba(9,12,24,0.82)",
  boxShadow: "0 18px 36px rgba(6,10,18,0.42)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const squareCardStyles: CSSProperties = {
  ...baseCardStyles,
  width: "min(320px, 32vw)",
  aspectRatio: "1 / 1",
};

const landscapeCardStyles: CSSProperties = {
  ...baseCardStyles,
  width: "min(640px, 70vw)",
  aspectRatio: "16 / 9",
};

const mediaWrapperStyles: CSSProperties = {
  position: "relative",
  width: "100%",
  height: "100%",
};

const overlayStyles: CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(4, 8, 16, 0.94)",
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
  background: "rgba(6, 12, 24, 0.85)",
  boxShadow: "0 32px 72px rgba(6, 12, 24, 0.85)",
};

const overlayNavButton: CSSProperties = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  background: "rgba(15, 23, 42, 0.7)",
  color: "#e2e8f0",
  border: "1px solid rgba(148, 163, 184, 0.45)",
  borderRadius: "50%",
  width: "56px",
  height: "56px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "2rem",
  cursor: "pointer",
  boxShadow: "0 18px 40px rgba(2, 6, 18, 0.55)",
};

const overlayCloseButton: CSSProperties = {
  position: "absolute",
  top: "clamp(1.5rem, 4vw, 2.6rem)",
  right: "clamp(1.5rem, 4vw, 2.6rem)",
  background: "rgba(15, 23, 42, 0.7)",
  color: "#f8fafc",
  border: "1px solid rgba(148, 163, 184, 0.45)",
  borderRadius: "50%",
  width: "48px",
  height: "48px",
  fontSize: "1.8rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

export default function ShipsPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const images = useMemo(() => shipImages.map((img, index) => ({ ...img, index })), []);

  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current + 1) % images.length;
    });
  }, [images.length]);

  const showPrev = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current - 1 + images.length) % images.length;
    });
  }, [images.length]);

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
        <p style={{ letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(148,163,184,0.72)", margin: 0 }}>
          DIGITAL SCAN SERIES
        </p>
        <h1 style={{ fontSize: "clamp(2.6rem, 6vw, 3.6rem)", letterSpacing: "0.14em", margin: 0 }}>SHIPS</h1>
        <p style={{ fontSize: "1.1rem", lineHeight: 1.75, margin: 0, color: "rgba(224,234,252,0.85)" }}>
          An attempt to step away from tons of gear, cables, and machines, and turn toward painting. Not as a rejection,
          but as a deliberate opposite — a search for new experiences, fresh perspectives, and unexpected inspiration.
        </p>
      </header>

      <section style={galleryStyles}>
        {images.map((image) => (
          <figure
            key={image.src}
            style={image.orientation === "landscape" ? landscapeCardStyles : squareCardStyles}
          >
            <button
              type="button"
              onClick={() => setActiveIndex(image.index)}
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
                  sizes={
                    image.orientation === "landscape"
                      ? "(max-width: 1024px) 90vw, 640px"
                      : "(max-width: 768px) 80vw, 320px"
                  }
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
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
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
