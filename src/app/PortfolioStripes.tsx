"use client";
import React, { useRef, useEffect } from "react";

export default function PortfolioStripes() {
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
      img: "/sinks/DSCF7667.jpg",
      desc: "Sequential photographic series captured inside polished sinks with engineered lighting cues.",
    },
  ];

  const stripeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            entry.target.classList.remove("out");
          } else {
            entry.target.classList.remove("visible");
            entry.target.classList.add("out");
          }
        });
      },
      {
        threshold: 0,
      }
    );
    stripeRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    // Scroll event for top stripe flyleft effect
    const handleScroll = () => {
      stripeRefs.current.forEach((stripe) => {
        if (stripe) {
          const rect = stripe.getBoundingClientRect();
          if (rect.top <= 0) {
            stripe.classList.add("flyleft");
            stripe.classList.remove("visible");
          } else {
            stripe.classList.remove("flyleft");
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              stripe.classList.add("visible");
              stripe.classList.remove("out");
            }
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {projects.map((project, i) => (
        <div
          key={i}
          ref={el => { stripeRefs.current[i] = el; }}
          className={`portfolio-stripe stripe-${i} out`}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "2rem",
            width: "100vw",
            minHeight: "510px",
            background: i % 2 === 0 ? "#222" : "#181a20",
            boxShadow: "0 2px 24px #0002",
            overflow: "hidden",
            margin: 0,
            padding: "0 0 0 8vw",
          }}
        >
          <img
            src={project.img}
            alt={project.title}
            style={{
              width: "90%",
              aspectRatio: "2.35 / 1",
              height: "auto",
              minHeight: "180px",
              maxHeight: "320px",
              objectFit: "cover",
              borderRadius: "16px",
              boxShadow: "0 4px 32px #0004",
              background: "#222",
              display: "block",
            }}
          />
          <div style={{ textAlign: "left", maxWidth: "420px", padding: "2rem", background: "none", borderRadius: "16px" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", fontWeight: 600 }}>{project.title}</h3>
            <p style={{ fontSize: "1.08rem", color: "#bbb" }}>{project.desc}</p>
          </div>
        </div>
      ))}
      <style>{`
        .portfolio-stripe {
         opacity: 0.2;
         transform: translateX(100vw);
          transition: opacity 0.8s, transform 0.8s cubic-bezier(.55,0,.55,1);
         will-change: opacity, transform;
        }
        .portfolio-stripe.visible {
         opacity: 1 !important;
         transform: translateX(0) !important;
        }
        .portfolio-stripe.out {
         opacity: 0.2 !important;
         transform: translateX(100vw) !important;
        }
        .portfolio-stripe.flyleft {
         opacity: 0.2 !important;
         transform: translateX(-100vw) !important;
          transition: opacity 0.8s, transform 0.8s cubic-bezier(.55,0,.55,1);
        }
      `}</style>
    </>
  );
}
