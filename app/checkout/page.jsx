"use client";

import OTPVerificationModal from "@/components/otp-verification-model";
import SpinnerPage from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import getToken from "@/handlers/getToken";
import getUserId from "@/handlers/getUserId";
import { getCartProducts } from "@/redux/cartSlice";
import { CreditCard, Lock, MapPin, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function CheckoutPage() {
  const { items: cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const userId = getUserId();
  const token = getToken();
  const isGuest = !token;

  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaced, setIsPlaced] = useState(false);

  useEffect(() => {
    dispatch(getCartProducts());
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.productQuantity,
    0
  );
  const shipping = 50.0;
  const total = subtotal + shipping;

  async function handleClick() {
    try {
      setIsLoading(true);

      const res = await fetch(
        "https://elsaket.great-site.net/backend/endpoints/auth.php?action=request_otp",
        {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({ email }),
        }
      );
      const data = await res.json();
      // console.log(data);

      if (data.status === true) {
        toast.success(data.message);
        setShowPopup(true);
      } else {
        toast.error(data.message);
      }
      setIsLoading(false);
    } catch (error) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    if (!isPlaced) return;

    const placeOrder = async () => {
      try {
        const res = await fetch(
          "https://elsaket.great-site.net/backend/endpoints/orders.php",
          {
            headers: { "Content-Type": "appplication/json" },
            method: "POST",
            body: JSON.stringify({
              user_id: userId,
              items: cartItems,
              total_price: subtotal,
            }),
          }
        );
        // console.log(res);

        const data = await res.json();
        // console.log(data);

        if (data.status === true) {
          toast.success(data.message);

          await fetch("/api/sendOrderEmail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name,
              email,
              orderId: data.order_id,
              total,
            }),
          });
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setCity("");
        setCountry("");

        localStorage.removeItem("cart");

        router.push("/orders");
      }
    };

    placeOrder();
  }, [isPlaced]);

  return (
    <div className="min-h-screen bg-background py-12">
      <Suspense fallback={<SpinnerPage />}>
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-sans text-3xl font-bold md:text-4xl">
              Checkout
            </h1>
            <p className="mt-2 text-muted-foreground">Complete your purchase</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <Card
                className={`transition-all duration-500 ${
                  isVisible
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-10 opacity-0"
                }`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input
                      type="text"
                      name="fullName"
                      placeholder="Enter Your Full Name..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter Your Email..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter Your Phone Number..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Address</Label>
                    <Input
                      id="address"
                      placeholder="Enter Your Adress..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>City</Label>
                      <Input
                        id="city"
                        placeholder="Enter Your City..."
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Country</Label>
                      <Input
                        id="country"
                        placeholder="Enter Your Country..."
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Method */}
              <Card
                className={`transition-all duration-500 delay-100 ${
                  isVisible
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-10 opacity-0"
                }`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-primary" />
                    Shipping Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup defaultValue="standard" className="space-y-3">
                    <div className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-accent/50">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label className="">
                          <div className="font-medium">Standard Shipping</div>
                        </Label>
                      </div>
                      <span className="font-medium">50.00 EGP</span>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card
                className={`transition-all duration-500 delay-200 ${
                  isVisible
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-10 opacity-0"
                }`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Payment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="text-sm text-muted-foreground">
                    All transactions are secure and encrypted.
                  </span>
                  <div className="rounded-lg border border-slate-800 bg-slate-200 mt-4 p-4">
                    {/* <RadioGroupItem value="paypal" id="paypal" /> */}
                    <Label className="flex-1">Cash on Delivery (COD)</Label>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <Card
                className={`sticky top-20 transition-all duration-500 delay-300 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Cart Items */}
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <div key={item.id} className="flex gap-3">
                          <img
                            src={
                              `https://elsaket.great-site.net/backend/${item.image[0]}` ||
                              "/placeholder.svg"
                            }
                            alt={item.name}
                            className="h-16 w-16 rounded-md object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="text-sm font-medium leading-tight">
                              {item.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.productQuantity}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Color: {item.selectedColor}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Size: {item.selectedSize}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm font-bold text-primary">
                          {item.price} EGP
                        </p>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">
                        {subtotal.toFixed(2)} EGP
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">
                        {shipping.toFixed(2)} EGP
                      </span>
                    </div>
                  </div>

                  <Separator />

                  {/* Total */}
                  <div className="flex justify-between">
                    <span className="font-sans text-lg font-semibold">
                      Total
                    </span>
                    <span className="font-sans text-lg font-bold text-primary">
                      {total.toFixed(2)} EGP
                    </span>
                  </div>

                  {/* Place Order Button */}
                  <Button
                    className={`w-full ${isLoading ? "corsur-disable" : ""}`}
                    disabled={isLoading}
                    size="lg"
                    onClick={handleClick}
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-4" />
                        <span>Loading...</span>
                      </span>
                    ) : (
                      "Complete Order"
                    )}
                  </Button>

                  {/* Security Note */}
                  <p className="text-center text-xs text-muted-foreground">
                    Your payment information is secure and encrypted
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <OTPVerificationModal
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
          name={name}
          email={email}
          phone={phone}
          address={address}
          city={city}
          country={country}
          isGuest={isGuest}
          setShowPopup={setShowPopup}
          setIsPlaced={setIsPlaced}
        />
      </Suspense>
    </div>
  );
}
