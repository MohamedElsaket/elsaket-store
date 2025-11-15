"use client";

import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";

export function CategoriesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch("/api/categories.php");
      const data = await res.json();
      // console.log(data);
      setCategories(data);
    };
    getCategories();
  }, []);

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

    const element = document.getElementById("categories-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="categories-section" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="font-sans text-3xl font-bold text-balance md:text-4xl">
            Shop by Category
          </h2>
          <p className="mt-3 text-muted-foreground text-pretty">
            Explore our wide range of product categories
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => {
            // const Icon = category.icon;
            return (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
              >
                <Card
                  className={`group relative overflow-hidden border-border p-6 transition-all duration-500 hover:scale-105 hover:shadow-lg ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br  opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                  />

                  <div className="relative flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                      {/* <Icon className="h-7 w-7 text-primary" /> */}
                      <img
                        src={`http://elsaket-store.atwebpages.com/backend/uploads/${category.image}`}
                        alt="Category Image"
                        className="w-full h-full rounded-xl object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-sans text-lg font-semibold">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </div>

                    <div className="text-muted-foreground transition-transform group-hover:translate-x-1">
                      →
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
