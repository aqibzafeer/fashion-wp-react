import React, { useEffect } from "react";

const WordPressAdmin = () => {
  useEffect(() => {
    // Redirect to WordPress admin
    window.location.href = "https://ambalafoods.crea8ive.solutions/wp-admin/";
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 tracking-tight">
          Redirecting to WordPress Admin...
        </h1>
        <p className="text-gray-600">
          If you are not redirected, click{" "}
          <a
            href="https://ambalafoods.crea8ive.solutions/wp-admin/"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            here
          </a>
        </p>
      </div>
    </div>
  );
};

export default WordPressAdmin;
