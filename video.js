const express = require('express');
const router = express.Router();
const { addVideo, getVideos } = require('../components/video_component');

// Middleware to check if user is logged in
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.render('login', { error: 'You must login to access this content.' });
    }
}

// GET /video/new_video — show form
router.get('/new_video', isAuthenticated, (req, res) => {
    res.render('new_video', { error: null });
});

// POST /video/new — handle submission
router.post('/new', isAuthenticated, (req, res) => {
    const { title, url } = req.body;
    const ownerEmail = req.session.user.email;

    if (!title || !url) {
        return res.render('new_video', { error: 'All fields are required!' });
    }

    addVideo(title, url, ownerEmail);
    res.render('new_video', { error: 'Video added successfully!' });
});

// GET /video/dashboard/:videofilter — show videos
router.get('/dashboard/:videofilter', isAuthenticated, (req, res) => {
    const filter = req.params.videofilter;
    const videos = getVideos(filter, req.session.user.email);

    res.render('dashboard', { videos, name: req.session.user.name });
});

module.exports = router;
