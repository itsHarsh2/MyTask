import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import authRouter from "./routes/authController.js"
import taskRoutes from "./routes/taskRoutes.js"

// Google OAuth imports
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from 'express-session';
import jwt from 'jsonwebtoken';
import User from './models/users.js'; // Adjust path as needed

dotenv.config();

const app = express();

//middleware
app.use(cors({
  origin: 'http://localhost:5173', // Updated for Vite
  credentials: true
}));
app.use(express.json());//parse json request bodies

// Session middleware for passport
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true in production with HTTPS
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

//connect to db 
connectDb();

// Google Strategy Configuration
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user already exists with this Google ID
    let existingUser = await User.findOne({ googleId: profile.id });
    
    if (existingUser) {
      return done(null, existingUser);
    }
    
    // Check if user exists with same email (link accounts)
    let existingEmailUser = await User.findOne({ email: profile.emails[0].value });
    
    if (existingEmailUser) {
      // Link Google account to existing email account
      existingEmailUser.googleId = profile.id;
      existingEmailUser.avatar = profile.photos[0].value;
      existingEmailUser.authProvider = 'google';
      await existingEmailUser.save();
      return done(null, existingEmailUser);
    }
    
    // Create new user
    const newUser = new User({
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      avatar: profile.photos[0].value,
      authProvider: 'google'
      // No password needed for Google users
    });
    
    await newUser.save();
    done(null, newUser);
  } catch (error) {
    console.error('Google OAuth error:', error);
    done(error, null);
  }
}));

// Passport serialize/deserialize
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google Auth Routes
app.get('/auth/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login' }),
  (req, res) => {
    // Generate JWT token (same as your existing logic)
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
    
    // Redirect to frontend with token (Updated for Vite port)
    res.redirect(`http://localhost:5173/auth/success?token=${token}`);
  }
);

//routes
app.use('/api/tasks',taskRoutes)
app.use('/api/auth',authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));