# Holiday Planner

A personal project to practice full stack development by building a holiday planning application. This app is in the **early stages of development** and does not currently have full working functionality.

## Project Overview

The Holiday Planner will allow users to:

- Create and manage holiday plans.
- Search for places of interest for inspiration.
- Visualize their holiday on a map.
- Export their itinerary as a PDF.

### Current Status

At this stage, the project is set up with:

- A **React/TypeScript** frontend.
- A **Node.js/Express** backend.
- A **Postgres database**, hosted on AWS.
- Dashboard to view holidays.
- Ability to create a new holiday.
- Ability to view and edit flights for a particular holiday.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16+)
- npm or yarn
- Git

You'll also need a .env file, populated with the following information:

- PEXELS_API_KEY
- DATABASE_URL
- API_NINJAS_API_KEY

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/anishanorman/holiday-planner.git
   cd holiday-planner
   ```
2. Install dependencies for both frontend and backend:

   ```bash
   npm --prefix holiday-planner-ui install
   npm --prefix holiday-planner-api install
   ```

3. Start the development servers:

   ```bash
   npm run start
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the app.

## Roadmap

### Stage 1: Initial Project Setup (Done ✅)

- [x] Initialize frontend with Vite and React.
- [x] Initialize backend with Express and TypeScript.
- [x] Fetch and display a "Hello World" message from the backend.

### Stage 2: Basic UI Setup (In progress ⏳)

- [x] Set up routing with React Router.
- [x] Create basic pages: Dashboard, view holiday, edit holiday etc
- [ ] Set up navigation

### Stage 3: Basic Holiday Features (In progress ⏳)

- [x] Allow user to view holidays.
- [x] Allow user to add a new holiday.
- [x] Allow user to edit an already existing holiday.
- [ ] Allow user to delete a holiday.

### Stage 4: Basic Flight Features (In progress ⏳)

- [x] Allow user to view flights.
- [x] Allow user to add a new flight.
- [ ] Allow user to edit an already existing flight.
- [ ] Allow user to delete a flight.

### Stage 5: Basic Accomodation Features

- [ ] Allow user to view accomodations.
- [ ] Allow user to add a new accomodation.
- [ ] Allow user to edit an already existing accomodation.
- [ ] Allow user to delete an accomodation.

### Stage 6: Basic Activity Features

- [ ] Allow user to view activities.
- [ ] Allow user to add a new activity.
- [ ] Allow user to edit an already existing activity.
- [ ] Allow user to delete an activity.

### Stage 7: Database Integration (In progress ⏳)

- [x] Connect the backend to a database.
- [x] Allow saving and retrieving data.
- [ ] Persist data between loads (remove seeds).

### Stage 8: User Authentication

- [ ] Add user authentication (e.g., Google OAuth or Firebase Auth).
- [ ] Associate holiday plans with individual user accounts.

### Stage 9: Further developments

- [ ] Enable users to be able to search for inspiration
- [ ] Integrate AI to help plan?