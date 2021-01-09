# React Flask Application

## How to Start Development

1. Copy ```sample.env.dev``` to ```.env.dev``` and rename the variables if you need
2. Build the images and run the containers:

    ```sh
    $ docker-compose up -d --build
    ```

    Test it out at [http://localhost:5000](http://localhost:5000). The "web" folder is mounted into the container and your code changes apply automatically.

## What should have:

- React
- Flask APi
- Migration
- JWT
- PostgreSQL
- Tests
