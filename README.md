# Country Information Application

This application provides detailed information about countries, including their borders, population history, and flags. It consists of a Node.js backend and a Next.js frontend.

## Features

- List of available countries
- Detailed country information including:
  - Country flag
  - Border countries
  - Population history chart
- Responsive design
- Interactive UI with smooth navigation

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository
2. Open two terminals
3. In one terminal change directory to the back and install dependencies

```
cd back
npm i
```
3. In the other terminal change directory to the front and install dependencies
```
cd front
npm i
```

## Environment Variables

The environment variables are in the repository as per the instructions, but here are the steps to set them up:

1. Create a `.env.local` file in the front directory with the following variables:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/countries
```
2. Create a `.env` file in the back directory with the following variables:

```
API_DATE="https://date.nager.at/api/v3"
API_SPACE="https://countriesnow.space/api/v0.1"
PORT=5000
```


## Running the Application

Run both the frontend and backend separately:

front:
```bash
npm run dev
```

back:
```bash
npm start
```

The frontend will be available at `http://localhost:3000`
The backend will be available at `http://localhost:5000`

