const express = require("express");
const connectDB = require("./db");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require('cors');

// Routes
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const customerRouter = require("./routes/customerRoute");
const purchaseRouter = require("./routes/purchaseRoute");
const reviewRouter = require("./routes/reviewRoute");
// Middleware
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
connectDB()

const app = express();
// Increase the limit for JSON and URL-encoded data
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(cors({
  origin: ['http://localhost:3000'] // Replace this with the origin you want to allow
}));

app.get("/", (req, res) => {
    res.send('API is running');
});

// Routes
app.use('/api/user', userRouter);
app.use('/api/customer', customerRouter);
app.use('/api/products', productRouter);
app.use('/api/purchase', purchaseRouter);
app.use('/api/review', reviewRouter);
// Error
app.use(notFound)
app.use(errorHandler)


// Set the listening port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
