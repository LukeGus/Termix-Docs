# Manual Compilation

If you prefer to manually compile Termix from source, follow these steps.

## Prerequisites

- Git
- Node.js (v18 or higher)
- NPM
- Docker
- Docker Compose
- OpenSSL (required at `PATH` variable if using https)

## Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/Termix-SSH/Termix.git
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

4. Start the backend services:
```bash
npm run dev:backend
```

## Building from Source

If you want to build Termix from source and create your own Docker image, follow these steps:

### Build Steps

1. Clone the repository:
```bash
git clone https://github.com/Termix-SSH/Termix.git
cd Termix
```

2. Install dependencies:
```bash
npm install
```

3. Build the frontend:
```bash
npm run build
```

4. Build the Docker image:
```bash
docker build -t termix:latest -f docker/Dockerfile .
```

5. Create a Docker Compose file to use your built image:
```yaml
services:
  termix:
    image: termix:latest
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

6. Start the container:
```bash
docker-compose up -d
```

## Usage

Once compiled and running, Termix will be available at `http://localhost:8080` (or whichever port you configured).

## Support

If you need help or want to request a feature with Termix, visit the [Issues](https://github.com/Termix-SSH/Support/issues) page, log in, and press `New Issue`.
Please be as detailed as possible in your issue, preferably written in English. You can also join the [Discord](https://discord.gg/jVQGdvHDrf) server and visit the support
channel, however, response times may be longer.