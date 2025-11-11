import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function CreateNewProductForm({ setShowForm }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [badge, setBadge] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);

  // 🧩 state للـ variants
  const [variants, setVariants] = useState([]);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch(
        "https://elsaket.great-site.net/backend/endpoints/categories.php"
      );
      const data = await res.json();
      setCategories(data);
    };
    getCategories();
  }, []);

  // 🔹 Add new variant locally
  const handleAddVariant = () => {
    if (!size || !color) {
      toast.warn("Please fill size and color first!");
      return;
    }
    setVariants((prev) => [
      ...prev,
      { size, color, stock_quantity: stockQuantity || 0 },
    ]);
    setSize("");
    setColor("");
    setStockQuantity("");
  };

  // 🔹 Remove variant locally
  const handleRemoveVariant = (index) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const sizesArray = size.split(",").map((s) => s.trim());
    // const colorsArray = color.split(",").map((c) => c.trim());

    try {
      // 1️⃣ Create the main product first
      const res = await fetch(
        "https://elsaket.great-site.net/backend/endpoints/products.php",
        {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({
            name,
            description,
            price,
            quantity,
            category_id: category,
            badge,
          }),
        }
      );
      const data = await res.json();

      if (data.status === true) {
        toast.success("New Product Created");

        const product_id = data.id; // تأكد إن ال endpoint بيرجع product_id بعد الإنشاء
        console.log(data);
        console.log(product_id);
        console.log(variants);

        // 2️⃣ Create all variants for this product
        for (const variant of variants) {
          await fetch(
            "https://elsaket.great-site.net/backend/endpoints/product_variants.php",
            {
              headers: { "Content-Type": "application/json" },
              method: "POST",
              body: JSON.stringify({
                product_id,
                size: variant.size.split(",").map((s) => s.trim()),
                color: variant.color.split(",").map((c) => c.trim()),
                stock_quantity: variant.stock_quantity,
              }),
            }
          );
        }

        toast.success("All Variants Created ✅");
      } else {
        toast.error("Can not create this product!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating product or variants!");
    } finally {
      setShowForm(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-[900px] h-[700px] overflow-y-auto rounded-2xl bg-white pt-12 p-4">
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="absolute top-4 right-4 p-2 cursor-pointer rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Close create product form"
        >
          <X />
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">
          Create New Product
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 grid grid-cols-6 gap-4"
        >
          {/* Normal Product Fields */}
          <div className="col-span-2">
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block mb-1 font-medium">Price</label>
            <input
              type="number"
              name="price"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block mb-1 font-medium">Quantity</label>
            <input
              type="number"
              name="quantity"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          <div className="col-span-3">
            <label className="block mb-1 font-medium">Category</label>
            <select
              name="category"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-3">
            <label className="block mb-1 font-medium">Badge</label>
            <select
              name="badge"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
            >
              <option value="">Select Badge</option>
              <option value="new">New</option>
              <option value="sale">Sale</option>
              <option value="best">Best Seller</option>
            </select>
          </div>

          <div className="col-span-6">
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-none"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* 🧩 Variants Section */}
          <div className="col-span-6 border-t pt-4">
            <h3 className="font-semibold mb-2">Product Variants</h3>
            <div className="grid grid-cols-6 gap-4 mb-3">
              {/* Sizes */}
              <div className="col-span-3">
                <label className="block mb-1 font-medium">
                  Sizes (comma separated)
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="e.g. XL, 2XL, 3XL"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                />
              </div>

              {/* Colors */}
              <div className="col-span-3">
                <label className="block mb-1 font-medium">
                  Colors (comma separated)
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="e.g. Black, White, Blue"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>

              <input
                type="number"
                placeholder="Stock Quantity"
                className="col-span-1 border border-gray-300 rounded-lg px-3 py-2"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
              />
              <button
                type="button"
                onClick={handleAddVariant}
                className="col-span-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                + Add
              </button>
            </div>

            {/* 🧾 List all added variants */}
            {variants.length > 0 && (
              <ul className="space-y-1">
                {variants.map((v, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border p-2 rounded-lg"
                  >
                    <span>
                      <strong>{v.size}</strong> | {v.color} | Stock:{" "}
                      {v.stock_quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveVariant(index)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="submit"
            className="col-span-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
}
