import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="font-sans text-lg font-bold text-primary-foreground">
              E
            </span>
          </div>
          <span className="font-sans text-lg font-semibold">
            El-Saket | Store
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <a
            href="https://api.whatsapp.com/send?phone=0201030848281"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            WhatsApp
          </a>

          <span>|</span>

          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors hover:text-foreground"
          >
            Facebook
          </a>

          <span>|</span>

          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors hover:text-foreground"
          >
            Instagram
          </a>

          <span>|</span>

          <a
            href="https://www.tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            TikTok
          </a>
        </div>
      </div>

      <div className="mt-4 border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} El-Saket | Store. All rights
          reserved.
        </p>
        <p>Developed By Mohamed Elsaket.. ❤</p>
        <p>+02 01030 084 8281</p>
      </div>
    </footer>
  );
}
