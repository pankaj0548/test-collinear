require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');
const connectDB = require('./utils/mongoDB');
const app = express();

app.use(express.urlencoded({ extended: true }));
connectDB();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/dataset', dataRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
