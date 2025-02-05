const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 2000;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const courseContentRoutes = require('./routes/courseContentRoutes');
const contentCompletionRoutes = require('./routes/contentCompletion');
const bookmarkRoutes = require('./routes/bookmarkRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

app.use('/api', authRoutes);
app.use('/api', courseRoutes);
app.use('/api', categoryRoutes);
app.use('/api', announcementRoutes);
app.use('/api', courseContentRoutes);
app.use('/api', contentCompletionRoutes);
app.use('/api', bookmarkRoutes);
app.use('/api', feedbackRoutes);

app.listen(port, () => {
    console.log("Server is running on port " + port);
});
