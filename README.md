# TicketTrack

TicketTrack is a React web application for managing concerts and tracking ticket sales.

The application allows users to add, edit, delete, search, filter, and sort concerts. It also provides ticket sales statistics and displays concert locations on a map using the Geoapify API.

## Features
- View all concerts
- View detailed information about a concert
- Add new concerts
- Edit existing concerts
- Delete concerts
- Search concerts by artist, tour, or location
- Filter concerts by status
- Sort concerts by date or artist
- Track ticket sales and concert capacity
- Display ticket sales progress
- Calculate remaining tickets, revenue, and occupancy
- Automatically mark past concerts as completed
- Display concert locations using the Geoapify API
- Responsive design for desktop, tablet, and mobile devices 

## Technologies
- React
- React Router
- React Hooks
- JavaScript
- SCSS
- Vite
- JSON Server
- Geoapify API

## Prerequisites

Before running the project, make sure you have installed:

- Node.js 20 or newer
- npm

You can check your installed versions with:

- node -v
- npm -v

## Installation
### 1. Clone the repository

Clone the repository and open the project folder:

git clone https://github.com/Spiritus93/TicketTrack

### 2. Install dependencies

Install the required dependencies:

npm install
### 3. Configure the Geoapify API

The application uses the Geoapify API to find coordinates and display concert locations on a static map.

Create a .env local file in the root directory of the project:

VITE_GEOAPIFY_API_KEY=your_api_key_here

An .env.example file is included in the project as an example of the required environment variable.

A Geoapify API key can be obtained by creating a free tier account on Geoapify (https://www.geoapify.com/geocoding-api/).

### 4. Start JSON Server

The application uses JSON Server as a local REST API.

Start JSON Server with:

json-server data/db.json

JSON Server should run on:

http://localhost:3000

The concerts API is available at:

http://localhost:3000/concerts

Keep this terminal running while using the application.

### 5. Start the application

Open another terminal and run:

npm run dev

Open the local address shown by Vite in your browser.

## Application Structure

The application contains the following main pages:

- Home – displays all concerts and provides searching, filtering, and sorting.
- Add Concert – allows the user to create a new concert.
- Concert Details – displays detailed concert information, ticket statistics, and the concert location.
- Edit Concert – allows existing concert information to be updated.

Reusable components are used for common parts of the application, including concert cards, concert statistics, the header, and the footer.

### Concert Status

Concerts can have the status Upcoming or Cancelled.

If the date of a concert has already passed and the concert is not cancelled, the application automatically displays its status as Completed.

### Ticket Statistics

For each concert, TicketTrack displays:

- Number of tickets sold
- Total capacity
- Remaining tickets
- Occupancy percentage
- Estimated revenue

The application also prevents the number of sold tickets from being greater than the concert capacity.

### Geoapify Integration

TicketTrack uses Geoapify to geocode the concert venue and location.

The returned coordinates are used to generate a static map displayed on the Concert Details page.

The API key is stored in an environment variable and is not included directly in the source code.

### Responsive Design

TicketTrack is designed to work on:

- Desktop computers
- Tablets
- Mobile devices

The layout adapts to different screen sizes using SCSS media queries.

### Data

Concert data is stored in db.json and accessed through JSON Server.

The application performs CRUD operations using HTTP requests:

- GET – retrieve concerts
- POST – add a concert
- PUT – update a concert
- DELETE – delete a concert