export interface Preview {
  id: string;
  name: string;
  categoryId?: string; // This is the ID of the category that this preview belongs to.

  image?: string;
  url?: string;
  code?: string;
}

/**
 * This interface is used to validate the data in the src/pages/categories.ts file.
 */
export interface Category {
  id: string;
  name: string;
  previews: Preview[];
}
