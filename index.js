const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express();


async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb://localhost/node_auth');
        console.log('Connected to the database');
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

connectToDatabase(); 

const routes = require('./routes/routes')

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    credentials: true, 
    origin : ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200']
}))

app.use('/api', routes)

app.listen(8000)
