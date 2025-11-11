"use client";

import { Button } from "@/components/ui/button";
import { Gift, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function PromoBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("promo-banner");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="promo-banner" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/90 to-primary p-8 md:p-12 lg:p-16 transition-all duration-1000 ${
            isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-foreground" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary-foreground" />
          </div>

          <div className="relative grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left Content */}
            <div className="flex flex-col justify-center space-y-6">
              <div className="inline-flex items-center gap-2 self-start rounded-full bg-primary-foreground/20 px-4 py-1.5">
                <Gift className="h-4 w-4 text-primary-foreground" />
                <span className="text-sm font-medium text-primary-foreground">
                  Limited Time Offer
                </span>
              </div>

              <h2 className="font-sans text-3xl font-bold text-primary-foreground text-balance md:text-4xl lg:text-5xl">
                Get 30% Off Your First Order
              </h2>

              <p className="text-lg text-primary-foreground/90 leading-relaxed text-pretty max-w-xl">
                Sign up today and enjoy exclusive discounts on your first
                purchase. Plus, get free shipping on orders over $50.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/auth/sign-in">
                  <Button size="lg" variant="secondary" className="group">
                    Sign In Now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/products">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    Browse Products
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative hidden lg:block">
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <img
                  src="/Product.png"
                  alt="Special Offer"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
