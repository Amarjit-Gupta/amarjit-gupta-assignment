import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <NavLink
          to="/"
          className="text-2xl font-bold text-red-500"
        >
          UserApp
        </NavLink>

        <div className="flex items-center gap-3 sm:gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium transition sm:text-base ${
                isActive
                  ? "text-red-500"
                  : "text-gray-600 hover:text-red-600"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/addUser"
            className="rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white transition sm:px-4 sm:text-base"
          >
            Add User
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;