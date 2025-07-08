## Nx Release

Set initial version in `apps/enterprise/package.json`:

```bash
npm --prefix apps/enterprise pkg set version 0.0.0
```

Update [nx.json](../../nx.json) with the following:

```json
{
  ...
  "release": {
    "projects": ["!**/*-e2e"],
    "version": {
      "conventionalCommits": true,
      "versionActionsOptions": {
        "skipLockFileUpdate": true
      },
      "fallbackCurrentVersionResolver": "disk"
    },
    "changelog": {
      "workspaceChangelog": {
        "createRelease": "github"
      },
      "automaticFromRef": true
    }
  },
  "sync": {
    "applyChanges": true
  }
}
```
