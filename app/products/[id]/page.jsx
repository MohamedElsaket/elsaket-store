"use client";

import AddToCard from "@/handlers/addToCard";
import SpinnerPage from "@/components/spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getProductVariantsById } from "@/redux/productVariantsSlice";
import {
  Check,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  Shield,
  Star,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id;
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  const { singleProductVariants } = useSelector(
    (state) => state.productVariants
  );
  const dispatch = useDispatch();

  const productVartiantsInfo = singleProductVariants?.variants?.[0];

  useEffect(() => {
    dispatch(getProductVariantsById(productId));
  }, [productId]);

  useEffect(() => {
    // setProductVartiants(products?.variants?.[0]);

    async function getProductById() {
      const res = await fetch(
        `https://elsaket.great-site.net/backend/endpoints/products.php?product_id=${productId}`
      );
      const data = await res.json();
      // console.log(data);
      setProduct(data.product);
    }

    getProductById();
    setIsVisible(true);
  }, []);
  // console.log(productVartiantsInfo);
  // console.log(product);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (!product)
    return (
      <div className="flex justify-center items-center h-64">
        <SpinnerPage />
      </div>
    );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/products"
            className="transition-colors hover:text-foreground"
          >
            Products
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Images */}
          <div
            className={`space-y-4 transition-all duration-700 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-accent/20">
              <img
                src={
                  `https://elsaket.great-site.net/backend/${product?.image?.[selectedImage]}` ||
                  "/placeholder.svg"
                }
                alt={product?.name}
                className="h-full w-full object-cover"
              />
              {product.badge && (
                <Badge className="absolute left-4 top-4 bg-primary text-primary-foreground">
                  {product.badge}
                </Badge>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product?.image?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <img
                    src={
                      `https://elsaket.great-site.net/backend/${image}` ||
                      "/placeholder.svg"
                    }
                    alt={`${product.name} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div
            className={`space-y-6 transition-all duration-700 delay-200 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            {/* Category */}
            <div className="text-sm text-muted-foreground">
              {product.category}
            </div>

            {/* Title */}
            <div>
              <div className="flex items-center justify-between">
                <h1 className="font-sans text-3xl font-bold text-balance md:text-4xl">
                  {product.name}
                </h1>
                <Button size="lg" variant="outline">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              {/* Rating */}
              <div className="mt-3 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(4.9)
                            ? "fill-amber-400 text-amber-400"
                            : "fill-muted text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{product.rating}</span>
                </div>
                <Separator orientation="vertical" className="h-5" />
                <span className="text-sm text-muted-foreground">
                  {product.reviews} reviews
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="font-sans text-4xl font-bold text-primary">
                {product.price} EPG
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    {product.originalPrice} EPG
                  </span>
                  <Badge variant="destructive">
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )}
                    % OFF
                  </Badge>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-600" />
              <span className="font-medium text-green-600">In Stock</span>
            </div>

            <Separator />

            {/* Color Selection */}
            {productVartiantsInfo?.color &&
              productVartiantsInfo.color.length > 0 && (
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Color:</span>
                  <div className="flex gap-2">
                    {productVartiantsInfo.color.map((color, idx) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() =>
                          setProduct((prev) => ({
                            ...prev,
                            selectedColor: color,
                          }))
                        }
                        className={`h-8 w-8 rounded-full border-2 transition-all ${
                          product.selectedColor === color
                            ? "border-primary ring-2 ring-primary"
                            : "border-border"
                        }`}
                        style={{ backgroundColor: color }}
                        aria-label={color}
                      />
                    ))}
                  </div>
                  {product.selectedColor && (
                    <span className="ml-2 text-xs text-muted-foreground">
                      {product.selectedColor}
                    </span>
                  )}
                </div>
              )}

            {/* Size Selection */}
            {productVartiantsInfo?.size &&
              productVartiantsInfo.size.length > 0 && (
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-sm font-medium">Size:</span>
                  <div className="flex gap-2">
                    {productVartiantsInfo.size.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() =>
                          setProduct((prev) => ({
                            ...prev,
                            selectedSize: size,
                          }))
                        }
                        className={`px-3 py-1 rounded border text-sm font-medium transition-all ${
                          product.selectedSize === size
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-foreground hover:border-primary"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {product.selectedSize && (
                    <span className="ml-2 text-xs text-muted-foreground">
                      {product.selectedSize}
                    </span>
                  )}
                </div>
              )}

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Quantity:</span>
                  <div className="flex items-center rounded-lg border border-border">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        // dispatch(decrease(product));
                        decrementQuantity();
                      }}
                      className="h-10 w-10"
                      disabled={quantity === 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        // dispatch(increase(product));
                        incrementQuantity();
                      }}
                      className="h-10 w-10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <AddToCard
                product={product}
                selectedColor={product.selectedColor}
                selectedSize={product.selectedSize}
                setQuantity={setQuantity}
                quantity={quantity}
                badge={product.badge}
              />
              {/* <Link href={"/checkout"}>
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full hover:scale-105 duration-500"
                >
                  Buy Now
                </Button>
              </Link> */}
            </div>

            <Separator />

            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-5 w-5 text-primary" />
                <span>Free shipping on orders over 1000 EGP</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-5 w-5 text-primary" />
                <span>2-year warranty included</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RotateCcw className="h-5 w-5 text-primary" />
                <span>30-day return policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
