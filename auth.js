const express = require('express');
const router = express.Router();
const { registerUser } = require('../components/auth_component');

// GET /auth/register — show registration form
router.get('/register', (req, res) => {
    res.render('register', { error: null });
});

// POST /auth/register — handle form submission
router.post('/register', (req, res) => {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
        return res.render('register', { error: 'All fields are required!' });
    }

    const result = registerUser(email, name, password);

    if (result.success) {
        res.render('register_success');
    } else {
        res.render('register', { error: result.message });
    }
});

module.exports = router;
const { authenticateUser } = require('../components/auth_component');

// GET /auth/login — show login form
router.get('/login', (req, res) => {
    res.render('login', { error: null });
});

// POST /auth/login — handle login submission
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.render('login', { error: 'Both email and password are required!' });
    }

    const result = authenticateUser(email, password);

    if (result.success) {
        // Create session
        req.session.user = {
            email: result.user.email,
            name: result.user.name
        };
        res.redirect('/video/dashboard/all');
    } else {
        res.render('login', { error: 'Incorrect email or password.' });
    }
});


