# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/pestler/nodejs2024Q3-service.git
cd nodejs2024Q3-service
```

## Installing NPM modules
```
git checkout dev-part1
```
```
npm install
```

## Running application

```
npm start
```
By default, the application runs on PORT 4000. If necessary, you can change an .env file based on .env.example and specify the PORT you need in it. 
After starting the app on port you can open in your browser OpenAPI documentation by typing `http://localhost:{PORT}/doc/`.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>

```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
