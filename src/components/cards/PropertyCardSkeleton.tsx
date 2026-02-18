interface Props {
  layout?: 'vertical' | 'horizontal';
}

export function PropertyCardSkeleton({ layout = 'vertical' }: Props) {
  if (layout === 'horizontal') {
    return (
      <div className="bg-surface rounded-card border border-tenant-border shadow-card overflow-hidden flex animate-pulse">
        <div className="w-2/5 bg-gray-200 min-h-[220px]" />
        <div className="flex-1 p-5 space-y-3">
          <div className="h-5 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
          <div className="flex gap-4 mt-4">
            <div className="h-4 bg-gray-200 rounded w-12" />
            <div className="h-4 bg-gray-200 rounded w-12" />
            <div className="h-4 bg-gray-200 rounded w-12" />
          </div>
          <div className="h-6 bg-gray-200 rounded w-1/3 mt-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-card border border-tenant-border shadow-card overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="flex gap-4">
          <div className="h-4 bg-gray-200 rounded w-12" />
          <div className="h-4 bg-gray-200 rounded w-12" />
          <div className="h-4 bg-gray-200 rounded w-12" />
        </div>
        <div className="h-6 bg-gray-200 rounded w-1/3" />
      </div>
    </div>
  );
}
