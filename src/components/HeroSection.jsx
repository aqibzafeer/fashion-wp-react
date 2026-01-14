import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiPlayCircle } from "react-icons/fi";
import PageHero from "./PageHero";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <PageHero
      title="Style That Defines You"
      subtitle="Discover our new collection of curated pieces designed to elevate your everyday look. From timeless classics to the latest trends, find something that truly speaks to you."
      eyebrow="WINTER EDIT 25"
      image="/banner-img.jpeg"
      height="lg"
      align="left"
    >
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4">
        <button
          onClick={() => navigate("/products")}
          className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold rounded-full shadow-lg hover:bg-gray-700 transition-all transform hover:-translate-y-1"
        >
          Explore Collection
          <FiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>

      </div>
    </PageHero>
  );
};

export default HeroSection;