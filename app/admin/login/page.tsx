"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Lock, Mail, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials. Please try again.");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-primary">
      {/* Visual Background Side */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img 
          src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80" 
          alt="Luxury Resort" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px]" />
        <div className="absolute inset-0 flex flex-col justify-center px-20 text-white">
          <span className="text-accent uppercase tracking-[0.4em] text-sm font-bold mb-6">Management Portal</span>
          <h1 className="font-playfair text-6xl font-bold mb-8 leading-tight">Welcome to the <br/>Aura Sanctuary</h1>
          <p className="text-xl font-light text-white/80 max-w-md leading-relaxed">
            Access your administrative suite to manage bookings, inquiries, and the guest experience.
          </p>
        </div>
      </div>

      {/* Login Form Side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-24 bg-[#fcfcf9] relative">
        <div className="absolute top-12 left-8 md:left-24">
          <Link href="/" className="group flex items-center gap-3 text-primary/60 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
            Return to Website
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto space-y-12">
          <div className="space-y-4">
            <div className="font-playfair text-4xl font-bold tracking-[0.2em] text-primary">AURA</div>
            <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
            <p className="text-gray-500 font-medium">Please enter your credentials to continue</p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r-xl text-sm font-medium animate-shake">
              {error}
            </div>
          )}

          <form className="space-y-8" onSubmit={handleLogin}>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                  <Mail className="w-3 h-3" /> Email Address
                </label>
                <input 
                  type="email" 
                  required 
                  placeholder="admin@aura-resort.com"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all text-primary font-medium" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                  <Lock className="w-3 h-3" /> Password
                </label>
                <input 
                  type="password" 
                  required 
                  placeholder="••••••••"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all text-primary font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary hover:bg-accent hover:text-primary text-white py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-xs transition-all duration-500 shadow-xl shadow-primary/10 flex justify-center items-center gap-3 disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Authorize Access"
              )}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 font-medium">
            Protected by enterprise-grade encryption.
          </p>
        </div>
      </div>
    </div>
  );
}
