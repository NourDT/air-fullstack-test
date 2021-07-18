const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Add some dummy users
(async () => {
  try {
    // const data = await prisma.user.createMany({
    //   data: [
    //     // { firstName: "John", lastName: "Doe", email: "john.doe@email.com" },
    //     // { firstName: "Jane", lastName: "Doe", email: "jane.doe@email.com" },
    //     { firstName: "Nicholas", lastName: "Cheng", email: "nchengyeeshen@gmail.com" },
    //   ],
    // });
    const data = await prisma.user.update({
      where: {
        email: "nchengyeeshen@gmail.com",
      },
      data: {
        firstName: "Nicholas",
      },
    });
    console.log(data);
  } finally {
    process.exit(0);
  }
})();
