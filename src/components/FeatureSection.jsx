const features = [
  {
    icon: "/box.svg",
    title: "Free Shipping",
    description: "Free shipping on order over €50",
  },
  {
    icon: "/moneyback.svg",
    title: "Money Back",
    description: "30 days money back guarantee",
  },
  {
    icon: "/secure.svg",
    title: "Secure Payment",
    description: "100% Payment Secure",
  },
  {
    icon: "/support.svg",
    title: "Support 24/7",
    description: "24/7 Online support",
  },
];

const FeatureSection = () => (
  <section className="p-4 sm:p-6 bg-gray-50">
    <div className="max-w-7xl mx-auto grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
      {features.map(({ icon, title, description }) => (
        <div key={title}>
          <div className="flex justify-center mb-1 sm:mb-2">
            <img src={icon} alt={title} className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <h3 className="font-bold text-base sm:text-lg">{title}</h3>
          <p className="text-xs sm:text-sm">{description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default FeatureSection;
