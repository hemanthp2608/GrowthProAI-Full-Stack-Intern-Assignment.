const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const headlines = [
    "Why {name} is {location}'s Sweetest Spot in 2025",
    "Discover the Magic of {name} in {location}",
    "{name}: Your Go-To Place in {location} for All Things Delightful",
    "Top Reasons to Visit {name} in {location} This Year"
];

function generateHeadline(name, location) {
    const template = headlines[Math.floor(Math.random() * headlines.length)];
    return template.replace('{name}', name).replace('{location}', location);
}

app.post('/business-data', (req, res) => {
    const { name, location } = req.body;
    const response = {
        rating: (Math.random() * 2 + 3).toFixed(1),
        reviews: Math.floor(Math.random() * 500 + 20),
        headline: generateHeadline(name, location)
    };
    res.json(response);
});

app.get('/regenerate-headline', (req, res) => {
    const { name, location } = req.query;
    res.json({ headline: generateHeadline(name, location) });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
