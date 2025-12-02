"use client";

import dynamic from "next/dynamic";

const SuccessClient = dynamic(() => import("./client"), { ssr: false });

export default function SuccessPageWrapper() {
  return <SuccessClient />;
}
