#!/bin/bash

if [[ "$DEBUG" = "true" ]]
then
    set -ex
fi

if [[ "$@" = "bash" ]]
then
    poetry shell
    exec "$@"
else
    poetry run python manage.py makemigrations
    poetry run python manage.py migrate
    poetry run python manage.py runserver 0.0.0.0:8000
fi
