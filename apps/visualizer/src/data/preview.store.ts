import fm from 'front-matter';
import { matchSorter } from 'match-sorter';
import htmlParser from 'prettier/parser-html';
import prettier from 'prettier/standalone';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import * as api from './preview.api';
import { Category, Preview } from './preview.model';
import { replaceHtmlComponents } from './preview.utils';

const filterCategories = (categories: Category[], query: string) => {
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

export interface PreviewState {
  categories: Category[];
  selected?: Preview;
}

export const usePreviewStore = create(
  immer<PreviewState>(() => ({
    categories: [],
  }))
);

export const getCategories = async (
  query?: string | null
): Promise<
  [
    Category[],
    {
      name: string;
      to: string;
    }[]
  ]
> => {
  let { categories } = usePreviewStore.getState();

  if (!categories?.length) {
    categories = await api.getCategories();

    usePreviewStore.setState({ categories, selected: undefined }); // Clear selected preview
  }

  const navigation = categories.map((category) => ({
    name: category.name,
    to: `/dashboard/${category.id}`,
  }));

  if (query) {
    categories = filterCategories(categories, query);

    usePreviewStore.setState({ selected: undefined }); // Clear selected preview
  }

  return [categories, navigation];
};

export const getCategory = async (id: string): Promise<Category | null> => {
  let { categories } = usePreviewStore.getState();
  if (!categories?.length) [categories] = await getCategories();

  const category = categories?.find((category) => category.id === id);

  return category ?? null;
};

export const getPreview = async (
  id: string,
  categoryId: string
): Promise<
  [
    Preview | null,
    {
      name: string;
      to: string;
    }[]
  ]
> => {
  const category = await getCategory(categoryId);
  const preview = category?.previews.find((preview) => preview.id === id);

  if (preview && (!preview?.url || !preview.code)) {
    preview.url = `/pages/${categoryId}/${preview.id}`;

    const html = await import(
      `../pages/categories/${categoryId}/${preview.id}.html?raw`
    ).then((m) => m.default as string);

    const { attributes, body } = fm(html);

    preview.code = await replaceHtmlComponents(body).then((code) =>
      // Format the code with prettier to fix any formatting issues after parsing html components
      prettier.format(code, {
        parser: 'html',
        plugins: [htmlParser],
      })
    );

    const { shell } = attributes as { shell?: string };
    const shellComponent = shell
      ? `<html-component name="${shell}">${preview.code}</html-component>`
      : preview.code ?? '';
    preview.html = await replaceHtmlComponents(shellComponent);

    let { categories } = usePreviewStore.getState();
    categories = categories.map((category) => {
      if (category.id === categoryId) {
        category.previews = category.previews.map((p) =>
          p.id === preview.id ? preview : p
        );
      }

      return category;
    });

    usePreviewStore.setState({ categories });
  }

  usePreviewStore.setState({ selected: preview });

  const navigation = category?.previews.map((preview) => ({
    name: preview.name,
    to: `/dashboard/${category.id}/${preview.id}`,
  }));

  return [preview ?? null, navigation || []];
};

export const getSelectedPreview = (): Preview | null => {
  const { selected } = usePreviewStore.getState();

  return selected ?? null;
};
