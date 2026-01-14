import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../api/FetchData";
import { toast } from "react-toastify";
import { FiSave, FiX, FiImage, FiDollarSign, FiTag, FiFileText, FiPackage } from "react-icons/fi";

const categories = [
  { id: 1, name: "Outerwear" },
  { id: 2, name: "Shirts" },
  { id: 3, name: "Pants" },
  { id: 4, name: "Hoodies" },
  { id: 5, name: "Footwear" },
  { id: 6, name: "Bags" },
  { id: 7, name: "T-Shirts" },
  { id: 8, name: "Accessories" },
];

const AddProductForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    sale_price: "",
    short_description: "",
    description: "",
    image: "",
    category: "",
    stock_status: "instock",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (name === "image") {
      setImagePreview(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const selectedCategory = categories.find((c) => c.name === formData.category);
    
    const newProduct = {
      name: formData.name,
      price: Number(formData.price),
      regular_price: Number(formData.price),
      sale_price: formData.sale_price ? Number(formData.sale_price) : null,
      short_description: formData.short_description,
      description: formData.description,
      images: [{ src: formData.image }],
      categories: selectedCategory ? [selectedCategory] : [],
      stock_status: formData.stock_status,
    };

    try {
      await createProduct(newProduct);
      toast.success("Product added successfully!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      // Reset form
      setFormData({
        name: "",
        price: "",
        sale_price: "",
        short_description: "",
        description: "",
        image: "",
        category: "",
        stock_status: "instock",
      });
      setImagePreview("");
    } catch (err) {
      console.error("Error adding product", err);
      toast.error("Failed to add product. Make sure the backend is running.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/manageproducts");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-gray-600 mt-2">Fill in the details to add a new product to your store</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FiFileText className="text-indigo-600" />
                  Basic Information
                </h2>
                
                <div className="space-y-4">
                  {/* Product Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g., Premium Cotton T-Shirt"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      required
                    />
                  </div>

                  {/* Short Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Short Description *
                    </label>
                    <input
                      type="text"
                      name="short_description"
                      value={formData.short_description}
                      onChange={handleChange}
                      placeholder="Brief product summary (shown on product cards)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      required
                    />
                  </div>

                  {/* Full Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Detailed product description..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FiDollarSign className="text-indigo-600" />
                  Pricing
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Regular Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Regular Price (PKR) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">Rs.</span>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        required
                      />
                    </div>
                  </div>

                  {/* Sale Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sale Price (PKR)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">Rs.</span>
                      <input
                        type="number"
                        name="sale_price"
                        value={formData.sale_price}
                        onChange={handleChange}
                        placeholder="0 (optional)"
                        min="0"
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FiImage className="text-indigo-600" />
                  Product Image
                </h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter a valid image URL (jpg, png, webp)
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Category, Status & Preview */}
            <div className="space-y-6">
              {/* Image Preview */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Preview</h2>
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <FiImage className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-sm">Image preview</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Category & Status */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FiTag className="text-indigo-600" />
                  Organization
                </h2>
                
                <div className="space-y-4">
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-white"
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Stock Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock Status
                    </label>
                    <select
                      name="stock_status"
                      value={formData.stock_status}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-white"
                    >
                      <option value="instock">In Stock</option>
                      <option value="outofstock">Out of Stock</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Adding...
                      </>
                    ) : (
                      <>
                        <FiSave className="w-5 h-5" />
                        Add Product
                      </>
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition"
                  >
                    <FiX className="w-5 h-5" />
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
