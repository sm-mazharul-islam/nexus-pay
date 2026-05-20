"use client";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// সার্চ প্যারাম হ্যান্ডেল করার জন্য আলাদা কম্পোনেন্ট
function SuccessContent() {
  const searchParams = useSearchParams();
  const txn = searchParams.get("txn");

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <CheckCircle size={100} className="text-green-500" />
      </motion.div>
      <h1 className="text-3xl font-bold mt-6">Payment Successful!</h1>
      <p className="text-slate-400 mt-2">
        Transaction ID: <span className="font-mono text-pink-400">{txn}</span>
      </p>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
