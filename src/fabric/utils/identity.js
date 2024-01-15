const fs = require('fs').promises;
const { Identity } = require('@hyperledger/fabric-gateway');

async function newIdentity(mspId, certPath) {
    const credentials = await fs.readFile(certPath);
    return { mspId, credentials };
}

module.exports = { newIdentity };
