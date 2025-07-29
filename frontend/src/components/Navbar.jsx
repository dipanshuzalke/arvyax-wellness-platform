import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // ✅ for hamburger/close icons

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [isOpen, setIsOpen] = useState(false); // ✅ mobile menu toggle

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md p-4">
      {/* ✅ NAVBAR CONTAINER */}
      <div className="flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600">Arvyax Wellness</h1>

        {/* ✅ Hamburger Menu Button (Mobile only) */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* ✅ Desktop Menu */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Dashboard
          </Link>
          {token && (
            <Link to="/my-sessions" className="text-gray-700 hover:text-blue-600">
              My Drafts
            </Link>
          )}
          {token && (
            <Link to="/editor" className="text-gray-700 hover:text-blue-600">
              Create Session
            </Link>
          )}
          {!token ? (
            <>
              <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg">
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* ✅ Mobile Menu (only visible when isOpen = true) */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-2">
          <Link to="/" className="text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
            Dashboard
          </Link>
          {token && (
            <Link to="/my-sessions" className="text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
              My Sessions
            </Link>
          )}
          {token && (
            <Link to="/editor" className="text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
              Editor
            </Link>
          )}
          {!token ? (
            <>
              <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={() => setIsOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg" onClick={() => setIsOpen(false)}>
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
