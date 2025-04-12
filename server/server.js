const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors')
dotenv.config();
connectDB();

const userRoutes = require('./routes/userRoutes');
const scanRoutes = require('./routes/scanRoutes');

const app = express();
//new routes 
app.use(cors())
app.use(express.json()); 

app.use('/api/users', userRoutes);
app.use('/api/scans', scanRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
