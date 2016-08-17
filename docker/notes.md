When you want to make changes to the code running in the docker container you need to rebuild the container

    docker build -t zekenie/stack-analysis:v5 .

Then list the images to get the container hash

    docker images

Then update the runner code to reflect the correct image.