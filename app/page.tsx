"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
  type CarouselApi,
} from "@/components/ui/carousel";
import CategorySwiper from "@/components/CategorySwiper";
import NewProducts from "@/components/NewProducts";
import BannerSkeleton from "@/components/BannerSkeleton";

interface Banner {
  id: number;
  title: string;
  description: string;
  image: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export default function Home() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: false,
      mirror: true,
    });

    fetch("http://127.0.0.1:8000/api/banners")
      .then((res) => res.json())
      .then((data) => {
        setBanners(data.filter((banner: Banner) => banner.is_active === 1));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching banners:", error);
        setLoading(false);
      });
  }, []);

  const onSlideChange = useCallback(() => {
    // Refresh AOS animations when slide changes
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }, []);

  useEffect(() => {
    if (!api) return;

    api.on("select", onSlideChange);

    return () => {
      api.off("select", onSlideChange);
    };
  }, [api, onSlideChange]);

  if (loading) {
    return (
      <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex w-full max-w-7xl flex-col items-center justify-between p-4 sm:items-start">
          <div className="w-full max-w-7xl">
            <BannerSkeleton />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-7xl flex-col items-center justify-between p-4 sm:items-start">
        <Carousel className="w-full max-w-7xl" setApi={setApi}>
          <CarouselContent>
            {banners.length > 0 &&
              banners.map((banner) => (
                <CarouselItem key={banner.id}>
                  <div className="relative w-full h-48 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden rounded-lg">
                    <img
                      src={`http://127.0.0.1:8000/storage/${banner.image}`}
                      alt={banner.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 sm:p-6">
                      <div className="text-center">
                        <h2
                          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-white"
                          data-aos="fade-up"
                          data-aos-delay="200"
                        >
                          {banner.title}
                        </h2>
                        <p
                          className="text-xs sm:text-sm md:text-lg lg:text-xl text-white"
                          data-aos="fade-up"
                          data-aos-delay="400"
                        >
                          {banner.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))
            }
          </CarouselContent>

          {/* Carousel navigation */}
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/30 rounded-full p-2 hover:bg-black/50 transition" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/30 rounded-full p-2 hover:bg-black/50 transition" />
          <CarouselDots />
        </Carousel>

        {/* Category Swiper */}
        <CategorySwiper />

        {/* New Products */}
        <NewProducts />
      </main>
    </div>
  );
}
