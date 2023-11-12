// Import required modules
require('dotenv').config();
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const cors = require('cors');

// Initialize express app
const app = express();

// Set constants
const PASSWORD = process.env.Password;
const MAX_RESULTS = 10;

// Use Helmet for basic security
app.use(helmet());

// Use compression
app.use(compression());

// Enable CORS
app.use(cors());

// Set up rate limiting
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutes
    max: 10000, // limit each IP to 1000 requests per windowMs
});
app.use(limiter);

// Serve static files from 'public' directory
app.use(express.static('public'));

// MongoDB connection string
const uri = process.env.MONGODB_URI;

let client;

async function handleJokeRequest(db, collectionName, req, res) {
    // Parse query parameters
    let result = parseInt(req.query.result) || 1;
    let id = req.query.id;
    let password = req.query.password;

    // Check if result is within allowed limit
    if (result > MAX_RESULTS && (!password || !PASSWORD.includes(password))) {
        res.json({ success: false, error: `Parameter value not allowed. Maximum value for "result" is ${MAX_RESULTS}.` });
        return;
    }

    try {
        let docs;
        // If id is provided, fetch specific document, else fetch random documents
        if (id) {
            // Use ObjectId to match by _id field
            id = new ObjectId(id); // Convert string id to ObjectId
            docs = await db.collection(collectionName).find({ _id: id }).toArray();
        } else {
            docs = await db.collection(collectionName).aggregate([{ $sample: { size: result } }], { allowDiskUse: true }).toArray();
        }

        // Log the query and response status
        // if (process.env.NODE_ENV !== 'production') {
        //     console.log(`Query: ${JSON.stringify(req.query)}`);
        //     console.log(`Response status: ${docs.length > 0 ? 200 : 404}`);
        // }

        res.json({ success: true, jokes: docs });
    } catch (err) {
        // Log the error
        // if (process.env.NODE_ENV !== 'production') {
        //     console.error(err);
        // }
        res.json({ success: false, error: 'Error fetching data from the database' });
    }
}

(async () => {
    try {
        // Connect to MongoDB
        client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');

        // Get reference to 'Jokes' database
        const db = client.db('Jokes');

        // Define '/api/singleliner' route
        app.get('/api/singleliner', async (req, res) => {
            handleJokeRequest(db, 'Singleliner', req, res);
        });

        // Define '/api/jokes' route
        app.get('/api/jokes', async (req, res) => {
            handleJokeRequest(db, 'Jokes', req, res);
        });

        // Define '/api/random' route
        app.get('/api/random', async (_, res) => {
            try {
                // Randomly select a collection
                const collectionName = Math.random() < 0.5 ? 'Singleliner' : 'Jokes';

                // Fetch a random document from the selected collection
                const result = await db.collection(collectionName).aggregate([{ $sample: { size: 1 } }]).toArray();
                res.json({ success: true, joke: result[0] });
            } catch (err) {
                console.error(err);
                res.json({ success: false, error: 'Error fetching data from the database' });
            }
        });

        // Define 404 route
        app.use((_, res, __) => {
            res.status(404).sendFile(path.join(__dirname + '/404.html'));
        });

        // Start the server
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
})();

// Close MongoDB connection on process termination
process.on('SIGINT', () => {
    client.close();
    process.exit();
});

