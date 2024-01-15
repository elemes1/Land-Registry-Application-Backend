const { Contract } = require('@hyperledger/fabric-gateway');

async function createLandRecord(contract, args) {
    // Logic to create a land record
    console.log(args)
    const result = await contract.submitTransaction('CreateLandRecord', ...args);
    if(result){
        return {
            'success' : true,
            'message': '*** Transaction committed successfully *** new land record created successfully'
        };
    }
    return {
        'success': false,
        'message':  result.toString()
    };


}

module.exports = { createLandRecord };
