const express = require('express');
const passport = require('passport');
const session =require("express-session")
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoute');
const userRoutes=require("./routes/userRoute")
const slackRouter = require('./routes/slackRoute'); 


const cors=require('cors')
const mongoose=require("mongoose")
require('./services/passport');

dotenv.config();

const app = express();


app.use(bodyParser.json());


app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'], 
  credentials: true 
}));


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));



app.use(session({
  secret: process.env.SESSION_COOKIE_KEY,
  resave: false,
  saveUninitialized: true
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/user',userRoutes);
app.use('/slack', slackRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
