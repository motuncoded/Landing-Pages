const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User Authentication API",
      version: "1.0.0",
      description: "API documentation for the User authentication",
    },
    servers: [
      {
        url: "http://localhost:5000", // Replace with your server URL
      },
    ],
  },
  apis: ["./routes/*.js"], // Adjust the path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
