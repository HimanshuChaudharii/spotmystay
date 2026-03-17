import { useState, useEffect } from "react";
import API from "../api/api";
import { Check, X, Pencil, Trash2, MapPin } from "lucide-react";

export default function OwnerDashboard() {
    const [data, setData] = useState({
        name: "",
        place: "",
        price: "",
        amenities: [],
        images: []
    });
    const [imageInput, setImageInput] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [hostels, setHostels] = useState([]);
    const [bookings, setBookings] = useState([]);

    const amenitiesList = ["Wifi", "Parking", "Laundry", "Mess", "AC", "TV", "Kitchen", "Geyser"];

    const user = JSON.parse(localStorage.getItem("user"));

    const fetchHostels = async () => {
        try {
            const res = await API.get("/hostels/my");
            setHostels(res.data);
        } catch (error) {
            console.error("Error fetching hostels:", error);
        }
    };

    const fetchBookings = async () => {
        try {
            const res = await API.get("/bookings/owner");
            setBookings(res.data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    }

    useEffect(() => {
        if (user) {
            fetchHostels();
            fetchBookings();
        }
    }, [user]);

    const handleAmenityChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setData({ ...data, amenities: [...data.amenities, value] });
        } else {
            setData({ ...data, amenities: data.amenities.filter(a => a !== value) });
        }
    };

    const addImage = () => {
        if (imageInput.trim()) {
            setData({ ...data, images: [...data.images, imageInput.trim()] });
            setImageInput("");
        }
    };

    const removeImage = (index) => {
        const newImages = data.images.filter((_, i) => i !== index);
        setData({ ...data, images: newImages });
    };

    const startEdit = (hostel) => {
        setEditingId(hostel._id);
        setData({
            name: hostel.name,
            place: hostel.place,
            price: hostel.price,
            amenities: hostel.amenities || [],
            images: hostel.images || []
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setData({ name: "", place: "", price: "", amenities: [], images: [] });
        setImageInput("");
    };

    const submit = async () => {
        try {
            const finalImages = imageInput.trim() ? [...data.images, imageInput.trim()] : data.images;
            const payload = { ...data, images: finalImages };

            if (editingId) {
                await API.put(`/hostels/${editingId}`, payload);
            } else {
                await API.post("/hostels/add", payload);
            }

            cancelEdit();
            fetchHostels();
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || error.message || "Failed to save hostel");
        }
    };

    const deleteHostel = async (id) => {
        if (!window.confirm("Are you sure you want to delete this hostel?")) return;
        try {
            await API.delete(`/hostels/${id}`);
            fetchHostels();
        } catch (error) {
            console.error("Error deleting hostel:", error);
            alert("Failed to delete hostel.");
        }
    };

    const approveBooking = async (id) => {
        try {
            await API.put(`/bookings/approve/${id}`);
            fetchBookings();
        } catch (error) {
            console.error("Error approving booking:", error);
        }
    };

    const rejectBooking = async (id) => {
        if (!window.confirm("Reject this booking request?")) return;
        try {
            await API.put(`/bookings/reject/${id}`);
            fetchBookings();
        } catch (error) {
            console.error("Error rejecting booking:", error);
        }
    }

    return (
        <div className="pt-24 pb-12 min-h-screen bg-[#0F172A] relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-up">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b pb-6 border-white/10">
                    <div>
                        <h1 className="text-4xl font-extrabold text-white tracking-tight">Owner Workspace</h1>
                        <p className="text-slate-400 text-lg mt-2">Manage your listings and booking requests efficiently.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Left Column: Form (Adding/Editing) */}
                    <div className="lg:col-span-1">
                        <div className="saas-card p-6 border-white/10 sticky top-28 group transition-colors">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-white relative">
                                    {editingId ? "Edit Property" : "Add New Property"}
                                    <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-indigo-500 rounded-t-full"></span>
                                </h2>
                                {editingId && (
                                    <button onClick={cancelEdit} className="text-sm font-medium text-red-500 hover:text-white transition-colors underline">
                                        Cancel Edit
                                    </button>
                                )}
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-400 mb-1.5">Hostel Name</label>
                                    <input
                                        placeholder="e.g. Sunrise Backpackers"
                                        className="w-full saas-input py-2.5 px-4"
                                        value={data.name}
                                        onChange={(e) => setData({ ...data, name: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-400 mb-1.5">Location</label>
                                    <input
                                        placeholder="e.g. Manali, Himachal Pradesh"
                                        className="w-full saas-input py-2.5 px-4"
                                        value={data.place}
                                        onChange={(e) => setData({ ...data, place: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-400 mb-1.5">Price (per night/month)</label>
                                    <input
                                        placeholder="e.g. 1200"
                                        className="w-full saas-input py-2.5 px-4"
                                        type="number"
                                        value={data.price}
                                        onChange={(e) => setData({ ...data, price: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-400 mb-1.5">Images</label>
                                    <div className="flex gap-2 mb-2">
                                        <input
                                            placeholder="Image URL"
                                            className="flex-1 saas-input py-2.5 px-4"
                                            value={imageInput}
                                            onChange={(e) => setImageInput(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && addImage()}
                                        />
                                        <button onClick={addImage} className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-4 rounded-xl transition">
                                            +
                                        </button>
                                    </div>
                                    {data.images.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {data.images.map((img, idx) => (
                                                <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden group border border-white/10 shadow-inner">
                                                    <img src={img} alt="preview" className="w-full h-full object-cover" />
                                                    <button
                                                        onClick={() => removeImage(idx)}
                                                        className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition backdrop-blur-sm"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-400 mb-3">Amenities</label>
                                    <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                                        {amenitiesList.map((amenity) => (
                                            <label key={amenity} className="flex items-center space-x-3 cursor-pointer group">
                                                <div className="relative flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        value={amenity}
                                                        checked={data.amenities.includes(amenity)}
                                                        onChange={handleAmenityChange}
                                                        className="peer h-5 w-5 bg-slate-900 cursor-pointer appearance-none rounded border border-white/10 checked:bg-indigo-500 checked:border-indigo-500 transition-all"
                                                    />
                                                    <Check size={14} className="absolute pointer-events-none hidden peer-checked:block text-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                                                </div>
                                                <span className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors">{amenity}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={submit}
                                className="w-full mt-8 saas-btn-primary py-3.5 text-base tracking-wide"
                            >
                                {editingId ? "Update Property" : "List New Property"}
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Listings and Bookings */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Bookings Section */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <h2 className="text-2xl font-bold text-white">Booking Requests</h2>
                                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-xs font-bold rounded-full">{bookings.filter(b => b.status === 'pending').length} New</span>
                            </div>

                            {bookings.length === 0 ? (
                                <div className="p-10 rounded-2xl border border-dashed border-white/10 text-center text-slate-400">
                                    No booking requests yet.
                                </div>
                            ) : (
                                <div className="saas-card border-white/5 overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead className="bg-white/5 border-b border-white/5">
                                                <tr>
                                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Property</th>
                                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Guest</th>
                                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                {bookings.map((b) => (
                                                    <tr key={b._id} className="hover:bg-white/5 transition-colors duration-200">
                                                        <td className="px-6 py-5 text-sm font-semibold text-white">{b.hostel?.name || "Unknown Property"}</td>
                                                        <td className="px-6 py-5 text-sm text-slate-400">{b.user?.name || "Unknown User"}</td>
                                                        <td className="px-6 py-5">
                                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full border ${b.status === 'approved' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                                b.status === 'rejected' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                                    b.status === 'cancelled' ? 'bg-white/10 text-slate-400 border-white/10' :
                                                                        'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                                                }`}>
                                                                {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-5 text-right space-x-2">
                                                            {b.status === 'pending' && (
                                                                <div className="flex justify-end gap-2">
                                                                    <button
                                                                        onClick={() => approveBooking(b._id)}
                                                                        className="flex items-center gap-1 text-green-500 hover:text-white font-semibold text-sm bg-green-500/10 hover:bg-green-500 px-3 py-1.5 rounded-lg transition-colors border border-green-500/20 hover:border-transparent"
                                                                    >
                                                                        <Check size={16} /> Approve
                                                                    </button>
                                                                    <button
                                                                        onClick={() => rejectBooking(b._id)}
                                                                        className="flex items-center gap-1 text-red-500 hover:text-white font-semibold text-sm bg-red-500/10 hover:bg-red-500 px-3 py-1.5 rounded-lg transition-colors border border-red-500/20 hover:border-transparent"
                                                                    >
                                                                        <X size={16} /> Reject
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Hostels List Section */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-6">My Properties</h2>
                            {hostels.length === 0 ? (
                                <div className="text-center py-10 rounded-2xl border border-dashed border-white/10">
                                    <p className="text-slate-400">You haven't listed any properties yet.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {hostels.map(h => (
                                        <div key={h._id} className="saas-card border-white/5 flex flex-col overflow-hidden group">
                                            <div className="relative h-48 bg-[#0F172A] overflow-hidden">
                                                <img
                                                    src={h.images && h.images[0] ? h.images[0] : "https://via.placeholder.com/300"}
                                                    alt={h.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100"
                                                />
                                                <div className="absolute top-3 right-3 flex gap-2">
                                                    <button
                                                        onClick={() => startEdit(h)}
                                                        className="bg-white/20 backdrop-blur-md p-2 rounded-full shadow-lg hover:bg-white text-white hover:text-indigo-500 transition-colors border border-white/20 hover:border-transparent"
                                                        title="Edit"
                                                    >
                                                        <Pencil size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteHostel(h._id)}
                                                        className="bg-white/20 backdrop-blur-md p-2 rounded-full shadow-lg hover:bg-red-500 text-white transition-colors border border-white/20 hover:border-transparent"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="p-5 flex-1 flex flex-col">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-bold text-lg text-white line-clamp-1 group-hover:text-indigo-400 transition-colors">{h.name}</h3>
                                                    <span className="font-bold text-indigo-400 border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-1 rounded-lg text-sm">₹{h.price}</span>
                                                </div>
                                                <div className="flex justify-between items-center mb-5">
                                                    <p className="text-slate-400 text-sm line-clamp-1 flex items-center gap-1">
                                                        <MapPin size={14} />
                                                        {h.place}
                                                    </p>
                                                    <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-full tracking-wider border ${h.status === 'approved' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                        h.status === 'rejected' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                            'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                                        }`}>
                                                        {h.status || 'pending'}
                                                    </span>
                                                </div>

                                                <div className="mt-auto pt-4 border-t border-white/5 flex flex-wrap gap-2">
                                                    {h.amenities && h.amenities.slice(0, 3).map(a => (
                                                        <span key={a} className="text-[10px] uppercase tracking-wide bg-white/5 border border-white/5 text-slate-400 px-2.5 py-1 rounded-full font-semibold">{a}</span>
                                                    ))}
                                                    {h.amenities && h.amenities.length > 3 && (
                                                        <span className="text-[10px] text-slate-400/70 px-1 self-center font-medium">+{h.amenities.length - 3} more</span>
                                                    )}
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
        </div>
    );
}
