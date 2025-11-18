import SpinnerPage from "@/components/spinner";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddToCard from "../handlers/addToCard";
import { getAllProductVariants } from "../redux/productVariantsSlice";
import { Card, CardContent } from "./ui/card";

export default function ProductCard({
  index,
  isVisible,
  product,
  colorWidth,
  colorHeight,
  badge,
}) {
  const [allProductInfo, setAllProductInfo] = useState({});

  const { productVariants } = useSelector((state) => state.productVariants);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductVariants());
  }, []);

  useEffect(() => {
    if (!productVariants) return <SpinnerPage />;

    const variants = productVariants?.filter(
      (variant) => variant.product_id === product.id
    );
    // console.log(variants);
    // console.log(productVariants);

    setAllProductInfo({
      ...product,
      variants: variants,
    });
  }, [product, productVariants]);

  // console.log(allProductInfo);

  if (!product || !productVariants) return <SpinnerPage />;

  return (
    <Card
      key={product.id}
      className={`group overflow-hidden border-border transition-all duration-500 hover:shadow-xl py-0 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-accent/20">
          <Link href={`/products/${product.id}`}>
            <img
              src={
                `http://elsaket-store.atwebpages.com/backend/${product?.image?.[0]}` ||
                "/placeholder.svg"
              }
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </Link>

          {/* Badge */}
          {product.badge && (
            <div className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
              {product.badge}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-medium leading-tight transition-colors hover:text-primary text-balance">
            <Link href={`/products/${product.id}`}>{product.name}</Link>
          </h3>

          {/* Color Selection */}
          <div className="flex flex-col items-start gap-1">
            <div className="flex gap-2 items-center">
              <span className="text-sm font-medium">Color:</span>
              {allProductInfo.selectedColor && (
                <span className="ml-2 text-xs text-muted-foreground">
                  {allProductInfo.selectedColor}
                </span>
              )}
            </div>
            <div className="flex flex-wrap justify-between gap-1 sm:justify-start w-full">
              {allProductInfo?.variants?.[0]?.color.map((color, idx) => (
                <button
                  key={color}
                  type="button"
                  onClick={() =>
                    setAllProductInfo({
                      ...allProductInfo,
                      selectedColor: color,
                    })
                  }
                  className={`h-${colorHeight ? colorHeight : "6"} w-${
                    colorWidth ? colorWidth : "6"
                  } cursor-pointer rounded-full border-2 transition-all ${
                    allProductInfo?.selectedColor === color
                      ? "border-primary ring-2 ring-primary"
                      : "border-border"
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={color}
                />
              ))}
            </div>
          </div>

          {/* Size Section */}
          <div className="flex flex-col items-start gap-4 mt-2">
            <div className="flex gap-2 items-center">
              <span className="text-sm font-medium">Size:</span>
              {allProductInfo.selectedSize && (
                <span className="ml-2 text-xs text-muted-foreground">
                  {allProductInfo.selectedSize}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {allProductInfo?.variants?.[0]?.size.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() =>
                    setAllProductInfo({
                      ...allProductInfo,
                      selectedSize: size,
                    })
                  }
                  className={`px-3 py-1 rounded border text-sm font-medium transition-all cursor-pointer ${
                    allProductInfo.selectedSize === size
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:border-primary"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="mt-3 flex items-center gap-2 pb-6">
            <span className="font-sans text-xl font-bold text-primary">
              {product.price} EPG
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {product.originalPrice} EPG
              </span>
            )}
          </div>

          {/* Quick Add to Cart */}
          <AddToCard
            product={allProductInfo}
            selectedColor={allProductInfo.selectedColor}
            selectedSize={allProductInfo.selectedSize}
            badge={badge}
          />
        </div>
      </CardContent>
    </Card>
  );
}
