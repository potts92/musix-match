# musix-match
## Getting started
### Pre-requisites
- NodeJS installed on your system
- MongoDB installed on your system
 
### Installation
1. Clone the repository
2. Add an .env file to the root of the backend project
3. Populate the .env file with the following:
```
MONGODB_URI = 'mongodb://localhost:27017/musix-match' (or your own MongoDB URI)
PORT = 3001
SESSION_SECRET = 'secret' (or your own secret)
MUSIXMATCH_API_KEY = '8e343bd24865f49e56ffb12348bb9ccf';
```
4. Run `npm run install:all` to install dependencies
5. Run `npm run start` to start the server

[//]: # (todo: not working)
[//]: # (6. Run `npm run test` to run tests)

## Features
### Frontend
Read the frontend [README.md](./frontend/README.md)
### Backend
Read the backend [README.md](./backend/README.md)
### Shared
- Shared resources (types, interfaces, etc) are stored in the `shared` directory