import { hydratePreview } from '../lib';
import { Category } from './preview.model';

export async function getCategories(): Promise<Category[]> {
  return await import('../../pages/categories')
    .then((m) => m.default)
    .then(
      async (categories) =>
        await Promise.all(
          categories.map(async (category) => ({
            ...category,
            previews: await Promise.all(
              category.previews.map(hydratePreview(category, false), false),
            ),
          })),
        ),
    );
}
