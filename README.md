# Astroculture API

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Environment Variables
Create a `.env` file in the root directory:
```env
DB_NAME=astroculture
DB_URI=mongodb://localhost:27017/astroculture
JWT_SECRET=your-secret-key-here
COOKIE_MAX_AGE_IN_DAYS=7
NODE_ENV=development
```

### 3. Start the Server
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## API Documentation

Once the server is running, visit:
- **API Docs**: `http://localhost:3000/api-docs`
- **Health Check**: `http://localhost:3000/health`

## API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user

### Horoscope
- `GET /horoscope/today` - Get today's horoscope (requires auth)
- `GET /horoscope/history` - Get horoscope history (requires auth)
