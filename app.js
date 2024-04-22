require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


const users = {};

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET || 'change_this_secret',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/principal.html'));
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://proyectoweb1-ke9nw.ondigitalocean.app/auth/google/callback",
    passReqToCallback: true 
}, (req, accessToken, refreshToken, params, profile, done) => {
    const idToken = params.id_token; 

    if (!users[profile.id]) {
        users[profile.id] = {
            id: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            tokenId: idToken 
        };
    }
    done(null, users[profile.id]);
}));




passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    done(null, users[id] || null);
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    async (req, res) => {
        console.log('Successful authentication, user:', req.user);
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.user.tokenId,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            console.log('Token verification payload:', payload);
            res.redirect('/html/principal.html');
        } catch (error) {
            console.error('Error verifying token:', error);
            res.redirect('/login');
        }
    }
);



const PORT = process.env.PORT || 3000;
    app.listen(PORT, '0.0.0.0', () =>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
