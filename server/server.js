const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();
connectDB();

const userRoutes = require('./routes/userRoutes');
const scanRoutes = require('./routes/scanRoutes');
const aiFeedbackRoute = require('./routes/aiFeedbackRoute'); // ✅ New route

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/scans', scanRoutes);
app.use('/api', aiFeedbackRoute); // ✅ Register new route

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
