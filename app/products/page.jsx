"use client";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import ProductCard from "@/components/productCard";
import SpinnerPage from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { getAllProducts } from "@/redux/productSlice";
import { getAllProductVariants } from "@/redux/productVariantsSlice";
import { ShoppingCart, SlidersHorizontal, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ProductsContent() {
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [isVisible, setIsVisible] = useState(false);

  const { products } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());

    setIsVisible(true);
    const category = searchParams.get("category");

    if (category) {
      setSelectedCategories(category);
    }
  }, [searchParams]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch("/api/categories.php");
      const data = await res.json();
      // console.log(data);
      setCategories(data);
    };
    getCategories();
  }, []);

  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) =>
      prev?.includes(categoryId)
        ? prev?.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  if (!Array.isArray(products)) {
    return (
      <div className="flex justify-center items-center h-64">
        <SpinnerPage />
      </div>
    );
  }

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category_id);
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesCategory && matchesPrice;
  });

  // Sort products
  if (sortBy === "price-low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Header */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <h1 className="font-sans text-3xl font-bold md:text-4xl">
            All Products
          </h1>
          <p className="mt-2 text-muted-foreground">
            Discover our complete collection
          </p>
        </div>
      </div>

      <div className="container mx-auto px-2 sm:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-20 space-y-6">
              {/* Categories */}
              <div>
                <h3 className="mb-4 font-sans text-lg font-semibold">
                  Categories
                </h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center gap-2">
                      <Checkbox
                        id={category.id}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => toggleCategory(category.id)}
                      />
                      <Label
                        htmlFor={category.id}
                        className="cursor-pointer text-sm"
                      >
                        {category.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="mb-4 font-sans text-lg font-semibold">
                  Price Range
                </h3>
                <Slider
                  min={0}
                  max={500}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-4"
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{priceRange[0]}EGP</span>
                  <span>{priceRange[1]}EGP</span>
                </div>
              </div>

              {/* Reset Filters */}
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => {
                  setSelectedCategories([]);
                  setPriceRange([0, 500]);
                }}
              >
                Reset Filters
              </Button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden bg-transparent"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>
                <p className="text-sm text-muted-foreground">
                  {filteredProducts.length} products found
                </p>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="mb-6 rounded-lg border border-border bg-card p-4 lg:hidden">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-sans text-lg font-semibold">Filters</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowFilters(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Categories */}
                  <div>
                    <h4 className="mb-3 font-medium">Categories</h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div
                          key={category.id}
                          className="flex items-center gap-2"
                        >
                          <Checkbox
                            id={`mobile-${category.id}`}
                            checked={selectedCategories.includes(category.id)}
                            onCheckedChange={() => toggleCategory(category.id)}
                          />
                          <Label
                            htmlFor={`mobile-${category.id}`}
                            className="cursor-pointer text-sm"
                          >
                            {category.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h4 className="mb-3 font-medium">Price Range</h4>
                    <Slider
                      min={0}
                      max={500}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mb-4"
                    />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{priceRange[0]}EGP</span>
                      <span>{priceRange[1]}EGP</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="grid gap-y-6 gap-2 sm:gap-6 lg:gap-10 grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  index={index}
                  product={product}
                  id={product.id}
                  isVisible={isVisible}
                  colorWidth={8}
                  colorHeight={8}
                  badge={product.badge}
                />
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <ShoppingCart className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="mb-2 font-sans text-xl font-semibold">
                  No products found
                </h3>
                <p className="mb-6 text-muted-foreground">
                  Try adjusting your filters
                </p>
                <Button
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange([0, 500]);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-64">Loading...</div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
