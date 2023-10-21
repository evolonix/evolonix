import { matchSorter } from 'match-sorter';
import { Category, Preview } from '../data';

const loadPlaceholderImage = async () =>
  await import('../assets/placeholder.png').then((m) => m.default);

const importImage =
  (category: Category) =>
  async (preview: Preview): Promise<Preview> => {
    const image = await import(
      `../../pages/categories/${category.id}/${preview.id}.png`
    )
      .then((m) => m.default)
      .catch(loadPlaceholderImage);

    return { ...preview, image } satisfies Preview;
  };

export const loadImages = async (category: Category): Promise<Category> => {
  const previews: Preview[] = await Promise.all(
    category.previews.map(importImage(category))
  );

  return { ...category, previews } satisfies Category;
};

export const generateUrl =
  (category: Category) =>
  (preview: Preview): Preview => {
    const url = `/pages/${category.id}/${preview.id}`;
    return { ...preview, url } satisfies Preview;
  };

export const generateUrls = (category: Category): Category => {
  const previews = category.previews.map(generateUrl(category));
  return { ...category, previews } satisfies Category;
};

export const filterCategories = (categories: Category[], query: string) => {
  const categoriesFound = matchSorter(categories, query, {
    keys: ['name'],
    threshold: matchSorter.rankings.CONTAINS,
  }).map((category) => ({ ...category, previews: [] })) as Category[];

  const matchedCategoriesWithPreviews = categories
    .map((category) => ({
      ...category,
      previews: matchSorter(category.previews, query, {
        keys: ['name'],
        threshold: matchSorter.rankings.CONTAINS,
      }),
    }))
    .filter((category) => category.previews.length) as Category[];

  return matchedCategoriesWithPreviews.concat(
    categoriesFound.filter(
      (category) =>
        !matchedCategoriesWithPreviews.some((c) => c.id === category.id)
    )
  );
};
