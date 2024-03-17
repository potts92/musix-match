# Backend
Responsible for the business logic and data storage. It is a REST API that communicates with the frontend and the database.

## Database
Responsible for storing the data. It is a MongoDB database.
### User
The `User` model is responsible for storing user data. It contains the following fields:
- `username`: The username of the user. It is unique and required.
- `name`: The name of the user. It is required.
- `country`: The country of the user. It is required.
- `password`: The password of the user. It is required.

N.B. `password` is hashed using `brcypt`

## Login/ Registration
[authRoutes.ts](src/routes/authRoutes.ts) is responsible for handling the login and registration of users. It uses the `User` model to store and retrieve user data from the database. The logout route is also handled here.
### Login
A POST request to `/login` with a JSON body containing a `username` and `password` will attempt to log the user in. If the user is found in the database, and the password is correct, the userId will be stored in the session and a 200 status code will be returned. If the user is not found, or the password is incorrect, a 4** status code will be returned.
### Registration
A POST request to `/register` with a JSON body containing `username`, `name`, `country` and `password` will attempt to register the user. If the username is not already taken, the user will be registered and a 200 status code will be returned. If the username is already taken, a 4** status code will be returned.
### Logout
A GET request to `/logout` will log the user out by destroying the session and returning a 200 status code.

# MusixMatch
[A singleton class](src/classes/musix-match-gateway.ts) that is responsible for communicating with the MusixMatch API. Can only be interacted with with a series of public methods that control the input for GET requests to the MusixMatch API that are intercepted to store results in cache.