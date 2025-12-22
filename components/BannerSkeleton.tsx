export default function BannerSkeleton() {
  return (
    <div className="relative w-full h-48 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden rounded-lg">
      {/* Banner-like background */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-500 dark:from-gray-600 dark:to-gray-700 animate-pulse"></div>

      {/* Black overlay like the actual banner */}
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 sm:p-6">
        <div className="text-center">
          <div className="h-8 sm:h-10 md:h-12 bg-gray-400 rounded mb-2 animate-pulse"></div>
          <div className="h-4 sm:h-5 md:h-6 bg-gray-400 rounded w-3/4 mx-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
