export async function loader() {
  const categories = await Promise.all(
    await import('../../pages/categories').then((m) => m.categories)
  );

  const navigation = categories.map((category) => ({
    name: category.name,
    to: `/dashboard/${category.id}`,
  }));

  return { navigation };
}

export const Component = () => {
  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold">Welcome to the Visualizer!</h1>
    </div>
  );
};

Component.displayName = 'Dashboard';
