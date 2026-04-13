import swaggerJSDoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API Documentation with JWT auth",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT token",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // apis: ["./routes/*.js"], // Path to your route files for annotations
  apis: ["./routes/**/*.js"]
};


const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;