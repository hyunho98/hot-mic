# hot-mic

Sometimes a performer is excellent on any and every stage. Sometimes they end up being a one hit wonder. Hot Mic is an open forum for people to review and discuss not just performers but their performances as well. Hot Mic is built on three models on the backend with a reciprocal many-to-many relationship (reviews) as well as two models built on has-many-through relationships

## Features
- Create an account with a secure password
- Log in / log out as a user
- Stay logged in if you refresh the page
- Create an event to be reviewed by yourself or other users
- View reviews that have been created by other users
- Edit reviews that have been created by you
- Delete any reviews, completely wiping them from the database
- View all posted events and see from a glance how many reviews have been posted for each event
- View and manage your reviews in one place

## Installation

Fork and clone this repository, navigate to the directory that contains this program in your terminal then install the dependencies and migrate the database using

```bash
npm install --prefix client
```

```bash
rails db:migrate
```

## Usage

Open the directory containing this program in two different terminals

One of the terminals will be used to run the backend

```bash
rails s
```

While the other will be used to run the frontend

```bash
npm start --prefix client
```

In a web browser, navigate to the local host using the http address shown in the front end terminal
(http://localhost:4000 by default)

Enjoy!