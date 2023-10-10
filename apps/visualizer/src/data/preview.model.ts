export interface Preview {
  id: string;
  name: string;
}

/**
 * This interface is used to validate the data in the templates/categories.ts file.
 */
export interface Category {
  id: string;
  name: string;
  previews: Preview[];
}
