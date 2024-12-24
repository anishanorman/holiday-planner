# Holiday Planner

A personal project to practice full stack development by building a holiday planning application. This app is in the **early stages of development** and currently features basic UI and backend integration.

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
- Basic integration between frontend and backend, fetching a "Hello World" message.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16+)
- npm or yarn
- Git

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

- [ ] Set up routing with React Router.
- [ ] Create basic pages: Dashboard, view holiday, edit holiday etc
- [ ] Set up navigation

### Stage 3: Dynamic Frontend Features

- [ ] Allow user to add a new holiday plan.
- [ ] Allow user to edit an already existing holiday plan.
- [ ] Allow user to delete a holiday plan.

### Stage 4: Database Integration

- [ ] Connect the backend to a database.
- [ ] Allow saving and retrieving holiday data.

### Stage 5: User Authentication

- [ ] Add user authentication (e.g., Google OAuth or Firebase Auth).
- [ ] Associate holiday plans with individual user accounts.

### Stage 6: Further developments

- [ ] Enable users to be able to search for inspiration
- [ ] Integrate AI to help plan?