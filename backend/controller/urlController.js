const mongoose = require('mongoose');
const  Url=require('../models/Url');
const shortid = require('shortid');

const gernerateShortUrl = async(req,res) => {
    const {originalUrl} = req.body;
    console.log('Received original URL:', originalUrl);
    const shortUrl = shortid.generate();
    try {
        if(!originalUrl) return res.status(400).json({error: 'Original URL is required'});
        const existingUrl = await Url.findOne({ originalUrl });
        if (existingUrl) {
            return res.status(200).json({ shortUrl: existingUrl.shortUrl });
        }
            const shortUrlEntry = new Url({
            shortUrl,
            originalUrl,
            stats: [{ timestamp: Date.now() }],
        });

        await shortUrlEntry.save();
        res.status(201).json({ shortUrl });
    } catch (error) {
        console.error('Error generating short URL:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getOriginalUrl = async (req, res) => {
    const { shortUrl } = req.params;
    try {
        const urlEntry = await Url.findOne({ shortUrl });
        if (!urlEntry) {
            return res.status(404).json({ error: 'Short URL not found' });
        }
        
        urlEntry.stats.push({ timestamp: Date.now() });
        await urlEntry.save();
        res.redirect(urlEntry.originalUrl);
    } catch (error) {
        console.error('Error retrieving original URL:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const getUrlStats = async (req, res) => {
    const { shortUrl } = req.params;
    try {
        const urlEntry = await Url.findOne({ shortUrl });
        if (!urlEntry) {
            return res.status(404).json({ error: 'Short URL not found' });
        }
        res.status(200).json({ stats: urlEntry.stats, clicks: urlEntry.stats.length });
    } catch (error) {
        console.error('Error retrieving URL stats:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};  

module.exports = {
    gernerateShortUrl,
    getOriginalUrl,
    getUrlStats
};


