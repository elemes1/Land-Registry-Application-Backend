const crypto = require('crypto');
const fs = require('fs').promises;
const { Signer, signers } = require('@hyperledger/fabric-gateway');
const path = require('path');

async function newSigner(keyDirectoryPath) {
    const files = await fs.readdir(keyDirectoryPath);
    const keyPath = path.resolve(keyDirectoryPath, files[0]);
    const privateKeyPem = await fs.readFile(keyPath);
    const privateKey = crypto.createPrivateKey(privateKeyPem);
    return signers.newPrivateKeySigner(privateKey);
}

module.exports = { newSigner };
