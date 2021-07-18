"use strict";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getUsersHandler = async () => {
  try {
    const users = await prisma.user.findMany();
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(users),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(e),
    };
  }
};

const getUserHandler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const user = await prisma.user.findFirst(data);
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(user),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
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
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(events),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
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
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(createdEvent),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      "Access-Control-Allow-Origin": "*",
      body: JSON.stringify(e),
    };
  }
};

module.exports = {
  getUsersHandler,
  getUserHandler,
  getEventsHandler,
  createEventHandler,
};
