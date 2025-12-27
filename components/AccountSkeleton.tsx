export default function AccountSkeleton() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Profile Header Skeleton */}
      <div className="flex flex-col items-center space-y-4 mb-8">
        {/* Avatar Skeleton */}
        <div className="h-32 w-32 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>

        {/* Name and Bio Skeleton */}
        <div className="text-center space-y-1 w-full max-w-xs">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto animate-pulse"></div>
        </div>
      </div>

      {/* Contact Information Skeleton */}
      <div className="flex justify-center space-x-6 mb-8">
        <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>

      {/* Posts Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 animate-pulse">
            {/* Product Image Skeleton */}
            <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>

            {/* Product Title Skeleton */}
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>

            {/* Product Price Skeleton */}
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
