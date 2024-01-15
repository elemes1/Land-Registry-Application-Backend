import { promises as fs } from 'fs';
export async function newIdentity(mspId, certPath) {
    const credentials = await fs.readFile(certPath);
    return { mspId, credentials };
}
//# sourceMappingURL=identity.js.map