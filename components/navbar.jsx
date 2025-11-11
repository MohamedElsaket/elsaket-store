"use client";

import { CartSidebar } from "@/components/cart-sidebar";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import MobileNav from "./mobileNav";

import { useCart } from "@/context/CartContext";
import GoogleTranslate from "./GoogleTranslate";

export function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items } = useSelector((state) => state.cart);

  const { cartIconRef } = useCart();

  const cartItemsCount = items.length || "";

  return (
    <>
      <nav className="sticky top-0 z-20 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="font-sans text-lg font-bold text-primary-foreground">
                  E
                </span>
              </div>
              <span className="font-sans text-xl font-semibold">El-Saket</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden items-center gap-6 lg:flex">
              <Link
                href="/"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Products
              </Link>
              {/* <Link
                href="/contact"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Contact
              </Link> */}
              {/* <Link
                href="/dashboard"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Dashboard
              </Link> */}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* <GoogleTranslate /> */}

              {/* <Link href="/auth/sign-in">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link> */}

              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setIsCartOpen(true)}
                ref={cartIconRef}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                    {cartItemsCount}
                  </span>
                )}
              </Button>

              {/* Mobile navigation */}
              <div className="lg:hidden">
                <MobileNav />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
