const router = require('express').Router();
const { gernerateShortUrl, getOriginalUrl, getUrlStats } = require('../controller/urlController');


// Route to generate a short URL
router.post('/shorten', gernerateShortUrl);
// Route to retrieve the original URL from a short URL
router.get('/:shortUrl', getOriginalUrl);
// Route to retrieve stats for a short URL
router.get('/stats/:shortUrl', getUrlStats);

module.exports = router;