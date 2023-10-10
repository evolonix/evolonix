import { Category } from '../src/data/preview.model';

export const categories = [
  {
    id: 'jason',
    name: 'Jason',
    previews: [
      {
        id: 'preview-1',
        name: 'Preview 1',
      },
      {
        id: 'preview-2',
        name: 'Preview 2',
      },
      {
        id: 'home-screen',
        name: 'Home Screen',
      },
      {
        id: 'detail-screen',
        name: 'Detail Screen',
      },
      {
        id: 'thomas-preview',
        name: "Thomas' Preview",
      },
    ],
  },
] satisfies Category[];
