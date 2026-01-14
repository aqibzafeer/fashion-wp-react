function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 text-sm text-gray-600">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Left: Logo + Description */}
        <div className="col-span-2 space-y-4">
          {/* <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="Logo" className="h-10 w-25" />
          </div> */}
<h1 className="text-gray-800 font-bold text-lg">AG</h1>
<p className="text-gray-600 text-justify mt-2">
  AG is your trusted destination for premium fashion.
  Our online clothing store is built to deliver a seamless shopping experience, fast load times. 
  Stay ahead of the competition with an eCommerce platform designed for growth, customer satisfaction, and long-term success.
</p>


          {/* Language selector */}
          <div>
            <label htmlFor="language-selector" className="block text-sm font-medium text-gray-700 mb-1">
              Select Language
            </label>
            <select 
              id="language-selector"
              className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Language selector"
            >
              <option value="en">English 🇺🇸</option>
              <option value="fr">Français 🇫🇷</option>
              <option value="de">Deutsch 🇩🇪</option>
            </select>
          </div>
        </div>

        {/* Links Columns */}
        <div>
          <h2 className="font-semibold text-gray-800 mb-2">Information</h2>
          <ul className="space-y-1">
            <li>About</li>
            <li>Careers</li>
            <li>Press</li>
            <li>FAQ's</li>
          </ul>
        </div>
        {/* <div>
          <h2 className="font-semibold text-gray-800 mb-2">Products</h2>
          <ul className="space-y-1">
            <li>New Arrivals</li>
            <li>On sale</li>
            <li>Top rated</li>
            <li>Gift Cards</li>
          </ul>
        </div> */}
        <div>
          <h2 className="font-semibold text-gray-800 mb-2">Customer Service</h2>
          <ul className="space-y-1">
            <li>Contact Us</li>
            <li>Shipping & Returns</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-gray-800 mb-2">My Account</h2>
          <ul className="space-y-1">
            <li>My Account</li>
            <li>Order History</li>
            <li>Wishlist</li>
            <li>Newsletter</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-4 text-center text-gray-500">
        Copyright 2025 - by <a href="https://aqibzafeer.vercel.app/"> Aqib Zafeer</a>
      </div>
    </footer>
  );
}

export default Footer;
