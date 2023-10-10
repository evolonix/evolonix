import { useLoaderData } from 'react-router-dom';
import { Category } from '../../data/preview.model';
import { PreviewCard } from './card';

export async function loader() {
  const categories = await import('../../../templates/categories').then(
    (m) => m.categories
  );

  return { categories };
}

export const Component = () => {
  const { categories } = useLoaderData() as { categories: Category[] };

  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold">Welcome to the Visualizer!</h1>

      <div className="space-y-8">
        {categories.map((category) => (
          <div key={category.id}>
            <h2 className="mb-4 text-2xl font-bold">{category.name}</h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
              {category.previews.map((preview) => (
                <div
                  key={preview.id}
                  className="sm:col-span-6 lg:col-span-4 xl:col-span-3"
                >
                  <PreviewCard categoryId={category.id} preview={preview} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Component.displayName = 'Dashboard';
