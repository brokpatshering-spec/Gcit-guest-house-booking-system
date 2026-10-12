
// const express = require('express');


// const app = express();


// module.exports = app;
const express = require('express');


const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());


const authRoutes = require('./routes/AuthRoutes');
app.use('/api/auth', authRoutes);


module.exports = app;
