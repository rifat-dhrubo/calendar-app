# Documentation

## Install Instruction

- Clone this repository.
- cd calendar-app
- yarn install or npm install
- yarn dev or npm run dev

Environment variables are available from .env file.

## API Documentation

The API end points are as follows.

### **GET** `/auth/google`

  Google O-Auth2 route

### **GET** `/auth/google/callback`

  Google O-Auth2  callback route
  
### **GET** `/event`

This endpoint will retrieve all unconfirmed events

### **POST** `/event`

This endpoint will create a new event. Necessary parameters are as follows:

- email
- events
  
`"events": [
  {
   "summary": "Awesome Event",
   "description": "TestEventDescription",
   "end": {
    "dateTime": "2020-08-10T15:57:15.161Z",
    "timeZone": "Asia/Dhaka"
   },
   "start": {
    "dateTime": "2020-08-10T14:27:39.472Z",
    "timeZone": "Asia/Dhaka"
   }
  }
 ]`
  
### **POST** `/event/confirm`

This endpoint will register a new user. Necessary parameters are as follows:

- id
- email

## Front-End Documentation

The app has 3 routes.

### `/`

This is the Homepage.

### `/book`

User can book events from her.

### `/show`

User can confirm events from this page.

## Known Bugs

- The datetime field does not have seconds so google rejects it. But in native browser second is not supported. So we cant actually create events. But a other than that it works as expected.
