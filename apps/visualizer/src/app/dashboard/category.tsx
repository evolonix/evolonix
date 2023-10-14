import { Params, useLoaderData } from 'react-router-dom';
import { Category } from '../../data/preview.model';
import { loadImages } from '../../lib/category.utils';
import { PreviewCard } from './card';

export async function loader({ params }: { params: Params<string> }) {
  const { categoryId } = params;
  const categories = await import('../../pages/categories').then(
    (m) => m.categories
  );
  //.then((categories) => categories.map(generateUrls));

  let category = categories.find((category) => category.id === categoryId);
  category = category
    ? await loadImages(category)
    : await Promise.reject('Category not found');

  const navigation = categories.map((category) => ({
    name: category.name,
    to: `/dashboard/${category.id}`,
  }));

  return { category, navigation };
}

export const Component = () => {
  const { category } = useLoaderData() as { category: Category };

  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold">{category.name}</h1>

      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-12">
          {category.previews.map((preview) => (
            <div
              key={preview.id}
              className="sm:col-span-6 lg:col-span-4 xl:col-span-3"
            >
              <PreviewCard category={category} preview={preview} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Component.displayName = 'Category';
