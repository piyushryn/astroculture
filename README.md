# Astroculture API

A comprehensive API for horoscope generation and user management built with Node.js, Express, and MongoDB.

## Features

- 🔐 **User Authentication**: Secure signup, login, and logout with JWT tokens
- 🌟 **Daily Horoscopes**: Generate personalized horoscopes based on zodiac signs
- 📊 **Horoscope History**: Retrieve past horoscope readings
- 🛡️ **Security**: HTTP-only cookies, rate limiting, and input validation
- 📚 **API Documentation**: Complete Swagger/OpenAPI documentation

## API Documentation

The API documentation is available at `/api-docs` when the server is running.

### Accessing the Documentation

1. Start the server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000/api-docs
   ```

### Documentation Features

- **Interactive Testing**: Test API endpoints directly from the documentation
- **Request/Response Examples**: See example requests and responses for each endpoint
- **Authentication**: Understand how to authenticate using HTTP-only cookies
- **Schema Definitions**: View detailed data models and validation rules
- **Error Codes**: Comprehensive error response documentation

## API Endpoints

### Authentication
- `POST /auth/signup` - Register a new user
- `POST /auth/login` - User login (returns JWT in HTTP-only cookie)
- `POST /auth/logout` - User logout (clears authentication cookie)

### Horoscope
- `GET /horoscope/today` - Get today's horoscope (requires authentication)
- `GET /horoscope/history?days=7` - Get horoscope history (requires authentication)

### System
- `GET /health` - Health check endpoint
- `GET /` - Redirects to health endpoint

## Authentication

The API uses HTTP-only cookies for authentication:

1. **Login**: Send credentials to `/auth/login`
2. **Cookie**: JWT token is automatically set in an HTTP-only cookie
3. **Requests**: Include the cookie in subsequent requests
4. **Logout**: Call `/auth/logout` to clear the authentication cookie

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/piyushryn/astroculture.git
   cd astroculture
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file with the following variables:

```env
DB_NAME=your_database_name
DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
COOKIE_MAX_AGE_IN_DAYS=7
NODE_ENV=development
```

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with HTTP-only cookies
- **Validation**: Joi
- **Documentation**: Swagger/OpenAPI
- **Security**: bcrypt, rate limiting, CORS

## API Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Error Handling

The API provides detailed error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

ISC License - see LICENSE file for details.

## Author

**Piyush Aryan**
- GitHub: [@piyushryn](https://github.com/piyushryn)
- Project: [Astroculture](https://github.com/piyushryn/astroculture) 