"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
} from "@/components/ui/carousel";

export default function Home() {
  return (
    <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-7xl flex-col items-center justify-between p-4 sm:items-start">
        <Carousel className="w-full max-w-7xl">
          <CarouselContent>
            {/* Slide 1 */}
            <CarouselItem>
              <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden rounded-lg">
                <Image
                  src="/images/key_bar_banner.jpg"
                  alt="Welcome Banner"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50  flex items-center justify-center p-4 sm:p-6">
                  <div className="text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white">
                      Welcome to eFootball Store
                    </h2>
                    <p className="text-sm sm:text-lg md:text-xl text-white">
                      Get the latest football gear
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>

            {/* Slide 2 */}
            <CarouselItem>
              <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden rounded-lg">
                <Image
                  src="/images/key_bar_banner.jpg"
                  alt="New Arrivals"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 sm:p-6">
                  <div className="text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white">
                      New Arrivals
                    </h2>
                    <p className="text-sm sm:text-lg md:text-xl text-white">
                      Check out our new collection
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>

            {/* Slide 3 */}
            <CarouselItem>
              <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden rounded-lg">
                <Image
                  src="/images/key_bar_banner.jpg"
                  alt="Special Offers"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 sm:p-6">
                  <div className="text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white">
                      Special Offers
                    </h2>
                    <p className="text-sm sm:text-lg md:text-xl text-white">
                      Up to 50% off on selected items
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>

          {/* Carousel navigation */}
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/30 rounded-full p-2 hover:bg-black/50 transition" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/30 rounded-full p-2 hover:bg-black/50 transition" />
          <CarouselDots />
        </Carousel>
      </main>
    </div>
  );
}
