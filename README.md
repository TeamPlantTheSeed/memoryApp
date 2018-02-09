# 
# Plant The Seed 

The Ultimate Memory Learning Tool - now you can commit anything from short term to long term memory with the scientifically proven methods of repetition and retention. The App will allow you to create flash cards and send you notifications in a very  specific amount of time to make it as a game giving you feeling that you are growing up a flower from a seed to a blossom.

*Check it out on Heroku* :  https://planttheseed.herokuapp.com/

**Technologies used:**
* React
* Socket.io
* JavaScript
* Node.js
* Express
* Seguelize
* Bootstrap

The first you will see is a welcome page inviting you to LogIn and explaining mail purpose of the App:

![HomePage](/client/public/images/homepage1.png)
![HomePage](/client/public/images/homepage2.png)
![HomePage](/client/public/images/homepage3.png)







Once you Loged In you can create a new Card:


![Create a Card](./client/public/images/createNewCard.png)






Once Card has been created the scheduler starts working: it will send you PopUp Notifications in a specific amount of time even if you switched the tab. First two times notifications will show you both: the question (the Soil) and the answer (the Seed). For the third time the notification will ask for an action (you have to type the right answer):


![popUps](/client/public/images/popUps.png)







In tab "YOUR SEEDS" you can see all Card that needs actions (you can type answer or dismiss). By the picture of plant on right side of the Card you may see your progress:


![yourSeeds](/client/public/images/yourSeeds.png)






In tab "REMINDERS" shown all Cards that have been shsheduled for Notifications in future (timer shows how much time left untill the next notification):


![reminders](/client/public/images/reminders.png)






In tab "ARHIVE" you can see all Cards that has been answered correctly and don't scheduled for notifications anymore. Delete them if ou sure that you got it:
![arhive](/client/public/images/Arhive.png)
