import { PreviewCardSkeleton } from './card.skeleton';

export const DashboardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
      {[1, 2, 3, 4, 5].map((_, i) => (
        <div key={i} className="sm:col-span-6 lg:col-span-4 xl:col-span-3">
          <PreviewCardSkeleton />
        </div>
      ))}
    </div>
  );
};
