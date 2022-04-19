Welcome to my submission of Project 1 - Image Processing API
This project resizes images to the desired width/height.

SCRIPTS: 
    - start: starts the dev server.
    - build: builds the project.
    - jasmine: runs the tests
    - test: builds the project and runs the tests.

ENDPOINTS:
    - /api : Shows the names of the available images.

    - /api/:name?
        Ex: '/api/image4?width=500&height=300'
        It has 5 available images: image1, image2, image3, image4, image5.
        width & height queries control the output dimensions. They are optional.

        @note: If width & height are not given, they will default to 400, 300.