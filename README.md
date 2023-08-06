# Boilerplate of Express with TypeScript and Prisma

- Boilerplate Application - Express with TypeScript & Prisma

## Pre requisites

- Node 14.0

## Install dependencies

```
npm install or npm i
```

## Compile TypeScript code and Start Server

```
npm run server
```

Or

```
tsc && node ./dist/server.js
```

## Config

- For development, define required variables in config/environments/development.json and DATABASE_URL in .env file in the root directory
- For production, define required variables as environment variable in remote setup.

## Database

- If using mySQL for the project, use the following command to `install brew install mysql2`

## Contributing

- Every Database Table should have a corresponding Model file in `models` folder
- We use `Prisma` as our ORM
- Use `npx prisma` to cli for migrations
- The `controllers` and `routes` folder should exactly mimic each other. All routers in `routes` should have their corresponding `controllers` file/folder
- All logging should be done using `req.log`. It's a bunyan logger. For model level logging, `req.log` should be passed to underlying layers
