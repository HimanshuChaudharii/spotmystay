import { useState, useEffect } from "react";
import API from "../api/api";
import HostelCard from "../components/HostelCard";
import { Search, CheckCircle, HomeIcon, Frown } from "lucide-react";

export default function Home() {
    const [place, setPlace] = useState("");
    const [hostels, setHostels] = useState([]);
    const [userBookings, setUserBookings] = useState([]);

    const fetchHostels = async () => {
        try {
            const res = await API.get(`/hostels?place=${place}`);
            setHostels(res.data);
        } catch (error) {
            console.error("Failed to fetch hostels", error);
        }
    };

    const fetchUserBookings = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user) {
                const res = await API.get("/bookings/user");
                setUserBookings(res.data);
            }
        } catch (error) {
            console.error("Failed to fetch user bookings", error);
        }
    };

    useEffect(() => {
        fetchHostels();
        fetchUserBookings();
    }, []);

    const isBooked = (hostelId) => {
        return userBookings.some(b => b?.hostel?._id === hostelId && b.status === 'approved');
    };

    return (
        <div className="bg-[#0F172A]">

            {/* Hero Section */}
            <div className="relative pt-12 pb-20 flex items-center justify-center text-center px-4">
                <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">

                    <h1 className="animate-fade-up text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
                        Discover Your Next <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Great Stay</span>
                    </h1>

                    <p className="animate-fade-up text-lg text-slate-300 mb-10 max-w-2xl leading-relaxed">
                        Premium student living and backpacker hostels verified for quality, safety, and community.
                    </p>

                    {/* Integrated Search Bar Pill */}
                    <div className="animate-fade-up saas-glass p-2 rounded-2xl md:rounded-full w-full max-w-2xl flex flex-col md:flex-row items-center gap-2 shadow-xl border border-white/10">
                        <div className="flex-1 px-4 lg:px-6 w-full md:w-auto h-12 flex items-center">
                            <Search size={20} className="text-slate-400 mr-3" />
                            <input
                                placeholder="Search by city, university, or area..."
                                className="w-full bg-transparent text-white text-lg outline-none placeholder-slate-400 font-medium"
                                onChange={(e) => setPlace(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && fetchHostels()}
                            />
                        </div>
                        <button
                            onClick={fetchHostels}
                            className="saas-btn-primary w-full md:w-auto h-12 px-8 rounded-xl md:rounded-full font-bold text-lg flex items-center justify-center"
                        >
                            Search
                        </button>
                    </div>

                    {/* Trust Signals */}
                    <div className="animate-fade-up mt-10 flex flex-wrap justify-center gap-6 text-slate-300 text-sm font-medium">
                        <div className="flex items-center gap-2">
                            <CheckCircle size={18} className="text-green-500" />
                            Verified Listings
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle size={18} className="text-green-500" />
                            Zero Booking Fees
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle size={18} className="text-green-500" />
                            Secure Payments
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-up">
                    {[
                        { label: "Women-Only", icon: "👩" },
                        { label: "Digital Nomad", icon: "💻" },
                        { label: "Social", icon: "🍻" },
                        { label: "Quiet Pods", icon: "🛌" },
                    ].map((filter, idx) => (
                        <div key={idx} className="saas-card p-6 flex flex-col items-center justify-center text-center hover:-translate-y-2 transition-transform cursor-pointer">
                            <div className="text-4xl mb-3">{filter.icon}</div>
                            <span className="font-semibold text-white">{filter.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Content Section */}
            <div id="hostels-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
                <div className="text-left mb-10 flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-white tracking-tight">Top Rated Stays</h2>
                    <HomeIcon size={24} className="text-slate-400 hidden sm:block" />
                </div>

                {hostels.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {hostels.map((h, index) => (
                            <div key={h._id} className="animate-fade-up" style={{ animationDelay: `${index * 50}ms` }}>
                                <HostelCard hostel={h} isBooked={isBooked(h._id)} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 saas-card max-w-2xl mx-auto border-dashed border-white/10">
                        <div className="flex justify-center mb-4">
                            <Frown size={48} className="text-slate-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">No places found</h3>
                        <p className="text-slate-400 mb-6">Try searching for a different location or check spelling.</p>
                        <button
                            onClick={() => { setPlace(''); fetchHostels(); }}
                            className="saas-btn-primary px-8 py-3"
                        >
                            View All Hostels
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
