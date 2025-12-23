"use client";

import CategorySwiper from "@/components/CategorySwiper";

export default function Store() {
  return (
    <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-7xl flex-col items-center justify-between p-4 sm:items-start">
        <CategorySwiper />
      </main>
    </div>
  );
}
