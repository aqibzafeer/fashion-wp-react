import { Outlet, Link } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 bg-white shadow border-b black">
        <Link to="/dashboard">
          <h1 className="text-3xl font-bold text-gray-800 m-2">AG</h1>
        </Link>

        <Link to="/">
          <button className="cursor-pointer px-5 bg-gradient-to-r from-gray-800 to-indigo-600 text-white py-2 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition">
            Logout
          </button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row min-h-screen bg-gray-300">
        <aside className="w-full md:w-64 bg-gray-900 shadow-md text-amber-50">
          <div className="p-6 font-bold text-xl"></div>
          <nav className="text-center mt-4 flex md:block">
            <Link to="/dashboard/manageproducts" className="flex-1">
              <button className="w-full mb-2 px-4 py-2 flex justify-center items-center text-center">
                Products
              </button>
            </Link>
            <Link to="/dashboard/orders">
              <button className="w-full mb-2 px-4 py-2 flex justify-center items-center text-center">
                Orders
              </button>
            </Link>
            <Link to="/dashboard/productsettings">
              <button className="w-full mb-2 px-4 py-2 flex justify-center items-center text-center">
                Settings
              </button>
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
