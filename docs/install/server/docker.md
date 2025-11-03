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

## Specific Version

To download a specific Docker image, you can visit [GitHub](https://github.com/users/LukeGus/packages/container/package/termix) and replace your Docker tag with one of items listed in the table.

You can also replace `:latest` in your docker run/compose with `:version.x.x.x` and change `x.x.x` to the version you would like to install. See a list of all versions [here](https://github.com/Termix-SSH/Termix/releases).

## Environment Variables

| Config Name | Variable     | Default | Note                                                                                                                                        |
| ----------- | ------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Port        | `PORT`       | 8080    | Port for the frontend web application. No additional ports should be exposed. Port must not fall within the restricted range `30001–30005`. |
| Enable SSL  | `Enable_SSL` | false   | See [SSL](/ssl) for more information on how to enable SSL encryption.                                                                       |

## Usage

Once installed, Termix will be available at `http://localhost:8080` (or whichever port you configured).

## Support

If you need help or want to request a feature with Termix, visit the [Issues](https://github.com/Termix-SSH/Support/issues) page, log in, and press `New Issue`.
Please be as detailed as possible in your issue, preferably written in English. You can also join the [Discord](https://discord.gg/jVQGdvHDrf) server and visit the support
channel, however, response times may be longer.
