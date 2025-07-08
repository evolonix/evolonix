## [Nx](https://nx.dev/)

```bash
npx create-nx-workspace@latest
```

Select the following options:

![Create Nx Workspace](../assets/create-nx-workspace.png)

Update [.github/workflows/ci.yml](../../.github/workflows/ci.yml) to temporarily disable e2e tests:

```yaml
# - run: npx playwright install --with-deps
- run: npx nx affected -t lint test build # e2e
```
