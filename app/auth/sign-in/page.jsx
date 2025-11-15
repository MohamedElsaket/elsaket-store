"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, Binary } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { getUserEmail } from "@/redux/usersSlice";

export default function SignInPage() {
  // const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // indicate loading while the request is in progress
      setLoading(true);

      if (!showOTP) {
        const res = await fetch("/api/auth.php?action=request_otp", {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        console.log(data);

        if (data.status === true) {
          toast.success(data.message);
          setShowOTP(true);
        } else {
          toast.error(data.message);
        }
      } else {
        const res = await fetch("/api/auth.php?action=verify_otp", {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({ email, otp }),
        });
        const data = await res.json();
        console.log(data);

        if (data.status === true) {
          toast.success(data.message);

          Cookies.set("access_token", data.token, {
            expires: 2,
            sameSite: "strict",
          });

          Cookies.set("user_id", data.user.id, {
            expires: 2,
            sameSite: "strict",
          });

          dispatch(getUserEmail(email));

          router.push("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-accent/10 to-background px-4 py-12">
      <div className="w-full max-w-md">
        <Card
          className={`border-border shadow-xl transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <span className="font-sans text-2xl font-bold text-primary-foreground">
                E
              </span>
            </div>
            <CardTitle className="font-sans text-2xl font-bold">
              Sign in to continue ordering
            </CardTitle>
          </CardHeader>

          <CardContent>
            {/* Email */}
            {!showOTP ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                {!loading ? (
                  <Button type="submit" className="w-full" size="lg">
                    Sign In
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full opacity-70"
                    disabled={true}
                    size="lg"
                  >
                    Loading...
                  </Button>
                )}
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">OTP</Label>
                  <div className="relative">
                    <Binary className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="otp"
                      type="otp"
                      placeholder="Enter Your Digit Code..."
                      className="pl-10"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                {!loading ? (
                  <Button type="submit" className="w-full" size="lg">
                    Sign In
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full opacity-70"
                    disabled={true}
                    size="lg"
                  >
                    Loading...
                  </Button>
                )}
              </form>
            )}
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
