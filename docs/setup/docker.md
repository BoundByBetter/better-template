# DOCKER SETUP
This documentation will cover how to setup a Docker account to publish images to Docker to streamline the developer setup.  The devcontainer can be setup to use the published Docker image instead of the local Dockerfile that would have to go through a long build process.

1. Sign Up for an account at [Docker Hub](https://hub.docker.com/).
1. Create a [Personal Access Token](https://docs.docker.com/go/access-tokens/)
1. Open a terminal in the /.devcontainer folder (where the Dockerfile is stored).
1. Log into Docker:  ```docker login```
1. Build a docker image: ```docker build -t my-image-name:v1.0 .```.  Replace my-image-name with your image name.  Change the version if you would like.
1. Tag the image: ```docker tag my-image-name:v1.0 myusername/my-image-name:v1.0```
1. Push the image to docker hub:  ```docker push myusername/my-image-name:v1.0```
