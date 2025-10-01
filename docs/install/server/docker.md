# Server Installation via Docker

The simplest way to get Termix server up and running is with Docker.

## Docker Run Installation

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

## Docker Hub Mirror

As an alternative to GHCR, you can also use the Docker Hub mirror:

```bash
# Using Docker Hub mirror
docker run -d \
  --name termix \
  --restart unless-stopped \
  -p 8080:8080 \
  -v termix-data:/app/data \
  -e PORT=8080 \
  bugattiguy527/termix:latest
```

Or with Docker Compose:

```yaml
services:
  termix:
    image: bugattiguy527/termix:latest
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

## Environment Variables

| Config Name | Variable | Default | Note |
|-------------|----------|---------|------|
| Port        | `PORT`   | 8080    | Port for the frontend web application. No additional ports should be exposed. Port must not fall within the restricted range `30001–30005`. |
| Enable SSL  | `Enable_SSL` | false | See [SSL](/ssl) for more information on how to enable SSL encryption. |

## Usage

Once installed, Termix will be available at `http://localhost:8080` (or whichever port you configured).

## Support

If you need help with Termix, you can join the [Discord](https://discord.gg/jVQGdvHDrf) server and visit the support
channel. You can also open an issue or open a pull request on the [GitHub](https://github.com/LukeGus/Termix/issues)
repo.
