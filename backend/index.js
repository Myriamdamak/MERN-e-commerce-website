const express = require("express");
const connectDb = require("./Configs/connectDb");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Load environment variables
dotenv.config();

// Import routes
const userRoute = require("./Routes/userRoute.js");
const dbSeeder = require("./databaseSeeder.js");
const productRoute = require("./Routes/productRoute.js");
const orderRoute = require("./Routes/orderRoute.js");

// Connect to the database
connectDb();

// Define port with a fallback
const port = process.env.PORT ;

// Use routes
app.use("/api/seed", dbSeeder); //  dbseed route path
app.use("/api", userRoute);
app.use("/api", productRoute);
app.use("/api", orderRoute);

app.use("/api/config/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
  });

// Start the server
app.listen(port, (error) => {
    if (error) {
        console.log("Server Failed");
    } else {
        console.log(`Server is running on port ${port}`);
    }
});
