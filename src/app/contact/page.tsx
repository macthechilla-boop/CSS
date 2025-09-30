
"use client";
import Link from "next/link";
import React, { useState } from "react";

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main
      style={{ padding: "3rem 1rem", maxWidth: 700, margin: "0 auto", fontFamily: "inherit" }}
    >
      <Link href="/" aria-label="Close" className="top-right-close">
        <span>×</span>
      </Link>
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Contact</h1>
      {submitted ? (
        <p style={{ fontSize: "1.2rem", color: "#4caf50" }}>
          Thank you for your message!
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            style={{ padding: "0.7rem", fontSize: "1rem" }}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            style={{ padding: "0.7rem", fontSize: "1rem" }}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            required
            rows={5}
            style={{ padding: "0.7rem", fontSize: "1rem" }}
          />
          <button
            type="submit"
            style={{
              padding: "0.7rem",
              fontSize: "1rem",
              background: "#222",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </form>
      )}
      <div style={{ marginTop: "2rem", fontSize: "1rem", color: "#888" }}>
        Or email directly: <a href="mailto:christian@seemann.space">christian@seemann.space</a>
      </div>
    </main>
  );
};

export default ContactPage;
