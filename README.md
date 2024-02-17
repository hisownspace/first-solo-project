# Roomshare

## About my Roomshare app:

    My app allows users to view and create rooms for rental as well as make reservations for those rooms. It implements a search feature, a dynamic calendar and simple integration with the google maps api.

Site: https://room-share-solo-project.herokuapp.com/

Database Schema: https://github.com/hisownspace/first-solo-project/wiki/Database-Schema

## Technologies used:

    This project uses express as the backend, react and redux for the frontend rendering and data. Data is stored in a postgres database, and the backend interfaces it through sequelize. Authentication is handled with a jwt token, so once users sign in, they can remain signed in until that auth expires.

## Features

### Rooms

Individual users can view and create rooms for rental, and users can edit and delete the rooms that they have added to the site.

### Reservations

Users can make a reservation for rooms that they do not own as long as the dates have not already been reserved. Both the user who has made the reeservation and the owner of the room can view their outstanding reservations as well as cancel a reservation.

To prepare on your local machine:

npm i in frontend and backend
prepare the psql database for connection:

- create database with roomshare as user
- give database password
- add db, password and username to .env

npx sequelize db:migrate
npx sequelize db:seed:all
