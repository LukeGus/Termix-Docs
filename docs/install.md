# Installation

Termix can be installed using Docker, Docker Compose, or manually. Choose the method that works best for your environment.

## Docker Installation

The simplest way to get Termix up and running is with Docker:

```bash
# Step 1: Create the volume
docker volume create termix-data

# Step 2: Run the container
docker run -d \
  --name termix \
  --restart unless-stopped \
  -p 8080:8080 \
  -v termix-data:/app/data \
  -e PORT=8080 \
  ghcr.io/lukegus/termix:latest
```

## Docker Compose Installation

For a more comprehensive setup, you can use Docker Compose:

```yaml
services:
  termix:
    image: ghcr.io/lukegus/termix:latest
    container_name: termix
    restart: unless-stopped
    ports:
      - "8080:8080"
    volumes:
      - termix-data:/app/data
    environment:
      PORT: "8080"

volumes:
  termix-data:
    driver: local 
```

To start the container, run:

```bash
docker-compose up -d
```

## Environment Variables
| Config Name | Variable Name | Default/Note                                                               |
|-------------|---------------|----------------------------------------------------------------------------|
| Port        | PORT          | 8080 / Port for the frontend application (no other ports should be opened) |

## Manual Installation

If you prefer a manual installation, follow these steps:

### Required Packages
- NPM
- NodeJS

### Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/LukeGus/Termix.git
cd Termix
```

2. Install dependencies and build the project:
```bash
npm install
npm run build
```

3. Start the application:
```bash
npm run preview
```

::: tip
For production environments, we recommend running the website via Nginx. See the Nginx configuration in the Docker directory of the repository.
:::

4. Start the backend services.
```bash
npm run dev:backend
```

## Pre-built Binaries

You can download a Windows installer/portable and a Linux portable within the latest release at <https://github.com/LukeGus/Termix/releases>. However, this is under development.

## Usage

Once installed, Termix will be available at `http://localhost:8080` (or whichever port you configured).

## Support

If you need help with Termix, you can join the [Discord](https://discord.gg/jVQGdvHDrf) server and visit the support channel. You can also open an issue or open a pull request on the [GitHub](https://github.com/LukeGus/Termix/issues) repo.