'use client';

import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";

// Cleaned up Unified Absolute Imports

import FAQSection from "@/Components/FAQSection";
import FeaturedResidences from "@/Components/FeaturedResidences";
import Hero from "@/Components/Hero";
import JournalSection from "@/Components/JournalSection";
import Neighbourhoods from "@/Components/Neighbourhoods";
import Process from "@/Components/Process";
import Services from "@/Components/Services";
import StatsSection from "@/Components/StatsSection";
import Testimonials from "@/Components/Testimonials";

export default function Home(): React.JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Sync section layout visibility with live Firebase status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    // Terminate observer when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 antialiased selection:bg-[#B0926A]/30">
      <main className="w-full">
        {/* Full-width Luxury Hero Screen Area */}
        <Hero />

        {/* Dynamic Brand Statistics Matrix Block */}
        <StatsSection />

        {/* Structural Layout Stream (Content Grids) */}
        <div className="w-full">
          <FeaturedResidences />
          <Services />
          <Neighbourhoods />
          <Process />
          
          {/* Integrated Market Insights Grid - Conditional */}
          {isLoggedIn && <JournalSection />}
          
          <Testimonials />
          <FAQSection />
        </div>
      </main>
    </div>
  );
}