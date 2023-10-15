import { Category, Preview } from './preview.model';

export async function getCategories(): Promise<Category[]> {
  const loadPlaceholderImage = async () =>
    await import('../assets/placeholder.png').then((m) => m.default);

  const hydratePreview = (category: Category) => async (preview: Preview) => ({
    ...preview,
    categoryId: category.id,
    image: await import(`../pages/categories/${category.id}/${preview.id}.png`)
      .then((m) => m.default)
      .catch(loadPlaceholderImage),
  });

  return await import('../pages/categories').then(
    async (m) =>
      await Promise.all(
        (m.categories as Category[]).map(async (category) => ({
          ...category,
          previews: await Promise.all(
            category.previews.map(hydratePreview(category))
          ),
        }))
      )
  );
}
