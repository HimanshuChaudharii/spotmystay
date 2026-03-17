import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, X, Frown } from "lucide-react";

export default function Profile() {
    const [bookings, setBookings] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    const fetchBookings = async () => {
        try {
            const res = await API.get("/bookings/user");
            setBookings(res.data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    useEffect(() => { fetchBookings(); }, []);

    const cancel = async (id) => {
        if (!window.confirm("Are you sure you want to cancel this booking?")) return;
        try {
            await API.put(`/bookings/cancel/${id}`);
            fetchBookings();
        } catch (error) {
            alert("Error cancelling booking");
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
    };

    if (!user) return <div className="p-10 text-center">Please login to view profile.</div>;

    return (
        <div className="pt-24 pb-12 min-h-screen bg-[#0F172A] relative font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-up">

                <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Account</h1>
                <p className="text-slate-400 text-lg mb-10">Manage your profile and bookings</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Profile Sidebar */}
                    <div className="md:col-span-1">
                        <div className="saas-card border-white/10 p-6 sticky top-28 transition-colors">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-28 h-28 bg-slate-900 border border-white/10 rounded-full flex items-center justify-center text-5xl font-extrabold text-white mb-5 shadow-lg relative">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                                <p className="text-slate-400 text-sm mb-6">{user.email}</p>

                                <div className="w-full border-t border-white/5 my-5"></div>

                                <div className="w-full text-left space-y-4">
                                    <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                                        <span className="text-slate-400 text-sm font-semibold">Role</span>
                                        <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full tracking-wider ${user.role === 'admin' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                                            user.role === 'owner' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' :
                                                'bg-green-500/10 text-green-500 border border-green-500/20'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={logout}
                                    className="mt-8 w-full bg-red-500/10 text-red-500 py-3 rounded-xl font-bold hover:bg-red-500/20 transition-colors border border-red-500/30"
                                >
                                    Log out
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content: Bookings */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-8">
                            <h2 className="text-2xl font-bold text-white">Your Request Hostels</h2>
                            <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-bold rounded-full border border-indigo-500/20">{bookings.length}</span>
                        </div>

                        {bookings.length === 0 ? (
                            <div className="saas-card border-white/10 p-10 text-center flex flex-col items-center justify-center">
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-white/50 mb-4">
                                    <Frown size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-white">No hostels booked... yet!</h3>
                                <p className="text-slate-400 mt-2 mb-8 max-w-sm mx-auto">Time to dust off your bags and start planning your next adventure.</p>
                                <button
                                    onClick={() => navigate('/')}
                                    className="saas-btn-primary px-8 py-3.5"
                                >
                                    Start searching
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {bookings.map(b => (
                                    <div key={b._id} className="saas-card border-white/10 flex flex-col sm:flex-row gap-0 overflow-hidden group transition-all">
                                        {/* Image */}
                                        <div className="w-full sm:w-64 h-56 sm:h-auto bg-[#0F172A] relative overflow-hidden shrink-0">
                                            <img
                                                src={b.hostel?.images && b.hostel.images[0] ? b.hostel.images[0] : "https://via.placeholder.com/300"}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                                                alt={b.hostel?.name}
                                            />
                                            <div className={`absolute top-4 left-4 bg-white/10 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider backdrop-blur-md border ${b.status === 'approved' ? 'text-green-500 border-green-500/30' :
                                                b.status === 'rejected' ? 'text-red-500 border-red-500/30' :
                                                    b.status === 'cancelled' ? 'text-slate-400 border-white/20' :
                                                        'text-amber-500 border-amber-500/30'
                                                }`}>
                                                {b.status}
                                            </div>
                                        </div>

                                        {/* Details */}
                                        <div className="p-6 flex-1 flex flex-col justify-between relative">
                                            <div>
                                                <div className="flex justify-between items-start gap-4">
                                                    <h3 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-2">{b.hostel?.name}</h3>
                                                    {b.status !== "cancelled" && b.status !== "rejected" && (
                                                        <button
                                                            onClick={() => cancel(b._id)}
                                                            className="text-slate-400 hover:text-red-500 bg-white/5 hover:bg-red-500/10 p-2 rounded-full transition-colors border border-transparent hover:border-red-500/20 shrink-0"
                                                            title="Cancel Booking"
                                                        >
                                                            <X size={20} />
                                                        </button>
                                                    )}
                                                </div>
                                                <p className="text-slate-400 text-sm mt-3 flex items-center gap-1.5">
                                                    <MapPin size={16} className="text-white/40" />
                                                    {b.hostel?.place}
                                                </p>
                                            </div>

                                            <div className="mt-6 pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                                                <div className="text-sm font-medium text-slate-400">
                                                    <div className="flex items-center gap-2 bg-white/5 py-1.5 px-3 rounded-lg border border-white/5 inline-flex">
                                                        <Calendar size={16} className="text-white/50" />
                                                        <span>Feb 20 - Mar 20, 2026</span>
                                                    </div>
                                                </div>
                                                <div className="text-right flex items-end justify-between sm:block">
                                                    <span className="text-slate-400 text-sm sm:hidden">Total price</span>
                                                    <p className="text-2xl font-extrabold text-indigo-400">₹{b.hostel?.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
