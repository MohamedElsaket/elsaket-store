"use client";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";

export default function FlyAnimation() {
  const { flyItem, setFlyItem, cartIconRef } = useCart();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (flyItem && cartIconRef.current) {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
        setFlyItem(null);
      }, 800);
    }
  }, [flyItem]);

  if (!flyItem || !animate) return null;

  const cartRect = cartIconRef.current.getBoundingClientRect();

  return (
    <motion.img
      src={flyItem.image}
      alt="fly"
      initial={{
        position: "fixed",
        left: flyItem.x,
        top: flyItem.y,
        width: 50,
        height: 50,
        borderRadius: "50%",
        zIndex: 9999,
      }}
      animate={{
        left: cartRect.left,
        top: cartRect.top,
        scale: 0.2,
        opacity: 0,
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    />
  );
}
