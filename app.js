var PORT = process.env.PORT || 3001; // Sets an initial port. We'll use this later in our listener
// ensure environment variables are loaded
import App from './server';
import SocketIO from './socketio';

// Requiring our models for syncing
import db from './server/models';

const app = App(__dirname);

const server = require('http').Server(app);
const io = SocketIO(server)

//use sync({force:true}) to drop all tables before trying to create
db.sequelize.sync().then(function() {
  server.listen(PORT, function() {
    console.log('App listening on PORT: ' + PORT);
  });

  db.User.create({
    id: 1,
    userName: 'name',
    userPassword: 'pass',
    active: true,
  })
    .then(User => {
  
      db.Card.create({
        seed: 'Danny.',
        soil: 'That guy that i met on the plane today.',
        active: true,
        shownCount: 0,
        lastShown: new Date(),
        notified: false,
        UserId: 1,
      })
  
    })
    .catch(err => {});
});

