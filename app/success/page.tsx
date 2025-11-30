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

  return <div>Processing your purchase…</div>;
}
