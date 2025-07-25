import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Astroculture API",
      version: "1.0.0",
      description:
        "A comprehensive API for horoscope generation and user management",
      contact: {
        name: "Piyush Aryan",
        url: "https://github.com/piyushryn/astroculture",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
          description: "JWT token stored in HTTP-only cookie",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "User ID",
            },
            name: {
              type: "string",
              description: "User name",
            },
            email: {
              type: "string",
              format: "email",
              description: "User email",
            },
            birthDate: {
              type: "string",
              format: "date",
              description: "User birth date",
            },
            zodiacSign: {
              type: "string",
              description: "Zodiac sign calculated from birth date",
            },
          },
        },
        SignupRequest: {
          type: "object",
          required: ["name", "email", "password", "birthDate"],
          properties: {
            name: {
              type: "string",
              description: "User name",
              example: "Piyush Aryan",
            },
            email: {
              type: "string",
              format: "email",
              description: "User email",
              example: "piyusharyanofficial@gmail.com",
            },
            password: {
              type: "string",
              description: "User password (min 6 characters)",
              example: "password123",
            },
            birthDate: {
              type: "string",
              format: "date",
              description: "User birth date (YYYY-MM-DD)",
              example: "2001-08-10",
            },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              description: "User email",
              example: "piyusharyanofficial@gmail.com",
            },
            password: {
              type: "string",
              description: "User password",
              example: "password123",
            },
          },
        },
        Horoscope: {
          type: "object",
          properties: {
            sign: {
              type: "string",
              description: "Zodiac sign",
              example: "Aries",
            },
            date: {
              type: "string",
              format: "date-time",
              description: "Date of the horoscope",
            },
            horoscope: {
              type: "string",
              description: "Daily horoscope text",
              example: "Today is a great day for new beginnings...",
            },
            luckyNumber: {
              type: "integer",
              description: "Lucky number for the day",
              example: 7,
            },
          },
        },
        ApiResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              description: "Whether the request was successful",
            },
            message: {
              type: "string",
              description: "Response message",
            },
            data: {
              type: "object",
              description: "Response data",
            },
            timestamp: {
              type: "string",
              format: "date-time",
              description: "Response timestamp",
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              description: "Error message",
            },
            error: {
              type: "string",
              description: "Error details",
            },
            timestamp: {
              type: "string",
              format: "date-time",
            },
          },
        },
      },
    },
    security: [
      {
        cookieAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/controllers/*.js"], // Path to the API docs
};

const specs = swaggerJsdoc(options);

export default specs;
