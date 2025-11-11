import FlyAnimation from "@/components/FlyAnimation";
import { CartProvider } from "@/context/CartContext";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import Providers from "./Providers";

export const metadata = {
  title: "El-Saket | Store",
  description: "Discover amazing products at great prices",
  generator: "v0.app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <CartProvider>
          <Providers>
            <FlyAnimation />
            <main className="min-h-screen lg:px-20">{children}</main>

            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </Providers>
        </CartProvider>
      </body>
    </html>
  );
}
