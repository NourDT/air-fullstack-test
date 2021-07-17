"use strict";

import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUserHandler = async (event, context, callback) => {
  try {
    const data = JSON.parse(event.body);
    const createdUser = await prisma.user.create({ data });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(createdUser),
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientRequestError) {
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

export const getUserHandler = async (event, context, callback) => {
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
      body: JSON.stringify(error),
    };
  }
};

export const getUsersHandler = async (event, context, callback) => {
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
      body: JSON.stringify(error),
    };
  }
};
