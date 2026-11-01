# StudySphere Backend

Express + MongoDB API for StudySphere: an AI study assistant, saved study notes and a filterable quiz bank.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![Hugging Face](https://img.shields.io/badge/Hugging_Face-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black)

## About

This is the backend for StudySphere, a study app with a local frontend running on `http://localhost:5173`. It forwards study questions to an LLM, stores AI chat transcripts as notes, and serves an aptitude/reasoning quiz bank with pagination, filtering and search.

## Features

- **AI study assistant**: `POST /api/gemini/ask` sends the prompt to the Hugging Face Inference Router chat-completions API (model `deepseek-ai/DeepSeek-V3.2:novita`) and returns the response. The route keeps its original "gemini" name, though the Google GenAI SDKs in `package.json` are not used.
- **Study notes**: save assistant messages from a chat as a titled note, list a user's notes (newest first), delete notes
- **Quiz bank**: paginated listing with filters for difficulty, type (`mcq`, `msq`, `text`) and tags (aptitude, reasoning, puzzles, data interpretation and more), full-text search on title/description, and configurable sorting
- **Security middleware**: Helmet, CORS limited to the local frontend, rate limiting (100 requests per 15 minutes) and Morgan request logging
- **Models**: User (bcrypt-hashed password), Notes, Quiz, Solution (quiz attempts with score and responses)

## Tech Stack

- Node.js (ES modules), Express 5
- MongoDB with Mongoose 9
- bcryptjs, jsonwebtoken
- helmet, cors, express-rate-limit, cookie-parser, morgan, dotenv
- Hugging Face Inference Router (LLM)

## Project Structure

```
index.js          # App setup, middleware, route mounting
routes/           # gemini, notes, quiz, auth, solution routes
controllers/      # Request handlers
service/          # LLM client (askGemini)
middlewares/      # JWT protect middleware
models/           # User, Notes, Quiz, Solution schemas
```

## Getting Started

**Prerequisites:** Node.js 18+ and a MongoDB instance.

```bash
npm install
node index.js        # or: npx nodemon index.js
```

The server listens on `PORT` (default `3000`).

### Environment Variables

Create a `.env` file with:

| Name | Description |
| --- | --- |
| `MONGO_URI` | MongoDB connection string |
| `HUGGINGFACE_API` | Hugging Face access token for the Inference Router |
| `JWT_SECRET` | Secret for signing JWTs (auth routes and `protect` middleware) |
| `PORT` | Optional, defaults to `3000` |

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/` | Health check |
| POST | `/api/gemini/ask` | Body `{ prompt }`. Returns the LLM response |
| GET | `/api/quiz/getall` | Query: `page`, `limit`, `difficulty`, `type`, `tags` (comma-separated), `search`, `sortBy`, `order` |
| GET | `/api/notes/:userId` | List a user's notes |
| POST | `/api/notes` | Body `{ userId, title, notes, totalMessages }` |
| DELETE | `/api/notes/:id` | Delete a note |

## Project Status

Work in progress. `routes/auth.js` (register, login, `/me`) and the `Solution` model/controller exist, but they are not mounted in `index.js` yet, and `routes/solutionRoutes.js` is empty.

## Author

**Aryan Bhandari**: [GitHub](https://github.com/aryanbha123)
