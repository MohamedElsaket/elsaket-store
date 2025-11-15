"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  clear,
  decrease,
  deleteProduct,
  getCartProducts,
  increase,
} from "@/redux/cartSlice";
import { Minus, Plus, Trash2, X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export function CartSidebar({ isOpen, onClose }) {
  const { items: cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.productQuantity,
    0
  );

  useEffect(() => {
    dispatch(getCartProducts());
  }, [isOpen]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-full overflow-scroll bg-card shadow-xl transition-transform duration-300 ease-in-out sm:w-[400px] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border p-4">
            <h2 className="font-sans text-lg font-semibold">Shopping Cart</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Cart Items */}
          {!cartItems.length ? (
            <div>
              <ScrollArea className="flex-1 p-4 flex items-center justify-center">
                <span className="text-muted-foreground text-center w-full">
                  Your Cart is Empty Yet !
                </span>
              </ScrollArea>
            </div>
          ) : (
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {cartItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 rounded-lg border border-border p-3 transition-colors hover:bg-accent/50"
                  >
                    <img
                      src={
                        `http://elsaket-store.atwebpages.com/backend/uploads/${item.image[0]}` ||
                        "/placeholder.svg"
                      }
                      alt={item.name}
                      className="h-20 w-20 rounded-md object-cover"
                    />
                    <div className="flex flex-1 flex-col gap-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium leading-tight">
                          {item.name}
                        </h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => {
                            dispatch(deleteProduct(item.id));
                            toast.success("The Product Deleted");
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                      <div className="flex items-end justify-between">
                        <div className="text-sm">
                          <p>Color: {item.selectedColor ?? null}</p>
                          <p>Size: {item.selectedSize ?? null}</p>
                        </div>
                        <p className="font-sans text-sm font-semibold text-primary">
                          {item.price} EPG
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className={`h-7 w-7 bg-transparent ${
                            item.productQuantity === 1
                              ? "cursor-not-allowed opacity-50"
                              : ""
                          }`}
                          onClick={() => dispatch(decrease(item))}
                          disabled={item.productQuantity === 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.productQuantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 bg-transparent"
                          onClick={() => dispatch(increase(item))}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}

          {/* Clear */}
          {cartItems.length ? (
            <Button
              onClick={() => {
                dispatch(clear());
                toast.success("Your Cart is Clear");
              }}
              className="bg-red-700"
            >
              Clear
            </Button>
          ) : (
            ""
          )}

          {/* Footer */}
          <div className="border-t border-border p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-sans text-lg font-semibold">
                  {subtotal.toFixed(2)} EPG
                </span>
              </div>
              <Separator />
              {subtotal ? (
                <div>
                  <Link href="/checkout" onClick={onClose}>
                    <Button className="w-full" size="lg">
                      Checkout
                    </Button>
                  </Link>
                </div>
              ) : (
                <div>
                  <Button onClick={onClose} className="w-full" size="lg">
                    &larr; Continue Shopping
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
