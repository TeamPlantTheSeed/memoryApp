const config = require('../config/scheduler.js')
import card from "../server/controllers/cardsController"

const pollingInterval = config.interval;
const reminders = config.reminders;

const schedulers = {};

export default httpServer => {
    const io = require('socket.io')(httpServer);
    io.on('connection', (client) => {

        client.on('disconnect', () => {
            console.log(`User dropped connection as client ${client}`);
            clearInterval(schedulers[client]);
        })

        client.on('subscribeForNotifications', (userID) => {
            console.log(`User with ID [${userID}] subscribed as client ${client}`);

            const interval = setInterval(() => {
                let since;
                since = new Date(new Date().getTime() + pollingInterval * 1000 - reminders.first * 1000);
                card.nextCardsForUser(userID, 0, since, sendNotification);

                since = new Date(new Date().getTime() + pollingInterval * 1000 - reminders.second * 1000);
                card.nextCardsForUser(userID, 1, since, sendNotification);

                since = new Date(new Date().getTime() + pollingInterval * 1000 - reminders.recurrent * 1000);
                card.nextCardsForUser(userID, { $gte: 2 }, since, sendNotification);
            }, pollingInterval * 1000);

            schedulers[client] = interval;
        });

        client.on('unsubscribeFromNotifications', (userID) => {
            console.log(`User with ID [${userID}] unsubscribed as client ${client}`);
            clearInterval(schedulers[client]);
        })

        // TODO: Only expect card ID, and restore Card object from DB by that ID
        client.on('answer', (aCard, givenAnswer) => {
            card.markedAsShown(aCard.id);            
            if (aCard.shownCount >= 2 && givenAnswer == aCard.seed) {
                // TODO: implement controller method
                card.deactivate(aCard.id);
            }
        });

        const sendNotification = cards => {
            if (cards.length == 0) {
                console.log(`No cards for client ${client}`)
            }

            for (let aCard of cards) {
                let remains = aCard.lastShown - new Date().getTime();
                switch (aCard.shownCount) {
                    case 0:
                        remains += reminders.first * 1000;
                        break;
                    case 1:
                        remains += reminders.second * 1000;
                        break;
                
                    default:
                        remains += reminders.recurrent * 1000;
                        break;
                }
                console.log(`Sending card ${aCard} to client ${client} in ${remains / 1000} sec.`);
                setTimeout(() => {
                    client.emit('cardNotification', aCard);
                    card.markAsNotified(aCard.id);
                }, remains); 
            }
        }

    });
}