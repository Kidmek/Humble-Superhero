# Humble Superhero 

This project implements a simple web app for managing superheroes and their humility scores using NestJS for the backend and Vite/React for the frontend.

## 📌 Important: About the `extra` Branch  

🔹 This repository contains an additional branch called `extra`, which includes extra features that are **not part of the main implementation**.  

🔹 The `extra` branch contains potential enhancements that may be added in the future, such as:  
  - Used sqlite and typeorm instead of plain array.
  - Editting and deleting functionality.
  - Swagger documentation. (Accessible on localhost:3000/api)  
  - Minor frontend changes.

🔹 These features are **not required for the main project** but serve as an extension for future improvements.  
### ⚠️ **Reminder: Install Dependencies Again!**  
If you switch to the `extra` branch, make sure to **install dependencies again** by running:  

```bash
npm install
```
---

## Project Structure

```
humble-superhero/
├── backend/ # NestJS backend
└── frontend/ # Vite/React frontend
```

## Installation and Setup

### Backend

1. `cd backend`
2. `npm install`
3. `npm run start:dev` (Runs on http://localhost:3000)
4. `npm run test`
(to run the test)

### Frontend

1. `cd ../frontend`
2. `npm install`
3. `npm run dev` (Runs on http://localhost:5173 by default, make sure the port is not taken or adjust the cors configuration in `backend/src/main.ts`)

## Usage

The frontend allows adding superheroes (name, superpower, humility score 1-10) and displays a list sorted by humility (descending).

## API Endpoints

- `POST /superheroes`: Create a superhero (requires name, superpower, humility in body).
- `GET /superheroes`: Get superheroes, sorted by humility in descending order.

## Team Player Attitude

 I would collaborate with a teammate by brainstorming ideas for new features, such as adding authentication or integrating a real database. We could divide tasks based on our strengths—for example, one focuses on backend improvements while the other works on the frontend. By regularly testing each other’s code and maintaining open communication, we could ensure high-quality results and find issues much faster together. This teamwork would help us build a more robust and scalable solution while learning from each other’s expertise.

## If I had more time,

I would:

- Use a real database instead of in-memory storage.
- Implement pagination, filter and more flexible sorting.
- Implement authentication so that users can rate superheroes humility instead of setting it directly it would be the average of the votes.
- Realtime notification to be sent for superheroes in case of <mark>crisis</mark> :smiley:.
- Improve the frontend UI/UX.
- Integrate Swagger since there are going to be more apis.
- Deploy the application.
