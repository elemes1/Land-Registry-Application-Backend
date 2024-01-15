const { Contract } = require('@hyperledger/fabric-gateway');

const utf8Decoder = new TextDecoder();

async function sellLandRecords(contract, args) {
    console.log('\n--> Submit Transaction: TransferLand, transfers land ownership');
    const commit = await contract.submitAsync('SellLand', {
        arguments: args,
    });
    const oldOwner = utf8Decoder.decode(commit.getResult());
    console.log(`*** Successfully submitted transaction to sell property from ${oldOwner} to Joe Zoe`);
    console.log('*** Waiting for transaction commit');
    const status = await commit.getStatus();
    if (!status.successful) {
        throw new Error(`Transaction ${status.transactionId} failed to commit with status code ${status.code}`);
    }
    return {
        'success': '*** Transaction committed successfully *** Land sold successfully'
    };
}

module.exports = { sellLandRecords };
