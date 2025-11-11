import { Footer } from "@/components/footer";
import { CategoriesSection } from "@/components/home/categories-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { HeroSection } from "@/components/home/hero-section";
import { PromoBanner } from "@/components/home/promo-banner";
import { Navbar } from "@/components/navbar";
import SpinnerPage from "@/components/spinner";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
      </Suspense>
      <HeroSection />
      <CategoriesSection />
      <Suspense fallback={<SpinnerPage />}>
        <FeaturedProducts />
      </Suspense>
      <PromoBanner />
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
}
