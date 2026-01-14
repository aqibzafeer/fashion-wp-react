const OurValues = () => {
  return (
    <div className="bg-gray-50 py-16 md:py-24 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                            <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-pink-500">
          Our Values
          </span>   
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            It is very important for designers to have inspiration and principles in their work.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* High Standards */}
          <div
            className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
          >
            <div className="flex items-center mb-6">
              <div className="bg-indigo-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900">High Standards</h2>
            </div>
            <p className="text-gray-600">
              We know that good clothes should be not only stylish, but also high-quality. We do not compromise and use only the best fabrics and accessories. MELANI clothes can be worn for years and remain in good condition.
            </p>
          </div>

          {/* Saving the Planet */}
          <div
            className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
          >
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900">Saving the Planet</h2>
            </div>
            <p className="text-gray-600">
              We try to use only natural fabrics, as well as faux leather and fur. We create clothes that can be mixed and matched with each other. You can cut your wardrobe and not buy a new item every month to look beautiful.
            </p>
          </div>

          {/* Attention to Details */}
          <div
            className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
          >
            <div className="flex items-center mb-6">
              <div className="bg-amber-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900">Attention to Details</h2>
            </div>
            <p className="text-gray-600">
              Most of the look is the details. We pay attention to all the components. Buying ready-made clothes in MELANI or ordering bespoke tailoring, you get a real masterpiece, inspired by the fashion of the streets of the big city.
            </p>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="mt-16 text-center">
          <div className="inline-block h-1 w-24 bg-indigo-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default OurValues;