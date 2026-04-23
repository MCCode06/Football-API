# Welcome to Football API
***

## Task
Building a production-ready REST API from scratch is a challenge that involves much more than just returning data. The project requires handling user authentication securely, managing a large dataset (44,000+ international football match results), implementing caching to keep responses fast, and documenting everything so others can use it — all while following clean architecture principles.

## Description
This API is built with **Node.js + Express** and provides access to international football match results dating back to 1872. The dataset was sourced from Kaggle and seeded into a **PostgreSQL** database using **Prisma ORM**.

Key features:
- **JWT Authentication** — users can register and login to receive a token, which is required for write operations
- **Full CRUD** on match data — GET endpoints are public, POST/PUT/DELETE require a valid Bearer token
- **Pagination** — all list endpoints return a maximum of 20 results per page with metadata (total, page, lastPage)
- **Filtering** — matches can be filtered by team, tournament, and year via query parameters
- **Redis Caching** — GET responses are cached using `ioredis` to reduce database load, and cache is invalidated on any write operation
- **Swagger UI** — interactive API documentation available at `/api/docs`

## Installation

**Prerequisites:**
- Node.js v18+
- PostgreSQL running locally
- Redis running locally 

**Steps:**

1. Clone the repository
```bash
git clone https://git.us.qwasar.io/my_api_211643_u1hzby/my_api.git
```

2. Install dependencies
```bash
npm install
```

3. Set up your environment variables — create a `.env` file at the root:
```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/football_db"
JWT_SECRET="your_secret_key_here"
PORT=3000
REDIS_URL="redis://localhost:6379"
```

4. Create the database
```bash
psql -U postgres -c "CREATE DATABASE football_db;"
```

5. Run Prisma migrations
```bash
npx prisma migrate dev --name init
```

6. Seed the database with 49,000+ match records
```bash
node prisma/seed.js
```

7. Start the server
```bash
npm run dev
```

## Usage

The API will be running at `http://localhost:3000`

**Interactive Swagger Docs:**
```
http://localhost:3000/api/docs
```

**Auth endpoints:**
```
POST /api/auth/register     { "email": "user@example.com", "password": "123456" }
POST /api/auth/login        { "email": "user@example.com", "password": "123456" }
```

**Match endpoints (public):**
```
GET /api/matches                        all matches (paginated, 20 per page)
GET /api/matches?page=2                 page 2
GET /api/matches?team=Brazil            filter by team
GET /api/matches?year=2022              filter by year
GET /api/matches?tournament=World Cup   filter by tournament
GET /api/matches/:id                    single match by ID
```

**Match endpoints (requires Bearer token):**
```
POST   /api/matches          create a new match
PUT    /api/matches/:id      update an existing match
DELETE /api/matches/:id      delete a match
```

To use protected endpoints, include the token from login in your request headers:
```
Authorization: Bearer <your_token_here>
```


### The Core Team


<span><i>Made at <a href='https://qwasar.io'>Qwasar SV -- Software Engineering School</a></i></span>
<span><img alt='Qwasar SV -- Software Engineering School\'s Logo' src='https://storage.googleapis.com/qwasar-public/qwasar-logo_50x50.png' width='20px' /></span>