"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { Button } from "./Button";

export const NewsletterCard: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
      }, 3000);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white rounded-lg p-6 shadow-md relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -right-8 -top-8 w-28 h-28 bg-blue-500 rounded-full opacity-20 blur-xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center space-x-2 text-blue-200 mb-2">
          <Mail className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-widest text-blue-200">STAY UPDATED</span>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 leading-tight">
          Never Miss a Trending Story
        </h3>
        <p className="text-xs text-blue-100 mb-5 leading-relaxed">
          Get the freshest entertainment scoops, Afrobeats drops, and celebrity gist delivered right to your inbox daily.
        </p>

        {subscribed ? (
          <div className="bg-blue-600/60 border border-blue-400/40 rounded-md p-3 text-center flex items-center justify-center gap-2 text-white text-sm font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            <span>Thank you for subscribing!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="w-full px-3.5 py-2.5 rounded-md bg-white text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-inner"
            />
            <Button
              type="submit"
              variant="primary"
              className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs uppercase tracking-wider py-2.5 shadow"
            >
              SUBSCRIBE
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
