# 
# Plant The Seed 

The Ultimate Memory Learning Tool - now you can commit anything from short term to long term memory with the scientifically proven methods of repetition and retention. The App allows you to create flash cards and sends you notifications over specific intervals, making it a game by giving you the feeling that you are growing a flower from a seed to a blossom.

#### *Check it out on Heroku* :  https://planttheseed.herokuapp.com/

## Technologies used:
* React
* Socket.io
* JavaScript
* Node.js
* Express
* Sequelize
* Bootstrap


## Instructions:

### To run locally:

* clone the PlantTheSeed repository:
```
git clone https://github.com/TeamPlantTheSeed/memoryApp.git
```

* Install yarn https://yarnpkg.com/en/docs/install or npm https://www.npmjs.com/get-npm?utm_source=house&utm_medium=homepage&utm_campaign=free%20orgs&utm_term=Install%20npm


* Create a .env.local file in the root directory similar to below, but with your database info:
```
DB_HOST=127.0.0.1
DB_USERNAME=root
DB_PASSWORD=ChangeMe123
DB_SCHEMA=example_db
DB_DIALECT=mysql
```
* Run schema.sql simply to create the schema in mysql workbench/command line.  Sequelize will take care of creating tables based on models created in server/models folder.
* Run ```yarn watch``` or ```npm run watch``` for instant update of client/server on changes and use localhost:3000 for any frontend work and localhost:3001 for any backend work.
* Run ```yarn dev``` or ```npm run dev``` to build and run the built files locally.  Use localhost:3001 for both frontend and backend.  This is more similar to what would be deployed on prod.
* Run ```yarn prod``` or ```npm run prod``` to build and run the built files locally.  Use localhost:3001 for both frontend and backend.  This is what would be deployed on prod.
* Run ```yarn prod-build``` or ```npm run prod-build``` to build files for prod.  On prod server only files that need to be deployed are the build folder files.  The server just needs to run ```node app.js``` from the build folder to run.







The first screen you will see is a welcome page which explains the main purpose of the App and invites you to log in:

![HomePage](/client/public/images/homepage1.png)

![HomePage](/client/public/images/homepage2.png)


Once you are logged in you can create a new card:


![Create a Card](./client/public/images/createNewCard.png)






Once a card has been created the scheduler starts working: it will send you pop-up notifications in a specific amount of time, even if you leave the browser tab. The first two notifications show you both the question (the Soil) and the answer (the Seed). The third notification asks for an action (you have to type the right answer):


![popUps](/client/public/images/popUps.png)







In the "YOUR SEEDS" tab, you can see all cards that need actions (you can type the answer or dismiss the card). Your progress is shown next to the picture of the plant on the right side of the card: 


![yourSeeds](/client/public/images/yourSeeds.png)






In the "REMINDERS" tab, you can see all cards that are scheduled for future notifications. (The timer shows how much time is left until the next notification):


![reminders](/client/public/images/reminders.png)






In the "ARCHIVE" tab, you can see all cards that have been answered correctly and are not scheduled for notifications. You may delete a card if you are sure that you have committed it to long term memory:

![arhive](/client/public/images/Arhive.png)
