import * as crypto from 'crypto';
import { promises as fs } from 'fs';
import { signers } from '@hyperledger/fabric-gateway';
import * as path from 'path';
export async function newSigner(keyDirectoryPath) {
    const files = await fs.readdir(keyDirectoryPath);
    const keyPath = path.resolve(keyDirectoryPath, files[0]);
    const privateKeyPem = await fs.readFile(keyPath);
    const privateKey = crypto.createPrivateKey(privateKeyPem);
    return signers.newPrivateKeySigner(privateKey);
}
//# sourceMappingURL=signer.js.map