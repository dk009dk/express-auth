require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI;

const app = express();
app.use(cors());
app.use(express.json());

const routes = require('./routes/v1/routes');
app.use('/api/v1', routes);

mongoose.connect(mongoURI, 
    { useNewUrlParser: true,
     useUnifiedTopology: true, 
     useUnifiedTopology: true 
    })
    .then(() => {
        console.log('Connected to MongoDB');
        // Start server
        app.listen(PORT);
        console.log("Server is listening on port 3000");
    })
    .catch(err => {
        console.log(err);
    });

