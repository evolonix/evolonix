import { Category, Preview } from '../data/preview.model';

const loadPlaceholderImage = async () =>
  await import('../../src/assets/placeholder.png').then((m) => m.default);

const importImage =
  (category: Category) =>
  async (preview: Preview): Promise<Preview> => {
    const image = await import(
      `../../templates/${category.id}/${preview.id}.png`
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

export const generateTemplateUrl =
  (category: Category) =>
  (preview: Preview): Preview => {
    const templateUrl = `/templates/${category.id}/${preview.id}`;
    return { ...preview, templateUrl } satisfies Preview;
  };

export const generateTemplateUrls = (category: Category): Category => {
  const previews = category.previews.map(generateTemplateUrl(category));
  return { ...category, previews } satisfies Category;
};
