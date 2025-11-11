"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignRight } from "lucide-react";
import Link from "next/link";

const links = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  // { name: "Contact Us", href: "/contact" },
];

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="text-black">
          <AlignRight />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <ul className="flex flex-col items-center gap-6">
          {links.map((link, i) => (
            <li key={i} className="w-full pl-6 pb-4">
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>
        <SheetFooter>El-Saket Store ❤</SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
