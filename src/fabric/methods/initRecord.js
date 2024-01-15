const { Contract } = require('@hyperledger/fabric-gateway');

const utf8Decoder = new TextDecoder();

async function initRecord(contract, records) {
    console.log('\n--> Submit Transaction: Init Record');


    for (const record of records) {
        const args = [JSON.stringify(record)];
        console.log(`--> Submitting Record: ${args}`);

        const commit = await contract.submitAsync('InitLedger', {
            arguments: args,
        });

        const status = await commit.getStatus();
        if (!status.successful) {
            throw new Error(`Transaction ${status.transactionId} failed to commit with status code ${status.code}`);
        } else {
            console.log(`*** Transaction ${status.transactionId} committed successfully`);
        }
    }

    return {
        'success': '*** Transaction committed successfully *** Record initialized'
    };

}

module.exports = { initRecord };
