"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Smartphone } from "lucide-react";
// ১. এই লাইনটি ইমপোর্ট করুন
import { useRouter } from "next/navigation";

const paymentMethods = [
  {
    name: "bKash",
    icon: <Smartphone />,
    color: "bg-pink-600",
    desc: "Secure Mobile Payment",
  },
  {
    name: "Nagad",
    icon: <Smartphone />,
    color: "bg-orange-500",
    desc: "Fast & Reliable",
  },
  {
    name: "Rocket",
    icon: <Smartphone />,
    color: "bg-purple-700",
    desc: "Direct Banking",
  },
  {
    name: "Card",
    icon: <CreditCard />,
    color: "bg-blue-600",
    desc: "Visa / Mastercard",
  },
];

export default function NexusPayHome() {
  const [loading, setLoading] = useState<string | null>(null);
  // ২. রাউটারটি ইনিশিয়েট করুন
  const router = useRouter();

  const handlePayment = async (method: string) => {
    setLoading(method);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 1000, method }),
      });

      const data = await res.json();
      if (data.success) {
        // ৩. window.location.href এর বদলে এটি ব্যবহার করুন
        router.push(`/payment-success?txn=${data.order.transactionId}`);
      }
    } catch (error) {
      alert("Payment failed!");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-4xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500">
        Choose Your NexusPay Method
      </h1>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {paymentMethods.map((method, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className="bg-slate-900 border border-slate-800 p-8 rounded-3xl backdrop-blur-xl hover:border-pink-500/50 transition-all cursor-pointer shadow-xl"
          >
            <div className={`p-4 rounded-2xl w-fit ${method.color} mb-6`}>
              {method.icon}
            </div>
            <h2 className="text-2xl font-bold">{method.name}</h2>
            <p className="text-slate-400 mb-6">{method.desc}</p>
            <button
              disabled={loading !== null}
              onClick={() => handlePayment(method.name)}
              className="w-full py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-pink-500 hover:text-white transition-colors"
            >
              {loading === method.name ? "Processing..." : "Pay Now"}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
