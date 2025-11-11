"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("[v0] Contact form submitted");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="border-b border-border bg-gradient-to-br from-background via-accent/10 to-background">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-sans text-4xl font-bold text-balance md:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Have a question? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Information */}
          <div
            className={`space-y-6 transition-all duration-700 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-sans text-lg font-semibold">
                  Email Us
                </h3>
                <p className="text-sm text-muted-foreground">
                  Our team is here to help
                </p>
                <a
                  href="mailto:support@shophub.com"
                  className="mt-2 block text-sm font-medium text-primary"
                >
                  support@shophub.com
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-sans text-lg font-semibold">
                  Call Us
                </h3>
                <p className="text-sm text-muted-foreground">
                  Mon-Fri from 8am to 5pm
                </p>
                <a
                  href="tel:+15551234567"
                  className="mt-2 block text-sm font-medium text-primary"
                >
                  +1 (555) 123-4567
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-sans text-lg font-semibold">
                  Visit Us
                </h3>
                <p className="text-sm text-muted-foreground">
                  123 Commerce Street
                  <br />
                  New York, NY 10001
                  <br />
                  United States
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-sans text-lg font-semibold">
                  Business Hours
                </h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Monday - Friday: 8am - 8pm</p>
                  <p>Saturday: 9am - 6pm</p>
                  <p>Sunday: 10am - 4pm</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div
            className={`lg:col-span-2 transition-all duration-700 delay-200 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            <Card>
              <CardContent className="p-8">
                <h2 className="mb-6 font-sans text-2xl font-bold">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="How can we help?"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <textarea
                      id="message"
                      rows={6}
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      placeholder="Tell us more about your inquiry..."
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full sm:w-auto">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="mt-8">
              <CardContent className="p-8">
                <h3 className="mb-6 font-sans text-xl font-bold">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 font-medium">
                      What are your shipping options?
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We offer standard (5-7 days), express (2-3 days), and
                      overnight shipping options. Free shipping is available on
                      orders over $50.
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2 font-medium">
                      What is your return policy?
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We accept returns within 30 days of purchase. Items must
                      be unused and in original packaging.
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2 font-medium">
                      Do you ship internationally?
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Yes, we ship to most countries worldwide. International
                      shipping rates vary by location.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
