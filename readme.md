# Full-stack Developer test

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

- Backend oriented
    - S3 and cloudfront, GraphQL api provisioned through Amplify 
    - API Gateway and lambda provisioned and deployed through terraform 
- Frontend oriented
    - Using Angular Typescript

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

Fork this repo and send us a pull request when you think you are done. **Deadline is next Tuesday, 8th of June.** 

> What if I have a question?

Email nour@airecruiter.com for any questions. 
