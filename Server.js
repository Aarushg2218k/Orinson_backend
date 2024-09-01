const express = require('express');
const mongoose = require('mongoose');
const dburl = require('./Dbconfig/config'); // Ensure this exports the correct database URL
const users = require('./router/UserRouter');
const dotenv = require('dotenv');
const cors = require('cors');

// Initialize the app
const app = express();

// Load environment variables
dotenv.config();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Connect to the database
const server = dburl;
mongoose.connect(server, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Database Connected ! ! !');
}).catch((err) => {
    console.log(err);
});

// Define routes
app.use('/user', users);

// Start the server
app.listen(1996, function () {
    console.log('Server Started ! ! !');
});
