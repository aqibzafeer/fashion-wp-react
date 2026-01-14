import { useEffect, useState } from "react";
import {
  fetchProducts,
  deleteProduct,
  updateProduct,
  createProduct,
} from "../api/FetchData";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    const load = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    load();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      price: product.regular_price,
    });
  };

  const handleSave = async (id) => {
    await updateProduct(id, {
      name: formData.name,
      regular_price: formData.price,
    });
    setEditingId(null);
    const updated = await fetchProducts();
    setProducts(updated);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const productData = {
      name: newProduct.name,
      regular_price: newProduct.price,
      description: newProduct.description,
      images: [{ src: newProduct.image }],
    };

    try {
      await createProduct(productData);
      alert("Product created successfully!");
      setNewProduct({ name: "", price: "", description: "", image: "" });
      const refreshed = await fetchProducts();
      setProducts(refreshed);
    } catch (err) {
      console.error("Error adding product", err);
      alert("Failed to create product");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-2 sm:p-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
        Manage Products
      </h2>

      {/* Add Product Form */}
      <form
        onSubmit={handleAddProduct}
        className="mb-8 rounded-2xl p-2 sm:p-4 bg-amber-50"
      >
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center">
          Add New Product
        </h3>
        <input
          type="text"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          placeholder="Name"
          className="input mb-3 sm:mb-4 w-full p-2 sm:p-3 bg-blue-100 rounded-2xl text-sm sm:text-base"
          required
        />
        <input
          type="text"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          placeholder="Price"
          className="input mb-3 sm:mb-4 w-full p-2 sm:p-3 bg-blue-100 rounded-2xl text-sm sm:text-base"
          required
        />
        <input
          type="text"
          value={newProduct.image}
          onChange={(e) =>
            setNewProduct({ ...newProduct, image: e.target.value })
          }
          placeholder="Image URL"
          className="input mb-3 sm:mb-4 w-full p-2 sm:p-3 bg-blue-100 rounded-2xl text-sm sm:text-base"
          required
        />
        <textarea
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          placeholder="Description"
          className="input mb-3 sm:mb-4 w-full p-2 sm:p-3 bg-blue-100 rounded-2xl text-sm sm:text-base"
          required
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-gray-800 to-indigo-600 text-white py-2 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition text-sm sm:text-base"
        >
          Add Product
        </button>
      </form>

      <ul className="space-y-4">
        {products.map((product) => (
          <li
            key={product.id}
            className="bg-gray-100 p-2 sm:p-4 rounded shadow-md flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2"
          >
            {editingId === product.id ? (
              <div className="flex-1 space-y-2">
                <input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="input w-full text-sm sm:text-base"
                />
                <input
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="input w-full text-sm sm:text-base"
                />
                <button
                  onClick={() => handleSave(product.id)}
                  className="w-full bg-gradient-to-r from-gray-800 to-indigo-600 text-white py-2 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition text-sm sm:text-base"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1">
                  <h4 className="font-semibold text-base sm:text-lg">
                    {product.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Rs. {product.regular_price}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="px-3 sm:px-4 bg-gradient-to-r from-gray-800 to-indigo-600 text-white py-2 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition text-sm sm:text-base"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="px-3 sm:px-4 bg-gradient-to-r from-red-600 to-pink-600 text-white py-2 rounded-lg font-medium hover:from-red-700 hover:to-pink-700 transition text-sm sm:text-base"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageProducts;
