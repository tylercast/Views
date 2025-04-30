const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const videoRoutes = require('./routes/video');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'resources')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'Views'));

app.use(session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: false
}));

// Routes
app.use('/auth', authRoutes);
app.use('/video', videoRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
