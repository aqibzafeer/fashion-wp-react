import { useEffect, useState } from "react";
import { extractKeywords } from "../../utils/extractKeywords";
import { fetchProducts } from "../../pages/api/FetchData";
import { toast } from "react-toastify";

const SmartProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleSearch = () => {
    const { color, price, category, text } = extractKeywords(searchTerm);

    const result = products.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(text);
      const categoryMatch =
        category ? product.categories?.some((cat) => cat.name?.toLowerCase().includes(category)) : true;
      const colorMatch = color ? product.name.toLowerCase().includes(color) : true;
      const priceMatch = price ? (product.sale_price || product.price) <= price : true;

      return nameMatch && categoryMatch && colorMatch && priceMatch;
    });

    setFilteredProducts(result);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Smart Product Search</h2>

      <div className="flex gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products like: 'black sneakers under 5000'"
          className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          Search
        </button>
      </div>

      <div className="mt-8">
        {loading ? (
          <p>Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <p>No matching products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg p-4 shadow hover:shadow-lg transition"
              >
                <img
                  src={product.images[0]?.src || "/product-images/product-9.jpg"}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded"
                />
                <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
                <p className="text-indigo-600 font-bold">Rs. {product.sale_price || product.price}</p>
                {product.sale_price && (
                  <p className="text-gray-400 line-through text-sm">Rs. {product.price}</p>
                )}
                <div className="mt-2">
                  {product.categories?.map((cat) => (
                    <span
                      key={cat.id}
                      className="inline-block text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded mr-1"
                    >
                      {cat.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartProductSearch;
