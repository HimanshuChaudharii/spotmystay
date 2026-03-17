import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { LogIn, User, ChevronDown, Menu, LogOut, Shield, Briefcase, X } from "lucide-react";

const navLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
];

export default function Navbar() {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const location = useLocation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setIsDropdownOpen(false);
        navigate("/login");
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed top-0 w-full z-50 saas-glass font-sans transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-1 shrink-0">
                        <span className="text-2xl font-extrabold text-white tracking-tight">
                            SpotMy<span className="text-purple-500">Stay</span>
                        </span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${isActive(link.to)
                                        ? "text-white bg-white/10"
                                        : "text-slate-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right: User Menu / Login */}
                    <div className="flex items-center gap-3">
                        {!user ? (
                            <Link
                                to="/login"
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:scale-[1.03]"
                            >
                                <LogIn size={16} />
                                Login
                            </Link>
                        ) : (
                            <div className="relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center gap-2 text-white hover:text-indigo-400 focus:outline-none transition-colors duration-200"
                                >
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center border border-white/10 text-white font-bold shadow-md">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="font-medium hidden md:block">{user.name}</span>
                                    <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 top-full mt-3 w-56 saas-card py-2 z-50 animate-fade-up overflow-hidden">
                                        <Link to="/profile" className="flex items-center gap-3 px-4 py-2 hover:bg-white/5 w-full text-slate-200 transition-colors" onClick={() => setIsDropdownOpen(false)}>
                                            <User size={16} className="text-indigo-400" /> My Profile
                                        </Link>
                                        {user.role === "owner" && (
                                            <Link to="/owner" className="flex items-center gap-3 px-4 py-2 hover:bg-white/5 w-full text-slate-200 transition-colors" onClick={() => setIsDropdownOpen(false)}>
                                                <Briefcase size={16} className="text-indigo-400" /> Owner Dashboard
                                            </Link>
                                        )}
                                        {user.role === "admin" && (
                                            <Link to="/admin" className="flex items-center gap-3 px-4 py-2 hover:bg-white/5 w-full text-slate-200 transition-colors" onClick={() => setIsDropdownOpen(false)}>
                                                <Shield size={16} className="text-indigo-400" /> Admin Dashboard
                                            </Link>
                                        )}
                                        <div className="border-t border-white/10 my-1"></div>
                                        <button onClick={logout} className="flex items-center gap-3 px-4 py-2 hover:bg-white/5 w-full text-red-500 font-medium transition-colors">
                                            <LogOut size={16} /> Log out
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Mobile menu toggle */}
                        <button
                            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Nav */}
                {mobileOpen && (
                    <div className="md:hidden pb-4 pt-2 border-t border-white/10 space-y-1 animate-fade-up">
                        {navLinks.map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setMobileOpen(false)}
                                className={`block px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${isActive(link.to) ? "text-white bg-white/10" : "text-slate-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
}
