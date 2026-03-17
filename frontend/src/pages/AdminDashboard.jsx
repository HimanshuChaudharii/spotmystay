import { useEffect, useState } from "react";
import API from "../api/api";

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [pendingHostels, setPendingHostels] = useState([]);
    const [activeTab, setActiveTab] = useState("hostels"); // 'hostels' or 'users'

    const fetchUsers = async () => {
        try {
            const res = await API.get("/admin/users");
            setUsers(res.data);
        } catch (error) {
            console.error("Failed to fetch users");
        }
    };

    const fetchPendingHostels = async () => {
        try {
            const res = await API.get("/admin/hostels/pending");
            setPendingHostels(res.data);
        } catch (error) {
            console.error("Failed to fetch pending hostels");
        }
    };

    const deleteUser = async (id) => {
        if (!window.confirm("Are you sure you want to remove this user?")) return;
        try {
            await API.delete(`/admin/users/${id}`);
            fetchUsers();
        } catch (error) {
            alert("Failed to delete user");
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await API.put(`/admin/hostels/${id}/status`, { status });
            fetchPendingHostels();
        } catch (error) {
            alert("Failed to update status");
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchPendingHostels();
    }, []);

    return (
        <div className="min-h-screen bg-[var(--color-bg-main)] pt-28 pb-12 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-accent-primary)]/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-accent-secondary)]/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-fade-up">

                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-extrabold text-[var(--color-text-primary)] tracking-tight mb-2">Admin Workspace</h1>
                    <p className="text-[var(--color-text-muted)] text-lg">Oversee platform activity, manage users, and approve listings.</p>
                </div>

                {/* Tabs */}
                <div className="flex space-x-6 mb-8 border-b border-[rgba(255,255,255,0.05)]">
                    <button
                        className={`pb-4 px-2 font-semibold text-base transition-colors relative ${activeTab === 'hostels' ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-muted)] hover:text-white'}`}
                        onClick={() => setActiveTab('hostels')}
                    >
                        Pending Approvals
                        {activeTab === 'hostels' && (
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] rounded-t-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
                        )}
                        {pendingHostels.length > 0 && (
                            <span className="ml-3 bg-[var(--color-accent-primary)]/20 text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)]/30 text-xs font-bold px-2.5 py-0.5 rounded-full">{pendingHostels.length}</span>
                        )}
                    </button>
                    <button
                        className={`pb-4 px-2 font-semibold text-base transition-colors relative ${activeTab === 'users' ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-muted)] hover:text-white'}`}
                        onClick={() => setActiveTab('users')}
                    >
                        User Management
                        {activeTab === 'users' && (
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] rounded-t-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
                        )}
                    </button>
                </div>

                {/* Content Area */}
                <div className="saas-card border-[rgba(255,255,255,0.05)] overflow-hidden">

                    {/* Pending Hostels Tab */}
                    {activeTab === 'hostels' && (
                        <div className="animate-fade-up">
                            <div className="px-6 py-5 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] flex justify-between items-center">
                                <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Pending Hostel Listings</h2>
                            </div>

                            {pendingHostels.length === 0 ? (
                                <div className="p-16 text-center">
                                    <div className="inline-flex p-5 rounded-full bg-[var(--color-success)]/10 text-[var(--color-success)] mb-6 border border-[var(--color-success)]/20">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">All caught up!</h3>
                                    <p className="text-[var(--color-text-muted)] text-lg">There are no pending hostel approvals at the moment.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-[rgba(255,255,255,0.02)] border-b border-[rgba(255,255,255,0.05)]">
                                            <tr>
                                                <th className="px-6 py-4 text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Property Name</th>
                                                <th className="px-6 py-4 text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Owner</th>
                                                <th className="px-6 py-4 text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Location</th>
                                                <th className="px-6 py-4 text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Price</th>
                                                <th className="px-6 py-4 text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
                                            {pendingHostels.map((h) => (
                                                <tr key={h._id} className="hover:bg-white/5 transition-colors duration-200">
                                                    <td className="px-6 py-5">
                                                        <div className="font-semibold text-[var(--color-text-primary)] text-base">{h.name}</div>
                                                        <div className="text-sm text-[var(--color-text-muted)] mt-1 truncate max-w-xs">{h.description}</div>
                                                    </td>
                                                    <td className="px-6 py-5 text-sm text-[var(--color-text-primary)]">
                                                        {h.owner?.name || "Unknown"}
                                                        <div className="text-xs text-[var(--color-text-muted)] mt-1">{h.owner?.email}</div>
                                                    </td>
                                                    <td className="px-6 py-5 text-sm text-[var(--color-text-primary)]">{h.place}</td>
                                                    <td className="px-6 py-5 text-base font-bold text-[var(--color-accent-primary)]">₹{h.price}</td>
                                                    <td className="px-6 py-5 text-right space-x-3 whitespace-nowrap">
                                                        <button
                                                            onClick={() => handleStatusUpdate(h._id, "approved")}
                                                            className="bg-[var(--color-success)]/10 text-[var(--color-success)] hover:bg-[var(--color-success)]/20 border border-[var(--color-success)]/20 px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusUpdate(h._id, "rejected")}
                                                            className="bg-[var(--color-danger)]/10 text-[var(--color-danger)] hover:bg-[var(--color-danger)]/20 border border-[var(--color-danger)]/20 px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                                                        >
                                                            Reject
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Users Management Tab */}
                    {activeTab === 'users' && (
                        <div className="animate-fade-up">
                            <div className="px-6 py-5 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] flex justify-between items-center">
                                <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Platform Users</h2>
                                <span className="text-xs font-bold bg-white/10 text-[var(--color-text-primary)] px-3 py-1.5 rounded-full border border-white/10">Total: {users.length}</span>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-[rgba(255,255,255,0.02)] border-b border-[rgba(255,255,255,0.05)]">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-4 text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-4 text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Role</th>
                                            <th className="px-6 py-4 text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
                                        {users.map((u) => (
                                            <tr key={u._id} className="hover:bg-white/5 transition-colors duration-200">
                                                <td className="px-6 py-5 text-sm font-semibold text-[var(--color-text-primary)] flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-accent-primary)]/50 to-[var(--color-accent-secondary)]/50 flex items-center justify-center text-sm font-bold border border-white/10 shadow-inner">
                                                        {u.name?.charAt(0).toUpperCase()}
                                                    </div>
                                                    {u.name}
                                                </td>
                                                <td className="px-6 py-5 text-sm text-[var(--color-text-muted)]">{u.email}</td>
                                                <td className="px-6 py-5">
                                                    <span className={`px-3 py-1 text-xs font-bold rounded-full tracking-wide inline-block ${u.role === 'admin' ? 'bg-[var(--color-accent-secondary)]/20 text-[var(--color-accent-secondary)] border border-[var(--color-accent-secondary)]/30' :
                                                            u.role === 'owner' ? 'bg-[var(--color-accent-primary)]/20 text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)]/30' :
                                                                'bg-white/10 text-[var(--color-text-primary)] border border-white/10'
                                                        }`}>
                                                        {u.role.toUpperCase()}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 text-right">
                                                    {u.role !== 'admin' && (
                                                        <button
                                                            onClick={() => deleteUser(u._id)}
                                                            className="text-[var(--color-text-muted)] hover:text-[var(--color-danger)] transition-colors p-2 hover:bg-[var(--color-danger)]/10 rounded-full"
                                                            title="Remove User"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                            </svg>
                                                        </button>
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
            </div>
        </div>
    );
}
