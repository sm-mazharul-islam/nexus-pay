import React from "react";

export default function Payment() {
  return (
    // একটি কার্ডের উদাহরণ (Tailwind + Bento grid layout)
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl hover:scale-105 transition-transform duration-300">
        <h2 className="text-xl font-bold">bKash</h2>
        <p>Pay securely via bKash</p>
        <button className="mt-4 bg-pink-600 text-white px-4 py-2 rounded-lg">
          Pay Now
        </button>
      </div>
      {/* Nagad, Rocket কার্ডগুলো এভাবে যোগ করুন */}
    </div>
  );
}
