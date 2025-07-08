## [Fly.io Deployments](https://fly.io/)

Install the flyctl CLI tool and set up your Fly.io account and app:

```bash
brew install flyctl
flyctl auth login
flyctl launch --org evolonix --name evolonix-enterprise --no-deploy
mv fly.toml apps/enterprise/fly.production.toml
rm -rf Dockerfile
rm -rf .github/workflows/fly-deploy.yml
```

Update [apps/enterprise/fly.production.toml](../../apps/enterprise/fly.production.toml) with the following:

```toml
...
[build]
  dockerfile = './Dockerfile.production'

[env]
  PORT = '3000'

[http_service]
  internal_port = 3000
...
```

Create a Fly.io config for Staging by running the following:

```bash
flyctl launch --org evolonix --name evolonix-enterprise-staging --no-deploy
mv fly.toml apps/enterprise/fly.staging.toml
rm -rf Dockerfile
rm -rf .github/workflows/fly-deploy.yml
```

Update [apps/enterprise/fly.staging.toml](../../apps/enterprise/fly.staging.toml) with the following:

```toml
...
[build]
  dockerfile = './Dockerfile.staging'

[env]
  PORT = '3000'

[http_service]
  internal_port = 3000
...
```

Create a Fly.io config for PR Previews by running the following:

```bash
cp apps/enterprise/fly.staging.toml apps/enterprise/fly.preview.toml
```

Update [apps/enterprise/fly.preview.toml](../../apps/enterprise/fly.preview.toml) with the following:

```toml
# [Remove comments at the top of the file]
...
app = 'enterprise-staging' # Remove this line since the app name will be set dynamically in the CI workflow

[build]
  dockerfile = './Dockerfile.preview'
...
```

Update [apps/enterprise/package.json](../../apps/enterprise/package.json) with the following:

```json
{
  ...
  "nx": {
    "targets": {
      ...
      "deploy": {
        "command": "YELLOW='\\033[0;33m' RESET='\\033[0m'; echo \"${YELLOW}Development deployment is not supported.${RESET}\"",
        "configurations": {
          "production": {
            "command": "flyctl deploy --config apps/enterprise/fly.production.toml --image-label evolonix-enterprise-v$(npm --prefix apps/enterprise pkg get version | tr -d '\"')"
          },
          "staging": {
            "command": "flyctl deploy --config apps/enterprise/fly.staging.toml"
          },
          "preview": {
            "command": "flyctl deploy --config apps/enterprise/fly.preview.toml"
          }
        }
      }
    }
  }
}
```

In a browser, visit the [Fly.io dashboard](https://fly.io/dashboard).
Create or select the `Evolonix` organization.
Scroll down and select `Tokens`.
Enter `GitHub` as the `token name` and leave the `expiration` field blank.
Click `Create Organization Token` and copy the token.

In your GitHub repository, go to `Settings` > `Secrets and variables` > `Actions` > `New repository secret`.
Name the secret `FLY_API_TOKEN` and paste the token you copied from the Fly.io dashboard.
