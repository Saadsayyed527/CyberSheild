You are assisting me in building a project named "CyberShield" that involves creating a vulnerability scanner for websites using the MERN stack (MongoDB, Express, React, Node.js) with a focus on cybersecurity. Below are the key details about the project:

### Project Overview
1. The application allows users to input a website URL, and it analyzes the website for vulnerabilities.
2. Users do not need to register or log in; they directly provide the URL and initiate a scan.
3. The backend is built with Node.js, Express, and MongoDB.
4. The primary functionality includes:
   - Validating user-provided URLs.
   - Running basic vulnerability scans (e.g., checking HTTPS, headers like X-Frame-Options, and response time).
   - Generating a detailed report and storing it in the database.
   - Retrieving stored scan reports by their unique ID.

### Folder Structure for Backend
- `server.js`: Entry point for the backend server.
- `app.js`: Configures middleware and routes.
- `config/`
  - `db.js`: Handles MongoDB connection.
- `controllers/`
  - `scanController.js`: Contains logic for initiating scans and fetching reports.
- `routes/`
  - `scanRoutes.js`: Defines routes for starting a scan and retrieving reports.
- `middlewares/`
  - `errorMiddleware.js`: Handles global error responses.
  - `validateURL.js`: Validates the URL input by users.
- `models/`
  - `scanModel.js`: Defines the Mongoose schema for storing scan results.

### Backend Functionality
1. **Route to Start a Scan**
   - URL: `POST /api/scans/start`
   - Middleware: `validateURL` ensures the provided URL is valid.
   - Controller: Stores the scan data in MongoDB after generating a report.

2. **Route to Get a Scan Report**
   - URL: `GET /api/scans/:id`
   - Middleware: Optional ID validation middleware (`validateId.js`).
   - Controller: Fetches the report by ID and returns a detailed response.

3. **Error Handling**
   - A global `errorHandler` middleware ensures consistent error responses.

### Example Code
#### `db.js` (MongoDB Connection)
```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
