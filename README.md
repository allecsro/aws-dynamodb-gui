# dynotool
A web based GUI for Amazon DynamoDB, especially useful for DynamoDB Local

[![Build Status](https://travis-ci.org/allecsro/dynotool.svg?branch=master)](https://travis-ci.org/allecsro/dynotool)


## Starting the dev server

Make sure you have Node.js installed.

1. `git clone https://github.com/allecsro/dynotool.git`
2. Run `npm install`
3. Start the dev server using `npm start`
3. Open [http://localhost:8080](http://localhost:8080)

## Available Commands

- `npm start` - start the dev server
- `npm clean` - delete the dist folder
- `npm run production` - create a production ready build in `dist` folder
- `npm run lint` - execute an eslint check
- `npm test` - run all tests
- `npm run test:watch` - run all tests in watch mode
- `npm run coverage` - generate code coverage report in the `coverage` folder

## Production code

Run `npm run production`. The production-ready code will be located under `dist` folder.

