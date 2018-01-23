import openSocket from 'socket.io-client';

const socket = openSocket(window.location.origin);

function subscribeForNotifications(userID, cb) {
  socket.on('cardNotification', card => cb(null, card));
  socket.emit('subscribeForNotifications', userID);
}

function unsubscribeFromNotifications(userID, cb) {
  socket.off('cardNotification', cb);
  socket.emit('unsubscribeFromNotifications', userID);
}

function reactOnCard(card, answer) {
  socket.emit('answer', card, answer);
}

export {
  subscribeForNotifications,
  unsubscribeFromNotifications,
  reactOnCard,
}
