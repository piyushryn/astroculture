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


### Note on AI usage
- Considering that this was a machine coding round, tried not to use AI tools intentionally when actually building logic and writing code. 
- Cursor AI was used for most of the documentation purposes such as JS Doc and Readme
- ChatGPT was used for generation of the 100 pre made horoscopes, and I used it to figure out how actually a person's zodiac is calculated
- AI was not used in setting up the repo, i.e The repository setup was done from scratch manually 
- Cursor Agent was used to setup swagger, seemed like documenting something that I manually created hence seemed like a fair usage
- Commit messages were done by AI, though I ensured they were still following the conventional structure.


### Tasks Covered 
- Basic Auth ✅
- Auto Detect Zodiac sign ✅ 
- Daily horoscope API ✅
  - Uses zodiac+date hash to keep the result same for a zodiac sign for a day, will change if either the zodiac or the date changes
- Horoscope History ✅
  - Retrieve the stored history of zodiacs for a user if he checked it in the last seven days

### Bonuses Covered 
- Horoscopes are being stored in the user history table 
- Very basic implementation of a ratelimiter (would have used redis for a distributed system or a prod app)
- Swagger API doc (used AI agent)
  

### Tech Stack
- Node.js v23.11.1
- NPM v6.14.18 (volta didn't change it to the latest version automatically)
- MongoDB for storage 
- JWT for session less auth
- Mongoose as an ODM 

### Open questions/Improvements
The history API only returns the history of a certain day if the horoscope was fetched by the user on that particular day. Do we want to fetch history even if he didn't fetch it manually that day? This can be calculated on the run time if required.