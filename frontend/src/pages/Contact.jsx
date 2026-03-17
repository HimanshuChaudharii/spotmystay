import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate send
        setSent(true);
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setSent(false), 4000);
    };

    return (
        <div className="min-h-screen bg-[#0F172A] text-white font-sans pt-10 pb-20">

            {/* Header */}
            <section className="max-w-3xl mx-auto px-6 text-center py-20 animate-fade-up">
                <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6 border border-indigo-500/20">
                    Contact Us
                </span>
                <h1 className="text-5xl font-extrabold tracking-tight mb-4">
                    Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Touch</span>
                </h1>
                <p className="text-slate-400 text-lg">We'd love to hear from you.</p>
            </section>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10">

                {/* Contact Info */}
                <div className="space-y-5">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Contact Information</h2>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Have questions about our platform or need help finding the perfect accommodation?
                            Drop us a message and our team will get back to you shortly.
                        </p>
                    </div>

                    {[
                        { icon: <Mail className="w-5 h-5 text-indigo-400" />, label: "Email", value: "admin@spotmystay.com" },
                        { icon: <MapPin className="w-5 h-5 text-purple-400" />, label: "Location", value: "Phagwara, Punjab, India" },
                        { icon: <Phone className="w-5 h-5 text-green-400" />, label: "Phone", value: "+91 91207 28564" },
                    ].map((item, i) => (
                        <div key={i} className="saas-card border-white/10 p-4 flex items-center gap-4 hover:border-indigo-500/20 transition-colors">
                            <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                {item.icon}
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{item.label}</p>
                                <p className="text-white font-semibold">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Form */}
                <div className="saas-card border-white/10 p-8">
                    {sent ? (
                        <div className="h-full flex flex-col items-center justify-center text-center py-10">
                            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4">
                                <Send className="w-7 h-7 text-green-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                            <p className="text-slate-400 text-sm">We'll get back to you as soon as possible.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Your full name"
                                    className="saas-input w-full"
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="you@example.com"
                                    className="saas-input w-full"
                                    value={form.email}
                                    onChange={e => setForm({ ...form, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Message</label>
                                <textarea
                                    required
                                    placeholder="How can we help you today?"
                                    rows={5}
                                    className="saas-input w-full resize-none"
                                    value={form.message}
                                    onChange={e => setForm({ ...form, message: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="saas-btn-primary w-full py-3.5 flex items-center justify-center gap-2">
                                Send Message
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
