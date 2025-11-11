"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-accent/20 to-background">
      <div className="container mx-auto px-4 py-8 md:py-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Left Content */}
          <div
            className={`flex flex-col justify-center space-y-6 transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                New Arrivals
              </span>
            </div>

            <h1 className="font-sans text-4xl font-bold leading-tight text-balance md:text-5xl lg:text-6xl">
              Discover Amazing Products
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed text-pretty max-w-xl">
              Shop the latest trends and timeless classics. Quality products at
              unbeatable prices, delivered right to your door.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button size="lg" className="group">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/products?filter=sale">
                <Button size="lg" variant="outline">
                  View Deals
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div>
                <div className="font-sans text-3xl font-bold text-primary">
                  10K+
                </div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div>
                <div className="font-sans text-3xl font-bold text-primary">
                  50K+
                </div>
                <div className="text-sm text-muted-foreground">
                  Happy Customers
                </div>
              </div>
              <div>
                <div className="font-sans text-3xl font-bold text-primary">
                  4.8
                </div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-accent/20">
              <img
                src="/hero-banner.png"
                alt="Featured Products"
                className="h-full w-full object-cover"
              />

              {/* Floating Card */}
              <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-border bg-card/95 p-4 shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Special Offer</div>
                    <div className="text-sm text-muted-foreground">
                      Up to 50% off on selected items
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
