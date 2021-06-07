# Full-stack Developer test

## User Story

1. User clicks on a unique link, that has an id unique to the candidate.
2. that opens a page where a user could see a list of days that are available
3. User can click on a date, which will then open up a list of times that are vaccant
4. User can then click on a time to confirm that the appointment has been set.
5. User is presented with a confirmation screen & thank you message

## Assumptions you can make:

Available slots

- Currently MON-FRI 1pm to 4pm Hardcoded to ignore weekends
- Valid Start and End Time configurable in lambda

### Tech stack & Design

Design

1. User clicks on a unique link, with params userId and duration
2. This opens where a user could see a list of days that are available
3. User can click on a date, which will fire an api call to an api gateway, which queries dynamodb for all appts on that date.
4. Front-end received the results and displays buttons for intervals of 10min
   (matches slots to check all available slots every 10 min) i.e for a 30min appt you can book 1pm - 1:30pm or 1:10pm to 1:40pm (assuming the times are available)
5. User can then click on a time to confirm that the appointment has been set.
6. All users have GraphQL subscription so when an appt is created, the timeslot will remove itself from view.
7. User is presented with a confirmation screen & thank you message

- Backend
  - S3 and cloudfront, GraphQL api provisioned through Amplify
  - API Gateway and lambda provisioned and deployed through terraform
- Frontend oriented

  - Using Angular Typescript

-

### Running the project

Locally

- npm install
- ng build/serve
