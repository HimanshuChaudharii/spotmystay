import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/api";
import { Wifi, Tv, Flame, Wind, Car, Shirt, Utensils, Check, Star, MapPin, Key, Clock } from "lucide-react";

const AmenityIcon = ({ name }) => {
    const iconClass = "w-6 h-6 text-slate-400";
    switch (name.toLowerCase()) {
        case "wifi": return <Wifi className={iconClass} />;
        case "tv": return <Tv className={iconClass} />;
        case "kitchen": return <Flame className={iconClass} />;
        case "ac":
        case "air conditioning": return <Wind className={iconClass} />;
        case "parking": return <Car className={iconClass} />;
        case "laundry": return <Shirt className={iconClass} />;
        case "mess": return <Utensils className={iconClass} />;
        case "geyser": return <Flame className={iconClass} />;
        default: return <Check className={iconClass} />;
    }
}

export default function HostelDetails() {
    const { id } = useParams();
    const [hostel, setHostel] = useState({});
    const [reviews, setReviews] = useState([]);
    const [comment, setComment] = useState("");
    const [userBooking, setUserBooking] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));

    // Date state — default: today → 1 month later
    const today = new Date().toISOString().split("T")[0];
    const defaultCheckout = new Date();
    defaultCheckout.setMonth(defaultCheckout.getMonth() + 1);
    const [checkIn, setCheckIn] = useState(today);
    const [checkOut, setCheckOut] = useState(defaultCheckout.toISOString().split("T")[0]);
    const [guests, setGuests] = useState(1);

    const totalMonths = Math.max(
        1,
        Math.round((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24 * 30))
    );
    const totalPrice = (hostel?.price || 0) * totalMonths;

    const fetchData = async () => {
        try {
            const res = await API.get(`/hostels/${id}`);
            setHostel(res.data);

            const rev = await API.get(`/reviews/${id}`);
            setReviews(rev.data);

            const bookingsRes = await API.get("/bookings/user");
            const myBooking = bookingsRes.data.find(b => b?.hostel?._id === id && (b.status === "pending" || b.status === "approved"));
            if (myBooking) setUserBooking(myBooking);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => { fetchData(); }, [id]);

    const book = async () => {
        try {
            await API.post(`/bookings/${id}`);
            alert("Booking requested successfully!");
            fetchData();
        } catch (error) {
            const msg = error?.response?.data?.message || error.message || "Unknown error";
            alert("Booking failed: " + msg);
            console.error(error);
        }
    };

    const submitReview = async () => {
        try {
            await API.post(`/reviews/${id}`, {
                comment,
                rating: 5
            });
            setComment("");
            fetchData();
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    // Helper for grid images
    const images = hostel?.images || [];
    const mainImage = images[0] || "https://via.placeholder.com/800x500?text=No+Image";
    const subImages = images.slice(1, 5);

    return (
        <div className="pt-24 pb-12 min-h-screen bg-[#0F172A] relative font-sans text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-up">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold mb-3 tracking-tight text-white">{hostel?.name}</h1>
                    <div className="flex flex-wrap items-center text-sm font-semibold text-slate-400 gap-x-2 gap-y-1">
                        <span className="flex items-center gap-1.5 bg-white/5 py-1 px-3 rounded-full border border-white/5 text-white">
                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                            {(reviews.length > 0 ? (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / reviews.length).toFixed(1) : "New")}
                        </span>
                        <span>·</span>
                        <a href="#reviews" className="underline hover:text-indigo-400 transition-colors">{reviews.length} reviews</a>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-purple-400" />
                            {hostel?.place}
                        </span>
                    </div>
                </div>

                {/* Image Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 rounded-2xl overflow-hidden h-[300px] md:h-[500px] mb-12 shadow-2xl ring-1 ring-white/10">
                    <div className="col-span-2 row-span-2 relative cursor-pointer group overflow-hidden bg-slate-900">
                        <img src={mainImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" alt="Main" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="col-span-1 md:grid md:grid-rows-2 gap-3 hidden">
                        <div className="relative cursor-pointer group overflow-hidden bg-slate-900">
                            <img src={subImages[0] || "https://via.placeholder.com/400"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" alt="Sub 1" />
                        </div>
                        <div className="relative cursor-pointer group overflow-hidden bg-slate-900">
                            <img src={subImages[1] || "https://via.placeholder.com/400"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" alt="Sub 2" />
                        </div>
                    </div>
                    <div className="col-span-1 md:grid md:grid-rows-2 gap-3 hidden">
                        <div className="relative cursor-pointer group overflow-hidden bg-slate-900">
                            <img src={subImages[2] || "https://via.placeholder.com/400"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" alt="Sub 3" />
                        </div>
                        <div className="relative cursor-pointer group overflow-hidden bg-slate-900">
                            <img src={subImages[3] || "https://via.placeholder.com/400"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" alt="Sub 4" />
                            {images.length > 5 && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm group-hover:bg-black/40 transition-colors">
                                    <span className="text-white font-bold text-lg">+{images.length - 5} more</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">

                    {/* Left Column: Details */}
                    <div className="col-span-2 space-y-10">
                        {/* Host Info */}
                        <div className="flex justify-between items-center border-b border-white/10 pb-8">
                            <div>
                                <h2 className="text-2xl font-bold mb-1 text-white">Hosted by <span className="text-indigo-400">{hostel?.owner?.name || "Owner"}</span></h2>
                                <p className="text-slate-400 flex items-center gap-2">
                                    <span className="bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">Superhost</span>
                                    <span>· 5 years hosting</span>
                                </p>
                            </div>
                            <div className="w-14 h-14 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-xl text-white shadow-lg border border-white/10">
                                {(hostel?.owner?.name || "O").charAt(0).toUpperCase()}
                            </div>
                        </div>

                        {/* Highlights */}
                        <div className="py-2 border-b border-white/10 pb-8 space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-indigo-400 shrink-0 shadow-sm border border-white/5">
                                    <Key className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">Self check-in</h3>
                                    <p className="text-slate-400 text-sm">Check yourself in with the lockbox.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-purple-400 shrink-0 shadow-sm border border-white/5">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">Great location</h3>
                                    <p className="text-slate-400 text-sm">100% of recent guests gave the location a 5-star rating.</p>
                                </div>
                            </div>
                        </div>

                        {/* About */}
                        <div className="py-2 border-b border-white/10 pb-8">
                            <h3 className="text-2xl font-bold mb-4 text-white">About this place</h3>
                            <div className="prose prose-invert max-w-none text-slate-400 leading-relaxed">
                                <p>{hostel?.description || "Experience the charm of this cozy hostel. Perfect for students and travelers, offering a blend of comfort and convenience. Located near the city center with easy access to public transport."}</p>
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="py-2 border-b border-white/10 pb-8">
                            <h3 className="text-2xl font-bold mb-6 text-white">What this place offers</h3>
                            <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                                {hostel?.amenities && hostel.amenities.length > 0 ? (
                                    hostel.amenities.map((amenity, idx) => (
                                        <div key={idx} className="flex items-center gap-4 text-white capitalize">
                                            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                                                <AmenityIcon name={amenity} />
                                            </div>
                                            <span className="font-medium">{amenity}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-slate-400 col-span-2">No specific amenities listed.</p>
                                )}
                            </div>
                        </div>

                        {/* Reviews */}
                        <div id="reviews" className="py-2 pt-6">
                            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2 text-white">
                                <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                                <span>{(reviews.length > 0 ? (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / reviews.length).toFixed(1) : "New")}</span>
                                <span className="text-slate-400 font-normal text-xl">· {reviews.length} reviews</span>
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                {reviews.length > 0 ? reviews.map((r, idx) => (
                                    <div key={idx} className="saas-card p-6 border-white/5 hover:border-white/10 transition-colors">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="bg-white/5 border border-white/10 h-12 w-12 rounded-full flex items-center justify-center font-bold text-white text-lg">
                                                {r.user?.name?.[0]?.toUpperCase() || "U"}
                                            </div>
                                            <div>
                                                <p className="font-bold text-white">{r.user?.name || "User"}</p>
                                                <p className="text-slate-400 text-xs">February 2026</p>
                                            </div>
                                        </div>
                                        <p className="text-slate-400 text-sm leading-relaxed">{r.comment}</p>
                                    </div>
                                )) : (
                                    <p className="text-slate-400 col-span-2 italic">No reviews yet. Be the first to review!</p>
                                )}
                            </div>

                            {/* Review Input */}
                            <div className="saas-card p-6 border-white/5 bg-white/5">
                                <h4 className="font-bold text-lg mb-4 text-white">Share your experience</h4>
                                <textarea
                                    className="saas-input w-full min-h-[120px]"
                                    placeholder="How was your stay?"
                                    value={comment}
                                    onChange={e => setComment(e.target.value)}
                                />
                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={submitReview}
                                        className="saas-btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={!comment.trim()}
                                    >
                                        Post Review
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sticky Booking Card */}
                    <div className="col-span-1">
                        <div className="sticky top-28 saas-card border-white/10 p-6 z-10">
                            <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-6">
                                <div>
                                    <span className="text-3xl font-extrabold text-white">₹{hostel?.price}</span>
                                    <span className="text-slate-400 font-medium"> / month</span>
                                </div>
                                <div className="flex flex-col items-end gap-1 text-sm text-slate-400">
                                    <span className="flex items-center gap-1.5 bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-full font-bold">
                                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                        {(reviews.length > 0 ? (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / reviews.length).toFixed(1) : "New")}
                                    </span>
                                    <a href="#reviews" className="underline hover:text-white transition-colors">{reviews.length} reviews</a>
                                </div>
                            </div>

                            <div className="border border-white/10 bg-[#0F172A] rounded-xl mb-6 overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                                <div className="flex border-b border-white/10">
                                    <div className="flex-1 p-3 border-r border-white/10">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Check-in</div>
                                        <input
                                            type="date"
                                            value={checkIn}
                                            min={today}
                                            onChange={e => {
                                                setCheckIn(e.target.value);
                                                if (e.target.value >= checkOut) {
                                                    const next = new Date(e.target.value);
                                                    next.setMonth(next.getMonth() + 1);
                                                    setCheckOut(next.toISOString().split("T")[0]);
                                                }
                                            }}
                                            className="w-full bg-transparent text-white text-sm font-medium outline-none cursor-pointer"
                                        />
                                    </div>
                                    <div className="flex-1 p-3">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Check-out</div>
                                        <input
                                            type="date"
                                            value={checkOut}
                                            min={checkIn}
                                            onChange={e => setCheckOut(e.target.value)}
                                            className="w-full bg-transparent text-white text-sm font-medium outline-none cursor-pointer"
                                        />
                                    </div>
                                </div>
                                <div className="p-3 flex items-center justify-between">
                                    <div>
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Guests</div>
                                        <div className="text-sm font-medium text-white">{guests} guest{guests > 1 ? "s" : ""}</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => setGuests(g => Math.max(1, g - 1))} className="w-7 h-7 rounded-full border border-white/20 text-white hover:bg-white/10 flex items-center justify-center text-lg leading-none transition">−</button>
                                        <span className="text-white font-bold w-4 text-center">{guests}</span>
                                        <button onClick={() => setGuests(g => Math.min(10, g + 1))} className="w-7 h-7 rounded-full border border-white/20 text-white hover:bg-white/10 flex items-center justify-center text-lg leading-none transition">+</button>
                                    </div>
                                </div>
                            </div>

                            {userBooking ? (
                                userBooking.status === "approved" ? (
                                    <div className="bg-green-500/10 p-5 rounded-xl text-center border border-green-500/20 mb-2 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]">
                                        <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mx-auto mb-3">
                                            <Check className="w-6 h-6" />
                                        </div>
                                        <p className="font-extrabold text-green-500 text-xl tracking-tight mb-1">Booked</p>
                                        <p className="text-sm font-medium text-green-500/80">Your stay is confirmed!</p>
                                    </div>
                                ) : (
                                    <div className="bg-amber-500/10 p-5 rounded-xl text-center border border-amber-500/20 mb-2 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]">
                                        <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center mx-auto mb-3">
                                            <Clock className="w-6 h-6" />
                                        </div>
                                        <p className="font-extrabold text-amber-500 text-xl tracking-tight mb-1">Pending Approval</p>
                                        <p className="text-sm font-medium text-amber-500/80">Waiting for host to confirm.</p>
                                    </div>
                                )
                            ) : (
                                <button
                                    onClick={book}
                                    className="saas-btn-primary w-full py-4 text-lg"
                                >
                                    Reserve
                                </button>
                            )}

                            {!userBooking && (
                                <>
                                    <p className="text-center text-sm font-medium text-slate-400 mt-5">You won't be charged yet</p>
                                    <div className="mt-8 space-y-4 text-slate-400 text-[15px]">
                                        <div className="flex justify-between hover:text-white transition-colors">
                                            <span className="underline decoration-white/20 underline-offset-4">₹{hostel?.price} × {totalMonths} month{totalMonths > 1 ? "s" : ""}</span>
                                            <span className="font-medium text-white">₹{totalPrice.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between hover:text-white transition-colors">
                                            <span className="underline decoration-white/20 underline-offset-4">Service fee</span>
                                            <span className="font-medium text-white">₹0</span>
                                        </div>
                                    </div>
                                    <div className="border-t border-white/10 my-6"></div>
                                    <div className="flex justify-between font-extrabold text-xl text-white">
                                        <span>Total</span>
                                        <span className="text-indigo-400">₹{totalPrice.toLocaleString()}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

