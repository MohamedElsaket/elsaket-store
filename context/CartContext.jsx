"use client";
import { createContext, useContext, useRef, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const cartIconRef = useRef(null);
  const [flyItem, setFlyItem] = useState(null);

  return (
    <CartContext.Provider value={{ cartIconRef, flyItem, setFlyItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
