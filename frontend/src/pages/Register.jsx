import { useState } from "react";
import API from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export default function Register() {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });
    const navigate = useNavigate();

    const register = async () => {
        try {
            const res = await API.post("/auth/register", data);

            if (res.data.token && res.data.user) {
                localStorage.setItem("user", JSON.stringify(res.data.user));
                localStorage.setItem("token", res.data.token);
                alert("Registration successful!");

                if (res.data.user.role === "owner") {
                    navigate("/owner");
                } else {
                    navigate("/");
                }
            } else {
                alert("Registration failed. Please try again.");
            }
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                (error.request
                    ? "Registration failed. Cannot reach server. Please ensure backend is running."
                    : "Registration failed. Please try again.");

            alert(errorMessage);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh] py-10 px-4 animate-fade-up">
            <div className="saas-card p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Create an account</h1>
                    <p className="text-slate-400 text-sm mt-2">Join us to book your perfect stay</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">Full Name</label>
                        <input
                            placeholder="John Doe"
                            className="w-full saas-input"
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">Email</label>
                        <input
                            placeholder="name@example.com"
                            className="w-full saas-input"
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">Password</label>
                        <input
                            placeholder="Create a password"
                            type="password"
                            className="w-full saas-input"
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">I am a</label>
                        <div className="relative">
                            <select
                                className="w-full saas-input appearance-none text-white cursor-pointer bg-slate-900"
                                onChange={(e) => setData({ ...data, role: e.target.value })}
                                value={data.role}
                            >
                                <option value="user">Guest (looking for hostels)</option>
                                <option value="owner">Host (listing hostels)</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                                <ChevronDown size={16} />
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={register}
                        className="w-full saas-btn-primary py-3 mt-6 text-base tracking-wide"
                    >
                        Register
                    </button>

                    <div className="text-center mt-6">
                        <p className="text-sm text-slate-400">
                            Already have an account? <Link to="/login" className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">Login here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
