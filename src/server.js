const express = require('express');
const { getAllLands } = require('./fabric/methods/getAllLands');
const { connectToNetwork } = require('./fabric/utils/network');
const { createLandRecord } = require('./fabric/methods/createLandRecord');
const { initRecord } = require('./fabric/methods/initRecord');
const { readLandRecord } = require('./fabric/methods/readLandRecord');
const { sellLandRecords } = require('./fabric/methods/sellLandRecord');
const { transferLand } = require('./fabric/methods/transferLand');
const https = require('https');
const http = require('http');
const fs = require('fs');
const cors = require('cors');
const axios = require('axios');
const stringify = require('json-stringify-deterministic');
const sortKeysRecursive = require('sort-keys-recursive');


const app = express();
app.use(cors());
app.use(express.json());


// Endpoint to create a land record
app.post('/api/land/create', async (req, res) => {
    try {
        console.log(req.body.args)
        const { contract, gateway } = await connectToNetwork();
        const result = await createLandRecord(contract, req.body.args);
        res.json({ result });
        gateway.close();
    } catch (error) {
        console.error('Error creating land record:', error);
        res.status(500).send('Error creating land record');
    }
});

// Endpoint to initialize a record
app.post('/api/land/init', async (req, res) => {
    try {
        const { contract, gateway } = await connectToNetwork();
        const url = 'https://raw.githubusercontent.com/elemes1/DLT_LAND_DATA/main/missing%20data.json';
        const response = await axios.get(url);
        // console.log(response.data); // This will log the content of the Gist file
        const result = await initRecord(contract, response.data);
        res.json(result);
        gateway.close();
    } catch (error) {
        console.error('Error initializing record:', error);
        res.status(500).send('Error initializing record');
    }
});

// Endpoint to read a land record
app.get('/api/land/fetch', async (req, res) => {
    try {
        console.log(1, 'hi', req.query.id)
        const { contract, gateway } = await connectToNetwork();
        const result = await readLandRecord(contract, req.query.id);
        res.json(result);
        gateway.close();
    } catch (error) {
        console.error('Error reading land record:', error);
        res.status(500).send('Error reading land record');
    }
});

// Endpoint to sell land records
app.post('/api/land/sell', async (req, res) => {
    try {
        const { contract, gateway } = await connectToNetwork();
        const result = await sellLandRecords(contract, req.body.args);
        res.json(result);
        gateway.close();
    } catch (error) {
        console.error('Error selling land record:', error);
        res.status(500).send('Error selling land record');
    }
});

// Endpoint to transfer land ownership
app.post('/api/land/transfer', async (req, res) => {
    try {
        const { contract, gateway } = await connectToNetwork();
        const result = await transferLand(contract, req.body.args);
        res.json(result);
        gateway.close();
    } catch (error) {
        console.error('Error transferring land:', error);
        res.status(500).send('Error transferring land');
    }
});

// Endpoint to get all land records
app.get('/api/lands', async (req, res) => {
    try {
        console.log(req.query.filter)
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        const bookmark = req.query.bookmark || '';
        let filterParams = req.query.filter || {};
        if (typeof filterParams === 'string') {
            filterParams = stringify(sortKeysRecursive(JSON.parse(filterParams)));
        }
        const { contract, gateway } = await connectToNetwork();
        console.log('pageSize (type):', typeof pageSize, ' Value:', pageSize);
        console.log('bookmark (type):', typeof bookmark, ' Value:', bookmark);
        console.log('filterParams (type):', typeof filterParams, ' Value:', filterParams);

        const lands = await getAllLands(contract,pageSize,bookmark,filterParams);
        res.json({ lands });
        gateway.close();
    } catch (error) {
        console.error('Failed to fetch lands:', error);
        res.status(500).send('Failed to fetch lands');
    }
});


const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const privateKey = fs.readFileSync('/etc/letsencrypt/live/transactsphere.xyz/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/transactsphere.xyz/fullchain.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate };

const httpServer = http.createServer(app.handle.bind(app));
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(PORT, () => {
    console.log(`Server running on https://localhost:${PORT}`);
});
httpServer.listen(8081, () => {
    console.log(`Server running on https://localhost:8081`);
});
