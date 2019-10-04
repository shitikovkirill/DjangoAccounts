FROM node:10

WORKDIR /app

COPY apps/frontend/src ./apps/frontend/src
COPY package.json .
COPY yarn.lock .
COPY webpack.config.js .
COPY .babelrc .
COPY .eslintrc .

RUN set -ex \
    && yarn install --non-interactive \
    && yarn build

FROM python:3.7

WORKDIR /app

RUN set -ex \
    && pip install poetry \
    && poetry --version

COPY pyproject.toml .
COPY poetry.lock .

RUN set -ex \
    && poetry install

COPY ./docker-entrypoint.sh /usr/local/bin/
RUN set -ex \
    && chmod +x /usr/local/bin/docker-entrypoint.sh

COPY . .

COPY --from=0  /app/apps/frontend/static ./apps/frontend/static
COPY --from=0  /app/var/webpack-stats.json ./var

EXPOSE 8000

ENTRYPOINT ["docker-entrypoint.sh"]
