import { useNavigate } from "react-router-dom";

const categoryData = [
  { name: "Jeans",            image: "/products/jeans.jpg" },
  { name: "Shirt",            image: "/products/shirt.jpg" },
  { name: "Suit",             image: "/products/suit.jpg"  },
  { name: "T Shirt",          image: "/products/tshirt.jpg"},
  { name: "Kamiz Shalwar",    image: "/products/kamiz.jpg" },
  { name: "Jacket",           image: "/products/jacket.jpg" },
  { name: "Pant",             image: "/products/pant.jpg" },
  { name: "Shoes",            image: "/products/shoes.jpg" },
];

const FeaturedProducts = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (name) => {
    navigate(`/products?category=${encodeURIComponent(name)}`);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex justify-center items-center mb-3">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Featured Products
          </h2>

        </div>
        <p className="text-sm text-gray-600 max-w-2xl mx-auto">
          Discover our carefully curated collections Jeans, Shirt, Suit, T Shirt, Kamiz Shalwar, Jacket, Pant, Shoes
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categoryData.map((cat) => (
          <div
            key={cat.name}
            className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-40 cursor-pointer"
            onClick={() => handleCategoryClick(cat.name)}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:blur-sm"
              style={{ backgroundImage: `url(${cat.image})` }}
            ></div>

            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-black/30 z-10"></div>

            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center transform transition-all duration-500 group-hover:scale-105">
                <h3 className="text-lg font-bold text-white drop-shadow-lg">
                  {cat.name}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
