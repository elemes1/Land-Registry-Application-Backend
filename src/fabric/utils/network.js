const { connect, Contract, Gateway } = require('@hyperledger/fabric-gateway');
const path = require('path');
const common = require('fabric-common');
const { newGrpcConnection } = require("./grpcConnection");
const { newIdentity } = require("./identity");
const { newSigner } = require("./signer");
const BlockDecoder = common.BlockDecoder;

const channelName = envOrDefault('CHANNEL_NAME', 'mychannel');
const chaincodeName = envOrDefault('CHAINCODE_NAME', 'basic');
const mspId = envOrDefault('MSP_ID', 'Org1MSP');

// const cryptoPath = envOrDefault('CRYPTO_PATH', path.resolve(__dirname, '..', '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com'));
const cryptoPath = '/var/wwww/DLT/land-registry-fabric/test-network/organizations/peerOrganizations/org1.example.com';
const keyDirectoryPath = envOrDefault('KEY_DIRECTORY_PATH', path.resolve(cryptoPath, 'users', 'User1@org1.example.com', 'msp', 'keystore'));
const certPath = envOrDefault('CERT_PATH', path.resolve(cryptoPath, 'users', 'User1@org1.example.com', 'msp', 'signcerts', 'User1@org1.example.com-cert.pem'));
const tlsCertPath = envOrDefault('TLS_CERT_PATH', path.resolve(cryptoPath, 'peers', 'peer0.org1.example.com', 'tls', 'ca.crt'));
const peerEndpoint = envOrDefault('PEER_ENDPOINT', 'localhost:7051');
const peerHostAlias = envOrDefault('PEER_HOST_ALIAS', 'peer0.org1.example.com');

async function connectToNetwork() {
    await displayInputParameters();
    const client = await newGrpcConnection(tlsCertPath, peerEndpoint, peerHostAlias);
    const gateway = connect({
        client,
        identity: await newIdentity(mspId, certPath),
        signer: await newSigner(keyDirectoryPath),
        // Default timeouts for different gRPC calls
        evaluateOptions: () => ({ deadline: Date.now() + 5000 }), // 5 seconds
        endorseOptions: () => ({ deadline: Date.now() + 15000 }), // 15 seconds
        submitOptions: () => ({ deadline: Date.now() + 5000 }), // 5 seconds
        commitStatusOptions: () => ({ deadline: Date.now() + 60000 }), // 1 minute
    });
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);
        return { contract, gateway };
}

function envOrDefault(key, defaultValue) {
    return process.env[key] || defaultValue;
}

async function displayInputParameters() {
    console.log(`channelName:       ${channelName}`);
    console.log(`chaincodeName:     ${chaincodeName}`);
    console.log(`mspId:             ${mspId}`);
    console.log(`cryptoPath:        ${cryptoPath}`);
    console.log(`keyDirectoryPath:  ${keyDirectoryPath}`);
    console.log(`certPath:          ${certPath}`);
    console.log(`tlsCertPath:       ${tlsCertPath}`);
    console.log(`peerEndpoint:      ${peerEndpoint}`);
    console.log(`peerHostAlias:     ${peerHostAlias}`);
}

module.exports = { connectToNetwork };
