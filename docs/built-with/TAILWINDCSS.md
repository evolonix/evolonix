## [Tailwind CSS 4](https://tailwindcss.com/)

```bash
npm uninstall -D tailwindcss postcss autoprefixer
npm install tailwindcss@latest
cd apps/enterprise
npx @tailwindcss/upgrade -f
rm -rf postcss.config.js tailwind.config.js
cd ../../
npm install -D @tailwindcss/vite
npm install -D prettier@latest prettier-plugin-tailwindcss
```

Update [apps/enterprise/vite.config.ts](../../apps/enterprise/vite.config.ts) with the following:

```typescript
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  ...
  plugins: [
    ...
    tailwindcss(),
  ],
  ...
});
```

Update [apps/enterprise/styles.css](../../apps/enterprise/styles.css) with the following:

```css
@import 'tailwindcss';
```

Update [apps/enterprise/app/root.tsx](../../apps/enterprise/app/root.tsx) with the following:

```jsx
...
import '../styles.css';
...
```

Update [.prettierrc](../../.prettierrc) with the following:

```json
{
  ...
  "plugins": ["prettier-plugin-tailwindcss"]
}
```
