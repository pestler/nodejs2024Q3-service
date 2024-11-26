# Home Library Service

## Description
The **Home Library Service**

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://docs.docker.com/engine/install/)
- `Docker Hub` Account - Sign Up on [Docker Hub](https://hub.docker.com/)
- Docker Scout (for scanning images) - [Download & Install Docker Scout](https://docs.docker.com/scout/install/)

## Installation

1. **Clone the repository**:  

    ```bash
    git clone https://github.com/pestler/nodejs2024Q3-service.git
    ```

2. **Go to the project folder and select `auth-logging` branch**:  

    ```bash
    cd nodejs2024Q3-service
    git checkout dev-part3
    ```
3. **Install dependencies**:  

    Make sure you are using Node.js version 22.x.x (22.9.0 or higher).
    ```bash
    npm install -f
    ```

4. **Set up the environment**:  

    Create a `.env` file at the root of the project based on the `.env.example` file.  
    The `.env.example` contains an example of how to define the port on which the application will run, postgres variables, JWT settings and logging settings:  
    ```
    PORT=4000

     POSTGRES_PORT=5432
     POSTGRES_USER=user
     POSTGRES_PASSWORD=password
     POSTGRES_DB=postgress

     CRYPT_SALT=10
     JWT_SECRET_KEY=secret
     JWT_SECRET_REFRESH_KEY=secret
     TOKEN_EXPIRE_TIME=1h
     TOKEN_REFRESH_EXPIRE_TIME=24h

     DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public
    ```
    If `PORT` variable is not provided, the application will use port `4000` by default.

  > [!NOTE]  
  > You do not need to change `DATABASE_URL` variable. Just leave it as is.

## Running application

The application can be run using `Docker`.

> [!NOTE]  
> Unlike Compose V1, Compose V2 integrates into the Docker CLI platform and the recommended command-line syntax is `docker compose`. So if you are using Compose V1 run commands with `docker-compose`.
 
Go to the root project directory and run the following command:

```bash
docker compose up
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/api/.
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
REST service: Logging & Error Handling and Authentication and Authorization

### Auto-fix and format

```
npm run lint
```

```
npm run format
```


## Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

### Login

To authenticate to a registry with a username and password run the following command (and type the password when asked):

```bash
docker login -u <your_username>
```