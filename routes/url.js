const express = require('express');

const router = express.Router();
const { handleGenerateNewShortUrl, handleRedirectFromShortUrl, handleGetShortUrlAnalytics } = require('../controllers/url');

router.post('/',handleGenerateNewShortUrl);
router.get('/:shortId',handleRedirectFromShortUrl);
router.get('/analytics/:shortId',handleGetShortUrlAnalytics);

module.exports = router
