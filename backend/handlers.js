"use strict";

const { Prisma, PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createUserHandler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const createdUser = await prisma.user.create({ data });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(createdUser),
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code == "P2002") {
        return {
          statusCode: 409,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            error: "A user with this email already exists",
          }),
        };
      }

      console.error(e);
      return { statusCode: 500 };
    }
  }
};

const getUserHandler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const user = await prisma.user.findFirst(data);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(e),
    };
  }
};

const getUsersHandler = async () => {
  try {
    const users = await prisma.user.findMany();
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(users),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(events),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(e),
    };
  }
};

const getEventHandler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const event = await prisma.event.findFirst(data);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(e),
    };
  }
};

const createEventHandler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const event = await prisma.event.create(data);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    };
  } catch (e) {
    console.error(e);
    return { statusCode: 500 };
  }
};

module.exports = {
  createUserHandler,
  getUserHandler,
  getUsersHandler,
  getEventsHandler,
  getEventHandler,
  createEventHandler,
};
