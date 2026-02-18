export default function ImovelLoading() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-5 bg-gray-200 rounded w-40 mb-8 animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="aspect-[4/3] bg-gray-200 rounded-card animate-pulse" />
          <div className="space-y-4 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-5 bg-gray-200 rounded w-full" />
            <div className="h-5 bg-gray-200 rounded w-2/3" />
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="h-24 bg-gray-200 rounded-card" />
              <div className="h-24 bg-gray-200 rounded-card" />
              <div className="h-24 bg-gray-200 rounded-card" />
            </div>
            <div className="h-32 bg-gray-200 rounded-card mt-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
