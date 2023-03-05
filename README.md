You can see the docs under the url "/api/docs"

## Installation
After you have set the database, add .env file to the root folder.
#### .env example:
```
PORT = 4000
POSTGRES_HOST = localhost
POSTGRES_USERNAME = username
POSTGRES_DATABASE = tasks
POSTGRES_PORT = 5432
POSTGRES_PASSWORD = defaultpassword
ACCESS_PRIVATE_KEY = access_secret
REFRESH_PRIVATE_KEY = refresh_secret
```
Then you can start your work locally.
```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
