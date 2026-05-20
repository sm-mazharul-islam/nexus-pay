"use client";
import React, { useEffect, useState } from "react";
// Prisma থেকে অটো-জেনারেটেড টাইপ ইমপোর্ট করুন
import { Order } from "@prisma/client";

export default function Dashboard() {
  // useState-এ Order[] টাইপটি বলে দিন
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((data) => {
        if (data.orders) {
          setOrders(data.orders);
        }
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 p-10 text-white">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Transaction History
      </h2>

      <div className="max-w-5xl mx-auto bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 border-b border-white/10">
              <th className="p-4">TXN ID</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {/* এখন আর 'any' লাগবে না, কারণ TypeScript জানে 'order' কী */}
            {orders.map((order: Order) => (
              <tr
                key={order.id}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="p-4 font-mono text-pink-400">
                  {order.transactionId}
                </td>
                <td className="p-4">{order.amount} BDT</td>
                <td className="p-4">
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">
                    {order.status}
                  </span>
                </td>
                <td className="p-4 text-slate-400">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
