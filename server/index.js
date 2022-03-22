const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');

const session = require('express-session');
const passport = require('passport');
const path = require('path');

// // Only for session authentication
// const MongoDBStore = require('connect-mongodb-session')(session);
// const store = new MongoDBStore({
//   uri: config.DB_URI,
//   collection: 'meetuperSessions'
// })

// store.on('error', (error) => console.log(error))

require("./models/meetups");
require("./models/users");
require("./models/threads");
require("./models/posts");
require("./models/categories");

require("./services/passport");

const meetupsRoutes = require('./routes/meetups'),
  usersRoutes = require('./routes/users'),
  threadsRoutes = require('./routes/threads'),
  postsRoutes = require('./routes/posts'),
  categoriesRoutes = require('./routes/categories'),
  apiRoutes = require('./routes/api');

mongoose.connect(config.DB_URI, { useNewUrlParser: true })
  .then(() => console.log('DB Connected!'))
  .catch(err => console.log(err));

const app = express();

const server = require('http').createServer(app)
const io = require("socket.io")(server, { // fixed se nuk lejke pa keto
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"]
  }
});

require('./socket')(io)



app.use(bodyParser.json());



// app.use(session({ secret: config.SESSION_SECRET,
//                   cookie: { maxAge: 3600000 },
//                   resave: false,
//                   saveUninitialized: false,
//                   store
//                 }))

// app.use(passport.initialize());
// app.use(passport.session());


// app.use('/api/v1', apiRoutes);
app.use('/api/v1/meetups', meetupsRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/posts', postsRoutes);
app.use('/api/v1/threads', threadsRoutes);
app.use('/api/v1/categories', categoriesRoutes);

// if (process.env.NODE_ENV === 'production') { // if we are on production
  const appPath = path.join(__dirname, '..', 'dist'); // get path outside to dist
  app.use(express.static(appPath)); // static files are on that app

  app.get('*', function(req, res) { // get all routes
    res.sendFile(path.resolve(appPath, 'index.html'));
  });
//}

const PORT = process.env.PORT || 3001;

server.listen(PORT, function () {
  console.log('App is running on port: ' + PORT);
});


