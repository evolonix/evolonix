import { PreviewCardSkeleton } from './card.skeleton';

export const DashboardSkeleton = () => {
  return (
    <div className="space-y-8">
      {[1, 2].map((_, i) => (
        <div key={i}>
          <h2 className="mt-1 mb-5 h-6 w-48 animate-pulse rounded-full bg-gray-200 text-2xl">
            &nbsp;
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
            {[1, 2, 3, 4, 5].map((_, j) => (
              <div
                key={j}
                className="sm:col-span-6 lg:col-span-4 xl:col-span-3"
              >
                <PreviewCardSkeleton />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
