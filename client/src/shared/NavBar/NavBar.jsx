import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo/logo.png";
import { navItems } from "../../utilits/navItems";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { HiMenu, HiX, HiUser, HiLogout } from "react-icons/hi";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  

  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <div className="overflow-hidden px-5 md:w-[90%] mx-auto flex items-center justify-between p-4 md:p-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img className="w-16 lg:w-32  rounded-md" src={Logo} alt="Logo" />
          
        </Link>

        {/* Desktop Menu → xl and above */}
        <nav className="hidden lg:flex items-center gap-6 text-gray-600">
          {navItems?.map((item) => (
            <Link
              key={item?.label}
              to={item?.href}
              className="hover:text-orange-500 transition-colors flex items-center gap-1"
            >
              {item?.label}
            </Link>
          ))}

          {!user ? (
            <Link
              to="/login"
              className="flex items-center gap-1 hover:text-orange-500 transition-colors"
            >
              <HiUser className="w-5 h-5" />
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 hover:text-orange-500 transition-colors"
            >
              <HiLogout className="w-5 h-5" />
              Logout
            </button>
          )}
        </nav>

        {/* Hamburger Button → xl and below */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <HiX className="w-6 h-6 text-gray-700" />
            ) : (
              <HiMenu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile, Tablet, Laptop Menu → xl and below */}
      {isOpen && (
        <nav className="lg:hidden bg-white shadow-md">
          <ul className="flex flex-col gap-4 p-4 text-gray-600">
            {navItems?.map((item) => (
              <li key={item?.label}>
                <Link
                  to={item?.href}
                  className="block hover:text-orange-500 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item?.label}
                </Link>
              </li>
            ))}
            {!user ? (
              <>
                <li>
                  <Link
                    to="/login"
                    className="flex items-center gap-1 hover:text-orange-500 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <HiUser className="w-5 h-5" /> Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signUp"
                    className="flex items-center gap-1 hover:text-orange-500 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <HiUser className="w-5 h-5" /> Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-1 hover:text-orange-500 transition-colors w-full text-left"
                >
                  <HiLogout className="w-5 h-5" /> Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
