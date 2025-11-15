"use client";

import { addProduct } from "@/redux/cartSlice";
import { useDispatch } from "react-redux";
import { Button } from "../components/ui/button";
import { ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";

import { useCart } from "@/context/CartContext";
// import { useRef } from "react";

export default function AddToCard({
  product,
  selectedColor,
  selectedSize,
  setQuantity,
  quantity,
  badge,
}) {
  const { setFlyItem } = useCart();

  const dispatch = useDispatch();

  const image = `http://elsaket-store.atwebpages.com/backend/${product?.image?.[0]}`;

  const add = (e) => {
    if (!selectedColor || !selectedSize) {
      toast.info("Select The Color and Size First !");
      return;
    } else {
      dispatch(addProduct({ ...product, productQuantity: quantity }));
      setQuantity ? setQuantity(1) : null;
      toast.success("Your Product Added to Cart");

      const rect = e.target.getBoundingClientRect();
      setFlyItem({
        image,
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
  };

  const sold_out = badge === "sold out";

  return (
    <Button
      size="lg"
      className={`w-full duration-500 ${
        sold_out ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={add}
      disabled={sold_out}
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      Add to Cart
    </Button>
  );
}
