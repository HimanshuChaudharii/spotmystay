import { Users, Shield, Star, MapPin } from "lucide-react";

const stats = [
    { label: "Happy Guests", value: "12,000+" },
    { label: "Verified Hostels", value: "500+" },
    { label: "Cities Covered", value: "40+" },
    { label: "Trusted Owners", value: "1,200+" },
];

const team = [
    { name: "Himanshu Chaudhari", initial: "H" },
];

export default function AboutUs() {
    return (
        <div className="min-h-screen bg-[#0F172A] text-white font-sans pt-10 pb-20">

            {/* Hero */}
            <section className="max-w-4xl mx-auto px-6 text-center py-20 animate-fade-up">
                <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6 border border-indigo-500/20">
                    Our Story
                </span>
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                    Redefining How Students<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Find Their Stay</span>
                </h1>
                <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
                    SpotMyStay was built with one mission — to make finding safe, verified, and affordable hostels a seamless experience for students and working professionals across India.
                </p>
            </section>

            {/* Stats */}
            <section className="max-w-5xl mx-auto px-6 mb-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((s, i) => (
                        <div key={i} className="saas-card border-white/10 p-6 text-center hover:border-indigo-500/30 transition-colors">
                            <p className="text-3xl font-extrabold text-indigo-400 mb-1">{s.value}</p>
                            <p className="text-slate-400 text-sm font-medium">{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Mission */}
            <section className="max-w-5xl mx-auto px-6 mb-20">
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { icon: <Shield className="w-7 h-7 text-indigo-400" />, title: "Verified Listings", desc: "Every hostel is reviewed and approved by our admin team before going live." },
                        { icon: <Star className="w-7 h-7 text-amber-400" />, title: "Trusted Reviews", desc: "Real reviews from real guests help you make the right choice every time." },
                        { icon: <MapPin className="w-7 h-7 text-purple-400" />, title: "Pan-India Reach", desc: "From metros to hill stations, we cover hostels in 40+ cities across India." },
                    ].map((item, i) => (
                        <div key={i} className="saas-card border-white/10 p-8 hover:border-indigo-500/20 transition-colors">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Team */}
            <section className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-extrabold text-white mb-2">Meet the Team</h2>
                <p className="text-slate-400 mb-12">The people building your best stay experience.</p>
                <div className="grid grid-cols-1 gap-8 max-w-sm mx-auto">
                    {team.map((member, i) => (
                        <div key={i} className="saas-card border-white/10 p-8 flex flex-col items-center hover:border-indigo-500/20 transition-colors">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-3xl font-extrabold text-white mb-4 shadow-lg">
                                {member.initial}
                            </div>
                            <p className="text-white font-bold text-lg">{member.name}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
