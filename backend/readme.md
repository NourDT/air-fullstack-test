# Backend

## Overview

- AWS services used
    - Lambda
    - API Gateway
    - Relational Database Service (RDS)
- Languages &amp; technologies
    - Postgres
    - Javascript
    - [Prisma](https://www.prisma.io/)

## Node setup

```
$ npm install
```

## Deployment

### Creating AWS RDS instance

Export environment variables

```
$ export RDS_MASTER_USERNAME=<username>
$ export RDS_MASTER_PASSWORD=<password>
```

Create database instance

```
 $ aws rds create-db-instance \
    --engine postgres \
    --db-instance-identifier air-fullstack-aws-db \
    --db-instance-class db.t2.micro \
    --master-user-password $RDS_MASTER_PASSWORD \
    --master-username $RDS_MASTER_USERNAME \
    --allocated-storage 20
```

Get endpoint address

```
$ aws rds describe-db-instances
...
```

Look for the relevant DBInstance and then look for "Endpoint" field and copy the value of the "Address" param.

Example:
```
"Endpoint": {
    "Address": "air-fullstack-aws-db.cube30xhcstp.ap-southeast-1.rds.amazonaws.com",
    "Port": 5432,
    "HostedZoneId": "Z2G0U3KFCY8NZ5"
},

```

### Generating schema & initialising database with Prisma

Create .env file

```
$ echo "DATABASE_URL=postgresql://$RDS_MASTER_USERNAME:$RDS_MASTER_PASSWORD@<ENDPOINT_URL>:<ENDPOINT_PORT>/postgres?schema=public" > .env
```

Example contents of `.env`
```
postgresql://<USERNAME>:<PASSWORD>@air-fullstack-aws-db.cube30xhcstp.ap-southeast-1.rds.amazonaws.com:5432/postgres?schema=public
```

Generate schema & apply it to database

```
$ npx prisma generate
$ npx prisma 
```

### Deploy API services using serverless framework

```
$ serverless deploy
```

### Get API endpoint URL for frontend

```
$ serverless info
...
```

Example endpoint URL
```
https://zxey7wk5d6.execute-api.ap-southeast-1.amazonaws.com
```

This endpoint URL is needed for the frontend to work.

[Frontend setup](../frontend/readme.md)