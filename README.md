# bitBites Next.js frontend

Frontend application for bitBites api. Implements auth0 authentication service.

## Getting Started

The application uses auth0 for authentication. Sign up here and create a new application: https://auth0.com/.
The following will be required and must be set in environment variables, in .env:
* NEXT_PUBLIC_AUTH0_CLIENT_ID
* NEXT_PUBLIC_AUTH0_CALLBACK_URL - The callback URL must be the same as configured in auth0
* NEXT_PUBLIC_AUTH0_DOMAIN

The backend api can be set with `NEXT_PUBLIC_BITES_API` environment variable. The primary public facing backend url is
served by the `bites-auth-api` service.

First, run the development server:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Docker

To run the dockerized version of the application check [bitbites-infra](https://github.com/sxmlet/bitbites-infra).
The docker network is external therefore it needs to be created first. Use the provided `make` command from the infra
repository.

## Deployment & CI/CD

Circle CI takes care of the automated build process. A new image is getting pushed on every tag. The git tag will be
used for the image tag as well.

To build docker image locally:
```shell
TAG=mytag make build
```
To push docker images:
```shell
TAG=mytag REPO=myrepo make push
```

## Used sources

### Frontend
* https://tabler.io/docs/icons/react
* https://mantine.dev/
* https://nextjs.org/

