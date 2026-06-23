"use client";

import dynamic from "next/dynamic";
import { Fraunces, Karla } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
});

const DuskdropsImpactHome = dynamic(
  () => import("@/components/DuskdropsImpactHome"),
  { ssr: false }
);

export default function PreviewPage() {
  return (
    <div className={`${fraunces.variable} ${karla.variable}`}>
      <DuskdropsImpactHome />
    </div>
  );
}
