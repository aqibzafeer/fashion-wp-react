import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchWooProduct } from "../services/wooCommerceAPI";
import { getImageUrl } from "../api/FetchData";
import { useCart } from "../hooks/useCart";
import FeaturedProducts from "../components/FeaturedProducts";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiChevronLeft, FiZoomIn } from "react-icons/fi";

import stripHtml from "../utils/stripHtml";



const SingleProduct = () => {

  const { id } = useParams();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [quantity, setQuantity] = useState(1);



  useEffect(() => {

    const loadProduct = async () => {

      try {

        const data = await fetchWooProduct(id);

        setProduct(data);

        // Only set image if it exists
        const productImage = getImageUrl(data.images?.[0]?.src);
        if (productImage) {
          setSelectedImage(productImage);
        }

      } catch (error) {

        console.error("Error loading product:", error);

        toast.error("Failed to load product details");

      } finally {

        setLoading(false);

      }

    };

    loadProduct();

  }, [id]);



  const handleAddToCart = () => {

    addToCart(product, quantity);

    toast.success(`${product.name} added to cart!`, {

      position: "bottom-right",

      autoClose: 2000,

      hideProgressBar: true,

      closeOnClick: true,

      pauseOnHover: true,

      draggable: false,

      theme: "colored",

      className: "bg-green-100 text-green-800"

    });

  };



  if (loading) {

    return (

      <div className="flex justify-center items-center h-64">

        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>

      </div>

    );

  }



  if (!product) {

    return (

      <div className="text-center py-16">

        <div className="max-w-md mx-auto">

          <svg

            className="w-16 h-16 mx-auto text-gray-400"

            fill="none"

            stroke="currentColor"

            viewBox="0 0 24 24"

          >

            <path

              strokeLinecap="round"

              strokeLinejoin="round"

              strokeWidth="2"

              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"

            ></path>

          </svg>

          <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 tracking-tight">Product not found</h3>

          <p className="mt-2 text-gray-600">

            The product you're looking for doesn't exist or may have been removed.

          </p>

          <Link

            to="/products"

            className="mt-4 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"

          >

            <FiChevronLeft className="mr-2" />

            Back to Products

          </Link>

        </div>

      </div>

    );

  }



  return (

    <div className="bg-gray-50 min-h-screen">

      {/* Hero Section */}

      <div className="bg-linear-to-r from-indigo-700 to-purple-800 py-16 text-center">

        <div className="container mx-auto px-4">

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 tracking-tight">Product Details</h2>

          <p className="text-lg text-indigo-100 max-w-2xl mx-auto">

            Explore all the features and specifications

          </p>

        </div>

      </div>



      {/* Product Details */}

      <div className="container mx-auto px-4 py-12">

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Main Image Column */}

          <div className="lg:w-1/2">

            <div className="relative bg-white rounded-xl shadow-md overflow-hidden">

              <div className="relative pt-[100%]">
                {selectedImage ? (
                  <img

                    src={selectedImage}

                    alt={product.name}

                    className="absolute top-0 left-0 w-full h-full object-contain cursor-pointer"

                    onClick={() => setShowModal(true)}

                    crossOrigin="anonymous"

                  />
                ) : (
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-gray-500">No Image Available</span>
                  </div>
                )}

                <button

                  onClick={() => setShowModal(true)}

                  className="absolute bottom-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition"

                  aria-label="Zoom in"

                >

                  <FiZoomIn className="w-5 h-5 text-gray-800" />

                </button>

              </div>

            </div>



            {/* Thumbnail Gallery */}

            <div className="mt-6 grid grid-cols-4 sm:grid-cols-6 gap-3">

              {product.images?.map((img, index) => {
                const imgUrl = getImageUrl(img.src);
                if (!imgUrl) return null; // Don't show thumbnail if no image URL
                
                return (
                  <div

                    key={index}

                    className={`relative pt-[100%] rounded-lg overflow-hidden cursor-pointer border-2 ${

                      selectedImage === imgUrl

                        ? "border-indigo-600"

                        : "border-transparent"

                    }`}

                    onClick={() => setSelectedImage(imgUrl)}

                  >

                    <img

                      src={imgUrl}

                      alt={`${product.name}-${index}`}

                      className="absolute top-0 left-0 w-full h-full object-cover"

                      crossOrigin="anonymous"

                    />

                  </div>
                );
              })}

            </div>

          </div>



          {/* Product Info Column */}

          <div className="lg:w-1/2">

            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 tracking-tight">

                {product.name}

              </h1>



              <div className="flex items-center justify-between mt-6">

                <div>

                  <span className="text-3xl font-bold text-indigo-600">

                    Rs. {product.sale_price || product.price}

                  </span>

                  {product.sale_price && (

                    <span className="ml-2 text-lg text-gray-500 line-through">

                      Rs. {product.price}

                    </span>

                  )}

                </div>

                {product.stock_status === "instock" ? (

                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">

                    In Stock

                  </span>

                ) : (

                  <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">

                    Out of Stock

                  </span>

                )}

              </div>



              {product.categories?.[0]?.name && (

                <div className="mt-4">

                  <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">

                    {product.categories[0].name}

                  </span>

                </div>

              )}



              <div className="mt-8 space-y-6">

                {product.short_description && (

                  <div>

                    <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 tracking-tight">

                      Overview

                    </h3>

                    <p className="text-gray-600">

                      {stripHtml(product.short_description)}

                    </p>

                  </div>

                )}



                {product.description && (

                  <div>

                    <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 tracking-tight">

                      Description

                    </h3>

                    <p className="text-gray-600">

                      {stripHtml(product.description)}

                    </p>

                  </div>

                )}



                <div className="flex items-center space-x-4">

                  <div className="flex items-center border rounded-md overflow-hidden">

                    <button

                      onClick={() => setQuantity(Math.max(1, quantity - 1))}

                      className="px-3 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200"

                    >

                      -

                    </button>

                    <span className="px-4 py-2 w-12 text-center">

                      {quantity}

                    </span>

                    <button

                      onClick={() => setQuantity(quantity + 1)}

                      className="px-3 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200"

                    >

                      +

                    </button>

                  </div>



                  <button

                    onClick={handleAddToCart}

                    disabled={product.stock_status !== "instock"}

                    className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${

                      product.stock_status === "instock"

                        ? "bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white hover:shadow-md"

                        : "bg-gray-300 text-gray-500 cursor-not-allowed"

                    }`}

                  >

                    Add to Cart

                  </button>

                </div>

              </div>

            </div>



            <Link

              to="/products"

              className="mt-6 inline-flex items-center px-4 py-2 bg-white text-gray-700 rounded-lg shadow hover:bg-gray-50 transition"

            >

              <FiChevronLeft className="mr-2" />

              Back to Products

            </Link>

          </div>

        </div>

      </div>



      {/* Featured Products */}

      <div className="container mx-auto px-4 py-12">

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 tracking-tight">

          You May Also Like

        </h2>

        <FeaturedProducts />

      </div>



      {/* Image Modal */}

      {showModal && (

        <div

          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"

          onClick={() => setShowModal(false)}

        >

          <div className="relative max-w-4xl w-full">

            <img

              src={selectedImage}

              alt="Enlarged Product"

              className="w-full max-h-[80vh] object-contain rounded"

              onClick={(e) => e.stopPropagation()}

            />

            <button

              onClick={() => setShowModal(false)}

              className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition"

              aria-label="Close zoom"

            >

              <svg

                className="w-6 h-6 text-gray-800"

                fill="none"

                stroke="currentColor"

                viewBox="0 0 24 24"

              >

                <path

                  strokeLinecap="round"

                  strokeLinejoin="round"

                  strokeWidth="2"

                  d="M6 18L18 6M6 6l12 12"

                ></path>

              </svg>

            </button>

          </div>

        </div>

      )}

    </div>

  );

};



export default SingleProduct;
