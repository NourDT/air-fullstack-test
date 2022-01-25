import * as AWS from 'aws-sdk'
import { CreateAppointmentDto } from '../dto/createAppointment.dto';
import { InternalServerErrorException, NotFoundException, Param } from '@nestjs/common';
import { GetAppointmentDto } from '../dto/getAppointments.dto';

// repository of dynamodb
export class AppointmentRepository {
    
    async createAppointment(createAppointmentDto: CreateAppointmentDto) {
        const newAppointment = {
            id: createAppointmentDto.id,
            date: createAppointmentDto.date,
            time: createAppointmentDto.time
        }
        
        try {
            const db = await new AWS.DynamoDB.DocumentClient()
            // check first the date 
            const data = await db.get({
                TableName: process.env.APPOINTMENT_TABLE,
                Key: {
                    "date": newAppointment.date,
                    "time": newAppointment.time
                }
            }).promise()
           
            // validates the items and check the time
            if (data.Item) {
                  return {
                      ok: false,
                      message: 'Time already scheduled, Please pick another time'
                  }
              }

            await new AWS.DynamoDB.DocumentClient()
                .put({
                    TableName: process.env.APPOINTMENT_TABLE,
                    Item: newAppointment,
                })
                .promise();
        } catch(error) {
            console.log(error)
            throw new InternalServerErrorException(error);
        }

        return { ok: true, data: newAppointment };
    }


    async scan() {
        // use can to get all the items 
        try {
            let appointments = [];

            const db = await new AWS.DynamoDB.DocumentClient();

            const result = await db.scan({
                TableName: process.env.APPOINTMENT_TABLE,
                ProjectionExpression: "#date, #time, #id",
                ExpressionAttributeNames: {
                    "#date": "date",
                    "#time": "time",
                    "#id": "id"
                }
            }).promise();

            return { ok: true, data: result.Items };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }       
    }

    async getAllAppointmentsByDate(date) {
        let appointments;

        try {
            let condition = "begins_with (#date, :date)"
            let expressAttrName = {
                "#date": "date"
            };
            let expressAttr = {
                ":date": new Date().getFullYear()
            }
            if (date) {
                condition = "#date = :date" 
                expressAttr = {
                    ":date": date
                }
            } 

            const result = await new AWS.DynamoDB.DocumentClient()
                .query({
                    TableName: process.env.APPOINTMENT_TABLE,
                    KeyConditionExpression: condition,
                    ExpressionAttributeNames: expressAttrName,
                    ExpressionAttributeValues: expressAttr
                }).promise()

               appointments = result.Items
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return { ok: true, data: appointments };
    }
}