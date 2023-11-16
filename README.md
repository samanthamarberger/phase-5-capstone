# ElevateFit application: React/Rails API

## Description

This web application was created so that personal trainers and those who want to excel in a certain athletic field can come together easily. There are two sides to this application, a trainer side and a client side.
The trainers have access to post/ edit/ delete their availabilities so that clients can book with them.
The clients have the availability to book/ delete appointments with specific trainers.
Take a look at my application and play around with some of the functionality. 

## Getting Started

### Make sure you have the following: 
- Ruby 2.7.4
- NodeJS (v16), and npm
- PostgreSQL database

**Note**: if you are wanting to deploy the application on Render: 
- Render account

See Environment Setup below for instructions on installing these tools if you
don't already have them.

### Setup

```console
# Clone the repository
$ git clone https://github.com/samanthamarberger/phase-5-capstone

# Install dependencies
$ bundle install
$ npm install --prefix client

# To run the backend [http://localhost:3000](http://localhost:3000)
$ rails s

# To run the frontend on [http://localhost:4000](http://localhost:4000)
$ npm start --prefix client
```

## Features

This application has various classes and relationships between classes:

- appointments
- availabilities
- clients
- trainers
- specialities

- An Appointment belongs_to a client, and belongs_to a trainer
- An Availability belongs_to a trainer
- A client has_many appointments and has_many trainers through appointments
- A trainer has_many appointments, has_many clients through appointments, has_many availabilities, and belongs_to a speciality
- A Speciality has_many trainers

These relationships allow easy access to classes through other classes which makes building out functionality much easier.

My application utilizes Authorization and Authentication to secure the user data and make it user friendly. This allows for

- Login and Logout functionality
- The use of cookies

My application also uses FullCalendar which is a JavaScript library that allows me to visualize appointment and availability dates and times for the users convenience. FullCalendar allows for east schelduling, editing, and canceling of appointments. 

<!-- 
    in trainers:
        contact clients - the “email:” should not be a part of the hyperlink
    in client:
    Clean up error list
-->