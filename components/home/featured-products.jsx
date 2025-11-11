"use client";

import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/redux/productSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../productCard";

export function FeaturedProducts() {
  const [isVisible, setIsVisible] = useState(false);

  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());

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

    const element = document.getElementById("featured-products");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // console.log(products);

  return (
    <section id="featured-products" className="bg-muted/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="font-sans text-3xl font-bold text-balance md:text-4xl">
              Featured Products
            </h2>
            <p className="mt-3 text-muted-foreground text-pretty">
              Handpicked items just for you
            </p>
          </div>
          <Link href="/products">
            <Button variant="outline">View All</Button>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {!Array.isArray(products) ? (
            <div className="flex justify-center items-center h-64">
              Loading...
            </div>
          ) : (
            products
              .slice(0, 3)
              .map((product, index) => (
                <ProductCard
                  key={product.id}
                  index={index}
                  isVisible={isVisible}
                  id={product.id}
                  product={product}
                  colorWidth={8}
                  colorHeight={8}
                  badge={product.badge}
                />
              ))
          )}
        </div>
      </div>
    </section>
  );
}
