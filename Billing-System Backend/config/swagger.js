import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Billing Management API",
      version: "1.0.0",
      description: "API documentation for Billing Management System",
    },

    servers: [
      {
        url: "https://billing-management-system-icwa.onrender.com",
      },
    ],

    tags: [
      {
        name: "Distributor",
        description: "Distributor APIs",
      },
      {
        name: "Auth",
        description: "Authentication APIs",
      },
      {
        name: "User",
        description: "User APIs",
      },
    ],
  },

  apis: ["./routes/**/*.js", "./controllers/**/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;