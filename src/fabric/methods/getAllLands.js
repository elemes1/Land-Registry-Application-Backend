const { Contract } = require('@hyperledger/fabric-gateway');

const utf8Decoder = new TextDecoder();

async function getAllLands(contract,pageSize,bookmark,filterParams) {

    // Convert pageSize to String
    const pageSizeStr = pageSize.toString();

    const bookmarkStr = bookmark ? bookmark.toString() : '';

    const filterParamsStr = JSON.stringify(filterParams);

    const resultBytes = await contract.evaluateTransaction('GetAllLands', pageSizeStr, bookmarkStr, filterParamsStr);
    const resultJson = utf8Decoder.decode(resultBytes);
    return JSON.parse(resultJson);
}

module.exports = { getAllLands };
