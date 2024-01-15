const { Contract } = require('@hyperledger/fabric-gateway');

const utf8Decoder = new TextDecoder();

async function readLandRecord(contract, arg) {
    console.log('\n--> Evaluate Transaction: ReadLandRecord, returns updated land attributes');
    const resultBytes = await contract.evaluateTransaction('ReadLandRecord', arg);
    const resultJson = utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    console.log('*** Result:', result);
    return result;
}

module.exports = { readLandRecord };
