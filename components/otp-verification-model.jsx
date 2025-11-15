"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export default function OTPVerificationModal({
  isOpen,
  onClose,
  isGuest,
  setShowPopup,
  setIsPlaced,
  name,
  email,
  phone,
  address,
  city,
  country,
}) {
  const [otp, setOtp] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, otp);

    try {
      const res = await fetch("/api/auth.php?action=verify_otp", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ email, otp }),
      });
      console.log(res);

      const data = await res.json();
      // console.log(data);

      if (data.status === true) {
        // toast.success(data.message);

        if (isGuest) {
          Cookies.set("access_token", data.token, {
            expires: 2,
            sameSite: "strict",
          });

          Cookies.set("user_id", data.user.id, {
            expires: 2,
            sameSite: "strict",
          });

          try {
            await fetch("/api/auth.php?action=update_info", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name,
                email,
                phone,
                address,
                city,
                country,
              }),
            });
          } catch (error) {
            console.error(error);
          }
        }

        setIsPlaced(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      setShowPopup(false);
      setOtp("");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl p-6 w-80 shadow-lg">
        <h2 className="text-xl font-semibold text-center mb-4">
          Verify OTP Code
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP..."
            maxLength={6}
            className="border rounded-lg px-3 py-2 text-center tracking-widest text-lg outline-none focus:ring-2 focus:ring-slate-600"
          />

          <Button type="submit">Verify</Button>
        </form>

        <Button
          onClick={onClose}
          className="mt-3 text-sm text-gray-500 hover:text-gray-100 hover:bg-gray-500 block mx-auto bg-gray-100 w-full"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
