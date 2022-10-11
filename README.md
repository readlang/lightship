# LightShip - Flatiron School Project

## Description
This app is a goal-tracking and social accountability platform.  With this app, users can set goals, chart a path to reach those goals, and have friends provide feedback, encouragement and accountability.  The goal of the app is to help users stay the course and reach their goals. 
<br/>

## Technologies Used
- React
- React Router
- React Bootstrap
- Styled Components
- Ruby on Rails
- Postgresql
- Heroku

The App is deployed on Heroku and available here: https://lightship.herokuapp.com/

Note: The first visit to the deployed page on Heroku may take several seconds to load due to the "cold-start" on free-tier server.  Up to ~20 seconds is normal.  This is a function of it being hosted from a free-tier server on Heroku, not the app itself.  Load time is less than 1 second on "warm server."  Thank you for your patience!
<br />

## Walkthrough
Upon visiting the site, a user is prompted to log in for sign up.  Once logged in, the app displays a welcome screen with instructions.  A user can define goals, add other users as friends, and create tracks which are the daily or weekly tasks to move towards hitting the goal.  Once these are created, the user can create a group and add friends.  Each of the members of the group will be able to see the other member's track and their progress on this track.  The group members can also chat to offer encouragement or comments to keep everyone moving towards their goals.

## Setup
If you would like to play with this project on your machine, start by **cloning** the project template repository and removing the remote:

```console
$ git clone git@github.com:readlang/lightship.git
$ cd lightship
$ git remote rm origin
```

When you're ready to start playing with the code, run:

```sh
bundle install
rails db:create
npm install --prefix client
```

You can use the following commands to run the application:

- `rails s`: run the backend on [http://localhost:3000](http://localhost:3000)
- `npm start --prefix client`: run the frontend on
  [http://localhost:4000](http://localhost:4000)

<br />

**Thank you for your interest in this project!**
