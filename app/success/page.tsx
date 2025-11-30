"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SuccessPage() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const checkoutId = params.get("checkout_id");
    if (checkoutId) {
      router.push(`/api/polar/process?checkout_id=${checkoutId}`);
    }
  }, [params, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-gray-100">
      <div className="flex flex-col items-center p-8 bg-white/10 rounded-2xl shadow-xl border border-gray-700 text-center max-w-sm animate-fade-in">
        <h1 className="text-3xl font-bold mb-3 tracking-tight">Processing Purchase</h1>
        <p className="text-gray-400 mb-6">Hang tight! We’re confirming your transaction securely . . .</p>
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-gray-700 rounded-full animate-spin border-t-gray-400"></div>
        </div>
      </div>
    </div>
  );
}
