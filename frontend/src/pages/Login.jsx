import { useState } from "react";
import API from "../api/api";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [data, setData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const login = async () => {
        try {
            const res = await API.post("/auth/login", data);
            if (!res.data.user) return alert("Invalid credentials");

            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("token", res.data.token);
            alert("Login success");

            if (res.data.user.role === "admin") navigate("/admin");
            else if (res.data.user.role === "owner") navigate("/owner");
            else navigate("/");
        } catch (error) {
            const message = error?.response?.data?.message || "Login failed";
            alert(message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh] px-4 animate-fade-up">
            <div className="saas-card p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Welcome back</h1>
                    <p className="text-slate-400 text-sm mt-2">Login to your account to continue</p>
                </div>

                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">Email</label>
                        <input
                            placeholder="Type your email"
                            className="w-full saas-input"
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">Password</label>
                        <input
                            placeholder="Type your password"
                            type="password"
                            className="w-full saas-input"
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                        />
                    </div>

                    <button
                        onClick={login}
                        className="w-full saas-btn-primary py-3 mt-4 text-base tracking-wide"
                    >
                        Sign In
                    </button>

                    <div className="text-center mt-6">
                        <p className="text-sm text-slate-400">
                            Don't have an account? <Link to="/register" className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">Register</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
