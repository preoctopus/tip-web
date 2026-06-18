# Thriving In Place - Static Website Deployment

This project is packaged as a Docker image containing an Nginx web server to host the static website files.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your system.

## Building the Image

Navigate to the root directory of this repository and run the following command:

```bash
docker build -t thriving-in-place-web .
```

## Running the Container

Once the image is built, you can start the container and map port 8080 of your host machine to port 8080 of the Nginx container.

```bash
docker run -d -p 8080:8080 --name thriving-web thriving-in-place-web
```

## Verifying the Deployment

After starting the container, open your web browser and navigate to:

[http://localhost:8080](http://localhost:8080)

You should see the **Thriving In Place** landing page.

## Container Management

### Stopping the Container
To stop the running instance of the website:

```bash
docker stop thriving-web
```

### Removing the Container
To remove the container after stopping it:

```bash
docker rm thriving-web
```

### Viewing Nginx Logs
If you encounter any issues with the deployment, check the Nginx logs:

```bash
docker logs thriving-web
```

## Project Structure Note
The `Dockerfile` assumes that the static HTML files (`index.html`, `minneapolis.html`, `toronto.html`) are located in the same directory as the `Dockerfile`.
