import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiChevronLeft, FiZoomIn } from "react-icons/fi";

const SingleArivalProduct = () => {
  const { handle } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetch(`https://cocobee.com.pk/products/${handle}.json`);
        const data = await response.json();
        const singleProduct = data.product;

        if (singleProduct) {
          const formattedProduct = {
            id: singleProduct.id,
            name: singleProduct.title,
            price: singleProduct.variants[0]?.price,
            images: singleProduct.images.map(img => ({ src: img.src })),
            description: singleProduct.body_html,
            stock_status: singleProduct.variants.some(v => v.available) ? "instock" : "outofstock",
          };
          setProduct(formattedProduct);
          setSelectedImage(formattedProduct.images?.[0]?.src);
        } else {
          toast.error("Product not found");
        }
      } catch (error) {
        console.error("Error loading product:", error);
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [handle]);

  const handleAddToCart = () => {
    addToCart({ ...product, price: product.price || 0 }, quantity);
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
    });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div></div>;
  }

  if (!product) {
    return (
      <div className="text-center py-16">
        <h3 className="text-2xl font-bold">Product not found</h3>
        <Link to="/new-arival" className="mt-4 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          <FiChevronLeft className="mr-2" />
          Back to New Arrivals
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <div className="relative bg-white rounded-xl shadow-md overflow-hidden">
              <img src={selectedImage} alt={product.name} className="w-full h-full object-contain cursor-pointer" onClick={() => setShowModal(true)} />
              <button onClick={() => setShowModal(true)} className="absolute bottom-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition" aria-label="Zoom in">
                <FiZoomIn className="w-5 h-5 text-gray-800" />
              </button>
            </div>
            <div className="mt-6 grid grid-cols-4 sm:grid-cols-6 gap-3">
              {product.images?.map((img, index) => (
                <div key={index} className={`relative pt-[100%] rounded-lg overflow-hidden cursor-pointer border-2 ${selectedImage === img.src ? "border-indigo-600" : "border-transparent"}`} onClick={() => setSelectedImage(img.src)}>
                  <img src={img.src} alt={`${product.name}-${index}`} className="absolute top-0 left-0 w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center justify-between mt-6">
                <div>
                  <span className="text-3xl font-bold text-indigo-600">Rs. {product.price}</span>
                </div>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${product.stock_status === "instock" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {product.stock_status === "instock" ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              <div className="mt-8 space-y-6">
                <div dangerouslySetInnerHTML={{ __html: product.description }} />
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded-md overflow-hidden">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200">-</button>
                    <span className="px-4 py-2 w-12 text-center">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200">+</button>
                  </div>
                  <button onClick={handleAddToCart} disabled={product.stock_status !== "instock"} className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${product.stock_status === "instock" ? "bg-indigo-600 text-white" : "bg-gray-300 cursor-not-allowed"}`}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
            <Link to="/new-arival" className="mt-6 inline-flex items-center px-4 py-2 bg-white text-gray-700 rounded-lg shadow hover:bg-gray-50 transition">
              <FiChevronLeft className="mr-2" />
              Back to New Arrivals
            </Link>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <img src={selectedImage} alt="Enlarged Product" className="max-w-full max-h-full object-contain" />
        </div>
      )}
    </div>
  );
};

export default SingleArivalProduct;