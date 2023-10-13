export interface Preview {
  id: string;
  name: string;
  image?: string;
  url?: string;
}

/**
 * This interface is used to validate the data in the src/pages/categories.ts file.
 */
export interface Category {
  id: string;
  name: string;
  previews: Preview[];
}
