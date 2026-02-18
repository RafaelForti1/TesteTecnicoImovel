import { PropertyCardSkeleton } from '@/components/cards/PropertyCardSkeleton';

export default function ImoveisLoading() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-80 mb-4" />
          <div className="h-5 bg-gray-200 rounded w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
