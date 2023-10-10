export const PreviewCardSkeleton = () => {
  return (
    <div className="overflow-hidden bg-white sm:rounded-lg sm:shadow">
      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <h3 className="my-1 h-4 w-60 animate-pulse rounded-full bg-gray-200 text-base leading-6">
          &nbsp;
        </h3>
      </div>
    </div>
  );
};
