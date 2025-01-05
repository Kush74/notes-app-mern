const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const noteRoutes = require('./routes/noteRoutes');
require('dotenv').config();

const app = express();

const mongo_url = process.env.MONGO_CONNECTION_URL;
mongoose.connect(mongo_url).then(() => {
    console.log('connected to db');
    
}).catch(err => {
    console.error("Error in Db connection",err);
})

app.use(bodyParser.json());
app.use(cors())

app.use('/api/note', noteRoutes)





app.listen(4000, () => {
    console.log("listning on port 4000", mongo_url);
})
