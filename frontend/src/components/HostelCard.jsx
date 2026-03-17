import { Link } from "react-router-dom";
import { Heart, MapPin, Star } from "lucide-react";

export default function HostelCard({ hostel, isBooked }) {
    return (
        <div className="saas-card group flex flex-col gap-3 w-full overflow-hidden relative border border-white/5">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                <img
                    src={hostel.images && hostel.images.length > 0 ? hostel.images[0] : "https://via.placeholder.com/300"}
                    alt={hostel.name}
                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />

                {isBooked && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                        Booked
                    </div>
                )}

                <div className="absolute top-3 left-3 bg-slate-900/60 backdrop-blur-sm p-2 rounded-full border border-white/10 transition-transform duration-300 hover:scale-110 cursor-pointer text-white hover:text-red-500 z-20">
                    <Heart size={16} />
                </div>

                <div className="absolute bottom-3 right-3 bg-slate-900/60 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1 shadow-md">
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-white">4.8</span>
                </div>
            </div>

            <div className="p-4 flex flex-col gap-1 z-10">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg text-white leading-tight group-hover:text-indigo-400 transition-colors duration-200 truncate">{hostel.name}</h3>
                </div>

                <p className="text-sm text-slate-400 leading-tight flex items-center gap-1.5 mt-1 truncate">
                    <MapPin size={14} className="text-purple-400 shrink-0" />
                    <span className="truncate">{hostel.place}</span>
                </p>

                <div className="mt-4 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Total Price</span>
                        <div className="flex items-baseline gap-1">
                            <span className="font-extrabold text-xl text-indigo-400">₹{hostel.price}</span>
                            <span className="text-sm text-slate-500">/mo</span>
                        </div>
                    </div>
                    <Link
                        to={`/hostel/${hostel._id}`}
                        className="saas-btn-primary py-2 px-5 text-sm z-20"
                    >
                        View
                    </Link>
                </div>
            </div>

            <Link
                to={`/hostel/${hostel._id}`}
                className="absolute inset-0 z-0"
                aria-label={`View details for ${hostel.name}`}
            />
        </div>
    );
}
