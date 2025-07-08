## [Docker](https://www.docker.com/)

Create [apps/enterprise/Dockerfile](../../apps/enterprise/Dockerfile) with the following to be used for development with HMR:

```dockerfile
# syntax = docker/dockerfile:1

# Build with:
# docker build -t enterprise:dev -f apps/enterprise/Dockerfile .
# Run with:
# docker run -it --rm -p 4200:4200 --name evolonix-enterprise-dev --label com.docker.compose.project=evolonix enterprise:dev

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=23.6.0
FROM node:${NODE_VERSION}-slim AS base

# Node.js app lives here
WORKDIR /app

# Install node modules
COPY package-lock.json package.json ./
RUN npm install

# Set environment
ENV NODE_ENV="development"

# Copy application code
COPY . .

# Start the server by default, this can be overwritten at runtime
EXPOSE 4200

WORKDIR /app/apps/enterprise
CMD [ "npx", "react-router", "dev", "--host" ]
```

Create [docker-compose.yml](../../docker-compose.yml) with the following to be used for starting the development container with mapped volumes:

```yaml
# Run with:
# docker compose up
# Include --build to rebuild the image if there are changes to the Dockerfile or package.json files
# Optionally, use -d to run the app in detached mode

services:
  enterprise:
    image: enterprise:dev
    container_name: evolonix-enterprise-dev
    build:
      context: .
      dockerfile: ./apps/enterprise/Dockerfile
    ports:
      - '4200:4200'
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - CHOKIDAR_USEPOLLING=true # To fix an issue with HMR on Windows machines
```

Update [apps/enterprise/package.json](../../apps/enterprise/package.json) with the following:

```json
{
  ...
  "nx": {
    "targets": {
      "docker-build": {
        "command": "docker build -t enterprise:dev -f apps/enterprise/Dockerfile ."
      }
    }
  }
}
```
