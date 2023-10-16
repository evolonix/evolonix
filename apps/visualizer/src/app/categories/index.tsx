import { useEffect, useRef } from 'react';
import { Params, useLoaderData } from 'react-router-dom';
import { PreviewCard } from '../../components';
import {
  Category,
  Preview,
  getCategories,
  getSelectedPreview,
} from '../../data';

export async function loader({ params }: { params: Params<string> }) {
  const { categoryId } = params;

  const [categories, navigation] = await getCategories();
  const category = categories.find((category) => category.id === categoryId);
  const selectedPreview = getSelectedPreview();

  return { category, selectedPreview, navigation };
}

export const Component = () => {
  const { category, selectedPreview } = useLoaderData() as {
    category: Category;
    selectedPreview: Preview;
  };

  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (selectedPreview) {
      // Wait a tick for the cards to render before scrolling to the selected
      setTimeout(() => {
        const index = category.previews.findIndex(
          (preview) =>
            preview.category?.id === selectedPreview.category?.id &&
            preview.id === selectedPreview.id
        );
        cardRefs.current[index]?.scrollIntoView({
          block: 'center',
          behavior: 'smooth',
        });
        cardRefs.current[index]?.focus({ preventScroll: true });
      }, 100);
    }
  }, [category, selectedPreview]);

  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold">{category.name}</h1>

      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-12">
          {category.previews.map((preview, index) => (
            <div
              key={preview.id}
              className="sm:col-span-6 lg:col-span-4 xl:col-span-3"
            >
              <PreviewCard
                ref={(el) => (cardRefs.current[index] = el)}
                category={category}
                preview={preview}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Component.displayName = 'Category';
