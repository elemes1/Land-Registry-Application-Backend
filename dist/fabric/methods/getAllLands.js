const utf8Decoder = new TextDecoder();
export async function getAllLands(contract) {
    console.log('\n--> Evaluate Transaction: GetAllAssets, function returns all the current assets on the ledger');
    const resultBytes = await contract.evaluateTransaction('GetAllLands');
    const resultJson = utf8Decoder.decode(resultBytes);
    return JSON.parse(resultJson);
}
//# sourceMappingURL=getAllLands.js.map