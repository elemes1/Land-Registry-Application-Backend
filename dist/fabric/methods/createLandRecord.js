export async function createLandRecord(contract, args) {
    // Logic to create a land record
    const result = await contract.submitTransaction('CreateLandRecord', ...args);
    return result.toString();
}
//# sourceMappingURL=createLandRecord.js.map