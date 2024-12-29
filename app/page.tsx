'use client';

// Home Components
import { Hero } from "@/app/components/home/hero";
import { Stats } from "@/app/components/home/Stats";
import { Features } from "@/app/components/home/Features";
import { CTA } from "@/app/components/home/CTA";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Modern Design */}
      <Hero />

      {/* Stats Section with Animation */}
      <Stats />

      {/* Features Section with Better Visual Hierarchy */}
      <Features />

      {/* CTA Section with Dynamic Design */}
      <CTA />
    </div>
  );
}
