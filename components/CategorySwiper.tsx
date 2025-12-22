"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import { useTranslation } from "@/lib/LanguageContext";

interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  is_active: number;
  created_at: string;
  updated_at: string;
  image_url: string;
}

export default function CategorySwiper() {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(
          data.filter((category: Category) => category.is_active === 1)
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });
  }, []);

  const truncateDescription = (text: string, maxLength: number = 50) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto  py-8">
        <div className="grid grid-cols-3 gap-4">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative h-40 w-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
            {t('category.title')}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {truncateDescription(t('category.description'))}
          </p>
        </div>
        <Button variant="outline">{t('category.seeAll')}</Button>
      </div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[  
          Autoplay({
            delay: 3000,
            stopOnInteraction: false,
          }),
        ]}
        className="w-full"
      >
   <CarouselContent className="-ml-2 md:-ml-4">
  {categories.map((category) => (
    <CarouselItem
      key={category.id}
      className="pl-2 md:pl-4 basis-1/3 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
    >
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center p-3">
        
        {/* Image wrapper */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden">
          <img
            src={category.image_url}
            alt={category.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Category name */}
        <p className="mt-3 text-sm font-medium text-gray-900 dark:text-white text-center truncate w-full">
          {category.name}
        </p>
      </div>
    </CarouselItem>
  ))}
</CarouselContent>

        <CarouselPrevious className="left-2 md:left-4 h-8 w-8 md:h-10 md:w-10" />
        <CarouselNext className="right-2 md:right-4 h-8 w-8 md:h-10 md:w-10" />
      </Carousel>
    </div>
  );
}
