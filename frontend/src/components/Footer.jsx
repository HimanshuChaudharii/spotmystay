import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#0F172A] text-slate-400 py-16 border-t border-white/5 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Top Section: Links Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12 border-b border-white/10 pb-12">

                    {/* Brand Column */}
                    <div className="col-span-2 lg:col-span-1">
                        <Link to="/" className="flex items-center gap-1 mb-4">
                            <span className="text-2xl font-extrabold text-white tracking-tight">SpotMy<span className="text-purple-500">Stay</span></span>
                        </Link>
                        <p className="text-sm mb-6 leading-relaxed">
                            A simple, clean platform for discovering and booking verified hostels and PGs.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Icons */}
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 hover:text-indigo-400 transition-colors flex items-center justify-center">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 hover:text-indigo-400 transition-colors flex items-center justify-center">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 hover:text-indigo-400 transition-colors flex items-center justify-center">
                                <Instagram size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Company</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Support</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Safety Info</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Cancellation</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Report Issue</a></li>
                        </ul>
                    </div>

                    {/* Column 4 */}
                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Legal</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center text-sm">
                    <p>&copy; {new Date().getFullYear()} SpotMyStay. All rights reserved.</p>
                    <div className="mt-4 md:mt-0 space-x-6">
                        <a href="#" className="hover:text-white transition-colors">English (US)</a>
                        <a href="#" className="hover:text-white transition-colors">INR</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
