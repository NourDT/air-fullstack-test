"use strict";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getUserHandler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const user = await prisma.user.findFirst(data);
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify(user),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify(e),
    };
  }
};

const getEventsHandler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const events = await prisma.event.findMany(data);
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify(events),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify(e),
    };
  }
};

const createEventHandler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const createdEvent = await prisma.event.create(data);
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify(createdEvent),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      body: JSON.stringify(e),
    };
  }
};

module.exports = {
  getUserHandler,
  getEventsHandler,
  createEventHandler,
};
