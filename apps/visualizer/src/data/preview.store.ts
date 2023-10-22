import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { filterCategories, hydratePreview } from '../lib';
import * as api from './preview.api';
import { Category, Preview } from './preview.model';

export interface PreviewState {
  categories: Category[];
  selected?: Preview;
}

export const usePreviewStore = create(
  immer<PreviewState>(() => ({
    categories: [],
  })),
);

export const getCategories = async (
  query?: string | null,
): Promise<
  [
    Category[],
    {
      name: string;
      to: string;
    }[],
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
  categoryId: string,
): Promise<
  [
    Preview | null,
    {
      name: string;
      to: string;
    }[],
  ]
> => {
  const category = await getCategory(categoryId);
  let preview = category?.previews.find((preview) => preview.id === id);
  if (category && preview) {
    preview = await hydratePreview(category)(preview);
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
