"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Collection from "@/components/Collection";
import Roadmap from "@/components/Roadmap";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import useScrollAnimation from "@/hooks/useScrollAnimation";

export default function Home() {
  useScrollAnimation();

  return (
    <main className="container">
      <Navbar />
      <Hero />
      <Collection />
      <Roadmap />
      <FAQ />
      <Footer />
    </main>
  );
}
