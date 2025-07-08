## [Docker Deployments](https://www.docker.com/)

Create [apps/enterprise/Dockerfile.preview](../../apps/enterprise/Dockerfile.preview) with the following to be used for preview deployments:

```dockerfile
# syntax = docker/dockerfile:1

# Build with:
# docker build -t enterprise:preview -f apps/enterprise/Dockerfile.preview .
# Run with:
# docker run -it --rm -p 3000:3000 --name evolonix-enterprise-preview --label com.docker.compose.project=evolonix enterprise:preview

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=23.6.0
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app


# Throw-away build stage to reduce size of final image
FROM base AS build

# Copy application code
COPY --link . .

# Install node modules
# RUN npm ci --ignore-scripts # TODO: Use this instead of the following after Nx fixes the release script issue of updating the package-lock.json file
RUN npm install --ignore-scripts

# Set environment
ENV NODE_ENV="preview"

# Build the application
RUN npx nx build enterprise --mode preview


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app/apps/enterprise/package.json /app
COPY --from=build /app/apps/enterprise/build /app/build
RUN npm install --omit=dev

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "npx", "react-router-serve", "build/server/index.js" ]
```

Create [apps/enterprise/Dockerfile.staging](../../apps/enterprise/Dockerfile.staging) with the following to be used for staging deployments:

```dockerfile
# syntax = docker/dockerfile:1

# Build with:
# docker build -t enterprise:staging -f apps/enterprise/Dockerfile.staging .
# Run with:
# docker run -it --rm -p 3000:3000 --name evolonix-enterprise-staging --label com.docker.compose.project=evolonix enterprise:staging

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=23.6.0
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app


# Throw-away build stage to reduce size of final image
FROM base AS build

# Copy application code
COPY --link . .

# Install node modules
# RUN npm ci --ignore-scripts # TODO: Use this instead of the following after Nx fixes the release script issue of updating the package-lock.json file
RUN npm install --ignore-scripts

# Set environment
ARG VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID
ENV VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID=$VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID
ENV NODE_ENV="staging"

# Build the application
RUN npx nx build enterprise --mode staging


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app/apps/enterprise/package.json /app
COPY --from=build /app/apps/enterprise/build /app/build
RUN npm install --omit=dev

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "npx", "react-router-serve", "build/server/index.js" ]
```

Create [apps/enterprise/Dockerfile.production](../../apps/enterprise/Dockerfile.production) with the following to be used for production deployments:

```dockerfile
# syntax = docker/dockerfile:1

# Build with:
# docker build -t enterprise:v$(npm --prefix apps/enterprise pkg get version | tr -d '\"') -f apps/enterprise/Dockerfile.production .
# Run with:
# docker run -it --rm -p 3000:3000 --name evolonix-enterprise-production --label com.docker.compose.project=evolonix enterprise:v$(npm --prefix apps/enterprise pkg get version | tr -d '\"')

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=23.6.0
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app


# Throw-away build stage to reduce size of final image
FROM base AS build

# Copy application code
COPY --link . .

# Install node modules
# RUN npm ci --ignore-scripts # TODO: Use this instead of the following after Nx fixes the release script issue of updating the package-lock.json file
RUN npm install --ignore-scripts

# Set environment
ARG VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID
ENV VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID=$VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID
ENV NODE_ENV="production"

# Build the application
RUN npx nx build enterprise --mode production


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app/apps/enterprise/package.json /app
COPY --from=build /app/apps/enterprise/build /app/build
RUN npm install --omit=dev

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "npx", "react-router-serve", "build/server/index.js" ]
```

Update [apps/enterprise/package.json](../../apps/enterprise/package.json) with the following:

```json
{
  ...
  "nx": {
    "targets": {
      "docker-build": {
        ...
        "configurations": {
          "production": {
            "command": "docker build -t enterprise:v$(npm --prefix apps/enterprise pkg get version | tr -d '\"') -f apps/enterprise/Dockerfile.production ."
          },
          "staging": {
            "command": "docker build -t enterprise:staging -f apps/enterprise/Dockerfile.staging ."
          },
          "preview": {
            "command": "docker build -t enterprise:preview -f apps/enterprise/Dockerfile.preview ."
          }
        }
      }
    }
  }
}
```
