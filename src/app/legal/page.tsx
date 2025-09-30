"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const LegalPage = () => {
  const [legal, setLegal] = useState('');

  useEffect(() => {
    fetch('/legal.txt')
      .then((res) => res.text())
      .then(setLegal);
  }, []);

  return (
    <main
      style={{ padding: "3rem 1rem", maxWidth: 700, margin: "0 auto", fontFamily: "inherit" }}
    >
      <Link href="/" aria-label="Close" className="top-right-close">
        <span>×</span>
      </Link>
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Legal Notice / Impressum</h1>
      <pre style={{ whiteSpace: "pre-wrap", fontSize: "1.1rem", lineHeight: 1.7 }}>{legal}</pre>
    </main>
  );
};

export default LegalPage;
