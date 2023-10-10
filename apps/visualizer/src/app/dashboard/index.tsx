import { Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import { Preview } from '../../data/preview.model';
import { delay } from '../../lib/utils';
import { PreviewCard } from './card';
import { DashboardSkeleton } from './skeleton';

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const showSkeleton = url.searchParams.get('skeleton') === 'true';

  const previews = showSkeleton
    ? new Promise<Preview[]>(() => [])
    : Promise.all([
        import('../../../previews/previews').then(
          (m) => m.default as Preview[]
        ),
        delay(0),
      ]).then(([previews]) => previews);

  return defer({ previews });
}

export const Component = () => {
  const { previews } = useLoaderData() as { previews: Promise<Preview[]> };

  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold">Welcome to the Visualizer!</h1>

      <Suspense fallback={<DashboardSkeleton />}>
        <Await resolve={previews}>
          {(resolvedPreviews: Preview[]) => (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
              {resolvedPreviews.map((preview) => (
                <div
                  key={preview.id}
                  className="sm:col-span-6 lg:col-span-4 xl:col-span-3"
                >
                  <PreviewCard preview={preview} />
                </div>
              ))}
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  );
};

Component.displayName = 'Dashboard';
