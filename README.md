# DjangoAccounts

## Run
For running demo version needed execute:
```
docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml up --build
```
See: localhost:8000
For develop you need run:
```
docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml run web python manage.py migrate
docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up
```
And in another terminal:

```
yarn install
yarn start
```
See: localhost:8000
