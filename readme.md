# Full-stack Developer test (solution below)

Make sure you read **all** of this document carefully, and follow the guidelines in it.

## Context

There's a folder in this repo that contains mockups for a simple candidate reservation page. A candidate would be able to select a valid data & then a time slot and reserve it to lock down the time slot.

## User Story
1. User clicks on a unique link, that has an id unique to the candidate. 
2. that opens a page where a user could see a list of days that are available 
3. User can click on a date, which will then open up a list of times that are vaccant
4. User can then click on a time to confirm that the appointment has been set.
5. User is presented with a confirmation screen & thank you message

## Assumptions you can make:
- You can assume that availability dates & availability hours are fixed throughout the week, for example Mon-Fri 1PM to 4PM will be the vacant times a candidate can choose from. You'll need however to actually highlight which slots have been booked by other candidates dynamically. 

## Requirements

### Functionality

- The **frontend** part should be a single page application rendered in the frontend and load data from an API (Graph or rest is up to you to decide.)
- Your **backend** and database/storage should be created and deployed to AWS - you should be able to build all of the logic for this single page app in [lambda functions](https://aws.amazon.com/lambda/). We have no prefrence for what type of storage you choose, RDS, S3 or others so feel free to pick whatever works best for this use case.

### Tech stack

- Backend oriented
    - Use [Lambda Functions](https://aws.amazon.com/lambda/) &  [API Gateway](https://aws.amazon.com/api-gateway/) for the backend.
    - Use any **language** you like.
    - Use any any storage system for this task
- Frontend oriented
    - Use any modern JS framework such as([React](https://reactjs.org/) to build a simple frontend solution.     
    - Feel free to use any JS frameworks such as React-Router, and packing tools such as Webpack or Parcel etc.

### Bonus
- Write clear **documentation** on how it's designed and how to run the code.
- Write good commit messages.
- An online demo is always welcome.
- Use any provisioning tool to auto deploy the entire stack to an AWS account ([Terraform](https://www.terraform.io/), [Serveless](serverless.com))


### Advanced requirements
These are used for some further challenges. You can **safely skip them if you are not asked to do any**, but feel free to try out.
- Provide a complete logging (when/how/etc) strategy.
- Use a NoSQL DB and build a filter feature that can filter records with some of the attributes 


## What We Care About
Feel free to use any libraries you would use if this were a real production App, but remember we're interested in your code & the way you solve the problem, not how well you can use a particular library. We're interested in your method and how you approach the problem just as much as we're interested in the end result.

Here's what you should aim for:
- Extensible code.
- Feel free to cut corners, but make a note where you do, and be prepared to explain what you
would do in a production context
- Don't worry about authentication.
- You can use whichever tools or prebuilt services you prefer.
- In the Frontend solution, we are far more interested in the data flow & data structures used than the visual design
- Please feel free to use any tech stack. Just be prepared to discuss the rationale behind your
choices. 

Be prepared to talk about
- What you did, how you did it, and how long it took
- Talk about the tech stack and any libraries used in your project and why you chose them 
- Your design and code should meet these requirements and be sufficiently flexible to allow for future extensibility. Code should be well structured and suitably commented.

## Q&A

> Where should I send back the result when I'm done?

Fork this repo and send us a pull request when you think you are done. **Please make sure you adhere to the deadline mentioned in email/message sent to you along with this link** 

> What if I have a question?

Email nour@airecruiter.com for any questions. 

---
# Solution
Placing the solution readme here.

## User Story:
1. User clicks on a unique link in home page `/` and will be redirected to appointment booking page.
2. User can select a date to trigger the display of a list of available times. User will only see timings that have not been booked.
3. User can click on a time and a confirmation dialog will appear asking the user to confirm appointment.
4. The dialog text will change to "Thank you" when user clicks on the "Confirm" button. User can also click on "Back to links" to go back to the links page.
5. The dialog will close if user clicks on "Cancel".

## Assumptions:
1. Available appointment times are everyday, 1:00pm to 4:00pm.
2. Allow user to select appointments in present or future year/month.
3. Allow user to select another appointment after confirming the current one.

## Tech Stack:
- Frontend
  - [VueJS](https://vuejs.org/), [Vuetify](https://vuetifyjs.com/en/), [MomentJS](https://momentjs.com/)
  - Given the time constraint for the project, I decided to go with Vue and Vuetify as I'm more familiar with it and can code faster in it.

- Backend
  - AWS API Gateway, Lambda (Nodejs14.x), DynamoDB
  - I decided to use DynamoDB as storage because its a no-SQL db and can be configured quickly given the time constraint.
  - Deployed with AWS SAM

## Design:
- Frontend
  - The available date has to be from today onwards. If the current time have passed 4pm, then the available date will start from tomorrow onwards.
  - Each time a date is selected, an API call will be triggered to retrieve the available timings of that date. If no timing is available, it will display "No available timings".
  - For a smoother UX, loading indicators are used during API calls.
  - Confirmation and cancel buttons are disabled when user clicks on "Confirm" and the http request is still ongoing. The dialog will also be persisted during this time.
  - Currently, errors are handled with a simple `alert(error)` to show that something has gone wrong during API calls.

- Backend
  - API Gateway => Lambda function => DynamoDB
  - The table consists of 2 fields, `date`(String) and `appointments`(List/Array). The `date` is used as the partition key, this is because we are only querying against `date` in this project and this would allow us to avoid using DynamoDB's scan or creating a GSI. We can quickly query appointments in a given date, which is only what this project needs. The `appointments` is a list containing objects/map with `id` and `time` field.
  - The `GET /appointments/{date}` endpoint allow us to retrieve appointments on a given date.
  - The `POST /appointments` endpoint allow us to create an appointment. The API expects the request body to have `date`, `time`, and `id`. It will check if the time is still available before creating.

# How to run the code:
### Frontend:

```
cd airtest && yarn install && yarn serve
```

### Backend:

Make sure you have a configured AWS account and AWS SAM CLI installed.
```
sam deploy --guided
```
Log in to your API Gateway to copy the url and paste it in `/services/appointments.js`.

# Potential Improvements:

- Check to see if time has passed during creation of appointment.
- Move all frontend business logic to backend.
- Disable dates that are fully booked.
- Use env variable for table name.
