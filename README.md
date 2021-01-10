# React Flask Application

![Actions Workflow](https://github.com/joaomarcuslf2/react-flask-application/workflows/Flask/badge.svg)
## How to Start Development

1. Copy ```sample.env.dev``` to ```.env.dev``` and rename the variables if you need
2. Build the images and run the containers:

    ```sh
    $ docker-compose up -d --build
    ```

    Test it out at [http://localhost:5000](http://localhost:5000). The "web" folder is mounted into the container and your code changes apply automatically.

## Useful Commands

```
$ docker-compose exec api pytest -v
$ docker-compose exec api pip install -r requirements.txt
$ docker-compose exec api python run.py seed_db
```

## What should have:

- React
- Flask APi
- Migration
- JWT
- PostgreSQL
- Tests
