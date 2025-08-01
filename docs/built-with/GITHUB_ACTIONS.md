## [GitHub Actions](https://github.com/features/actions)

Create three environments in your GitHub repository:

1. **Preview**: For PR previews.
2. **Staging**: For staging deployments.
   Restrict to the `main` branch under `Deployment branches and tags`
3. **Production**: For production deployments.
   Restrict to the `v*.*.*` tag under `Deployment branches and tags`

Remove existing `.github/workflows/ci.yml` workflow:

```bash
rm -rf .github/workflows/ci.yml
```

Create [.github/labeler.yml](../../.github/labeler.yml) with the following:

```yaml
# Single quotes are required for leading asterisks

# Changes to files in the root folder
root:
  - changed-files:
      - any-glob-to-any-file: '*'

# Changes to files in the .github/workflows folder
ci:
  - changed-files:
      - any-glob-to-any-file: .github/workflows/**

# Changes within 'docs' folder and subfolders, or markdown files
documentation:
  - changed-files:
      - any-glob-to-any-file: docs/**
      - any-glob-to-any-file: '**/*.md'

# Changes to files in the apps folder
apps:
  - changed-files:
      - any-glob-to-any-file: apps/**

# PR is opened against the main branch
release:
  - base-branch: 'main'

# Changes to files in any enterprise folder
enterprise:
  - changed-files:
      - any-glob-to-any-file: '**/enterprise/**'
```

Create [.github/labels.yml](../../.github/labels.yml) with the following:

```yaml
- name: root
  color: 'b60205'
  description: 'Changes to files in the root folder'

- name: ci
  color: 'd93f0b'
  description: 'Changes to files in the .github/workflows folder'

- name: documentation
  color: 'fbca04'
  description: 'Changes within docs folder and subfolders, or markdown files'

- name: apps
  color: '0e8a16'
  description: 'Changes to files in the apps folder'

- name: release
  color: '006b75'
  description: 'PR is opened against the main branch'

- name: enterprise
  color: '1d76db'
  description: 'Changes to files in any enterprise folder'
```

Create [.github/workflows/labeler.yml](../../.github/workflows/labeler.yml) with the following:

```yaml
# This workflow will triage pull requests and apply a label based on the
# paths that are modified in the pull request.
#
# To use this workflow, you will need to set up a .github/labeler.yml
# file with configuration.  For more information, see:
# https://github.com/actions/labeler

name: Labeler

on:
  - pull_request_target

jobs:
  labeler:
    name: Assign Labels
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
    steps:
      - uses: actions/labeler@v5
        with:
          sync-labels: true
```

Create [.github/workflows/labels.yml](../../.github/workflows/labels.yml) with the following:

```yaml
# Default color paletter of GitHub labels:
# https://gist.github.com/borekb/d61cdc45f0c92606a92b15388cf80185
# b60205
# d93f0b
# fbca04
# 0e8a16
# 006b75
# 1d76db
# 0052cc
# 5319e7
# e99695
# f9d0c4
# fef2c0
# c2e0c6
# bfdadc
# c5def5
# bfd4f2
# d4c5f9

name: Labels

on:
  push:
    branches:
      - main
    paths:
      - .github/labels.yml
      - .github/workflows/labels.yml

  workflow_dispatch:

jobs:
  sync:
    name: Sync Labels
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          sparse-checkout: .github/labels.yml

      - uses: EndBug/label-sync@v2
        with:
          config-file: '.github/labels.yml'
          delete-other-labels: true
```

Create [.github/workflows/preview.yml](../../.github/workflows/preview.yml) with the following:

```yaml
name: Preview

on:
  # Run this workflow on every PR event. Existing preview apps will be updated when the PR is updated.
  pull_request:
    types: [opened, reopened, synchronize]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

permissions:
  actions: read
  contents: read

env:
  FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}

jobs:
  preview:
    runs-on: ubuntu-latest
    outputs:
      affected_build_enterprise: ${{ steps.affected_build_enterprise.outputs.projects }}
    steps:
      - uses: actions/checkout@v4
        with:
          filter: tree:0
          fetch-depth: 0

      # This enables task distribution via Nx Cloud
      # Run this command as early as possible, before dependencies are installed
      # Learn more at https://nx.dev/ci/reference/nx-cloud-cli#npx-nxcloud-startcirun
      # Uncomment this line to enable task distribution
      # - run: npx nx-cloud start-ci-run --distribute-on="3 linux-medium-js" --stop-agents-after="e2e-ci"

      # Cache node_modules
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - run: npm ci --legacy-peer-deps --ignore-scripts
      # - run: npx playwright install --with-deps
      - uses: nrwl/nx-set-shas@v4

      # Prepend any command with "nx-cloud record --" to record its logs to Nx Cloud
      # - run: npx nx-cloud record -- echo Hello World
      # Nx Affected runs only tasks affected by the changes in this PR/commit. Learn more: https://nx.dev/ci/features/affected
      # When you enable task distribution, run the e2e-ci task instead of e2e
      - run: npx nx affected -t lint test # e2e
      - run: npx nx affected -t build --exclude enterprise

      - id: affected_build_enterprise
        if: github.event_name != 'workflow_dispatch'
        run: |
          npx nx show projects --projects enterprise --affected
          projects=$(npx nx show projects --projects enterprise --affected | tr '\n' ' ' | xargs)
          if [ -z "$projects" ]; then
            echo "No affected projects found for enterprise."
          fi
          echo "projects=$projects" >> $GITHUB_OUTPUT

      - if: github.event_name == 'workflow_dispatch' || steps.affected_build_enterprise.outputs.projects != ''
        run: npx nx build enterprise

  deploy-enterprise-preview:
    environment:
      name: Preview
      # name: pr-${{ github.event.number }}
      url: ${{ steps.deploy_status.outputs.url }}
    runs-on: ubuntu-latest
    concurrency:
      group: pr-${{ github.event.number }}
    needs: preview
    if: github.event_name == 'workflow_dispatch' || needs.preview.outputs.affected_build_enterprise != ''
    steps:
      - uses: actions/checkout@v4

      - uses: superfly/flyctl-actions/setup-flyctl@master

      # Check status of app and return output if exists or not
      - id: fly_status
        run: |
          if flyctl status --app "evolonix-enterprise-pr-${{ github.event.number }}"; then
            echo "exists=true" >> $GITHUB_OUTPUT
          else
            echo "exists=false" >> $GITHUB_OUTPUT
          fi

      - if: ${{ steps.fly_status.outputs.exists == 'false' }}
        run: |
          flyctl apps create --org evolonix "evolonix-enterprise-pr-${{ github.event.number }}" \
            --name "evolonix-enterprise-pr-${{ github.event.number }}" \
            --yes

      - run: |
          flyctl deploy --config apps/enterprise/fly.preview.toml --app "evolonix-enterprise-pr-${{ github.event.number }}"

      - id: deploy_status
        run: |
          flyctl status --app "evolonix-enterprise-pr-${{ github.event.number }}" --json > status.json
          hostname=$(jq -r '.Hostname' status.json)
          echo "url=https://${hostname}" >> $GITHUB_OUTPUT
```

Create [.github/workflows/preview.cleanup.yml](../../.github/workflows/preview.cleanup.yml) with the following:

```yaml
name: Preview

on:
  # Run this workflow on when PR is closed.
  pull_request:
    types: [closed]

permissions:
  actions: read
  contents: read
  deployments: write

jobs:
  cleanup-enterprise-preview:
    runs-on: ubuntu-latest
    # Only run one deployment at a time per PR.
    concurrency:
      group: pr-${{ github.event.number }}
    steps:
      - uses: actions/checkout@v4

      - uses: superfly/flyctl-actions/setup-flyctl@master

      - run: |
          flyctl apps destroy "evolonix-enterprise-pr-${{ github.event.number }}" --yes
        env:
          FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}

      # If using the name `pr-${{ github.event.number }}` for the environment, you can use this action to delete the environment.
      # - name: Clean up GitHub environment
      #   uses: strumwolf/delete-deployment-environment@v2
      #   with:
      #     # ⚠️ The provided token needs permission for admin write:org
      #     token: ${{ secrets.GITHUB_TOKEN }}
      #     environment: pr-${{ github.event.number }}
```

Create [.github/workflows/staging.yml](../../.github/workflows/staging.yml) with the following:

```yaml
name: Staging

on:
  push:
    branches:
      - main

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

permissions:
  actions: read
  contents: read

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# However, do NOT cancel in-progress runs as we want to allow these deployments to complete.
concurrency:
  group: 'staging'
  cancel-in-progress: false

jobs:
  staging:
    runs-on: ubuntu-latest
    outputs:
      affected_build_enterprise: ${{ steps.affected_build_enterprise.outputs.projects }}
    steps:
      - uses: actions/checkout@v4
        with:
          filter: tree:0
          fetch-depth: 0

      # This enables task distribution via Nx Cloud
      # Run this command as early as possible, before dependencies are installed
      # Learn more at https://nx.dev/ci/reference/nx-cloud-cli#npx-nxcloud-startcirun
      # Uncomment this line to enable task distribution
      # - run: npx nx-cloud start-ci-run --distribute-on="3 linux-medium-js" --stop-agents-after="e2e-ci"

      # Cache node_modules
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - run: npm ci --legacy-peer-deps --ignore-scripts
      # - run: npx playwright install --with-deps
      - uses: nrwl/nx-set-shas@v4

      # Prepend any command with "nx-cloud record --" to record its logs to Nx Cloud
      # - run: npx nx-cloud record -- echo Hello World
      # Nx Affected runs only tasks affected by the changes in this PR/commit. Learn more: https://nx.dev/ci/features/affected
      # When you enable task distribution, run the e2e-ci task instead of e2e
      - run: npx nx affected -t lint test # e2e
      - run: npx nx affected -t build --exclude enterprise

      - id: affected_build_enterprise
        if: github.event_name != 'workflow_dispatch'
        run: |
          npx nx show projects --projects enterprise --affected
          projects=$(npx nx show projects --projects enterprise --affected | tr '\n' ' ' | xargs)
          if [ -z "$projects" ]; then
            echo "No affected projects found for enterprise."
          fi
          echo "projects=$projects" >> $GITHUB_OUTPUT

      - if: github.event_name == 'workflow_dispatch' || steps.affected_build_enterprise.outputs.projects != ''
        run: npx nx build enterprise

  deploy-enterprise-staging:
    environment:
      name: Staging
      url: https://evolonix-enterprise-staging.fly.dev
    runs-on: ubuntu-latest
    concurrency: deploy-enterprise-staging
    needs: staging
    if: github.event_name == 'workflow_dispatch' || needs.staging.outputs.affected_build_enterprise != ''
    steps:
      - uses: actions/checkout@v4

      - uses: superfly/flyctl-actions/setup-flyctl@master

      - run: |
          flyctl deploy --config apps/enterprise/fly.staging.toml \
            --build-arg VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID="${{ secrets.VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID }}"
        env:
          FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
```

Create [.github/workflows/production.yml](../../.github/workflows/production.yml) with the following:

```yaml
name: Production

on:
  push:
    tags:
      - v*.*.*

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

permissions:
  actions: read
  contents: read

jobs:
  deploy-enterprise:
    environment:
      name: Production
      url: https://evolonix-enterprise.fly.dev
    runs-on: ubuntu-latest
    concurrency: deploy-enterprise
    steps:
      - uses: actions/checkout@v4

      - uses: superfly/flyctl-actions/setup-flyctl@master

      - run: |
          flyctl deploy --config apps/enterprise/fly.production.toml --image-label evolonix-enterprise-${{ github.ref_name }} \
            --build-arg VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID="${{ secrets.VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID }}"
        env:
          FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
```
