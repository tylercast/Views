const fs = require('fs');
const path = require('path');

const VIDEOS_DB = path.join(__dirname, '..', 'videos.json');

// Add a new video
function addVideo(title, url, ownerEmail) {
    const videos = JSON.parse(fs.readFileSync(VIDEOS_DB, 'utf-8'));

    const newVideo = { title, url, ownerEmail };
    videos.push(newVideo);

    fs.writeFileSync(VIDEOS_DB, JSON.stringify(videos, null, 2));
}

// Get videos (filter by 'all' or 'mine')
function getVideos(filter, ownerEmail) {
    const videos = JSON.parse(fs.readFileSync(VIDEOS_DB, 'utf-8'));

    if (filter === 'mine') {
        return videos.filter(video => video.ownerEmail === ownerEmail);
    }
    return videos; // all videos
}

module.exports = {
    addVideo,
    getVideos
};
