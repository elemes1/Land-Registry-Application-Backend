import * as grpc from '@grpc/grpc-js';
import { promises as fs } from 'fs';
export async function newGrpcConnection(tlsCertPath, peerEndpoint, peerHostAlias) {
    const tlsRootCert = await fs.readFile(tlsCertPath);
    const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
    return new grpc.Client(peerEndpoint, tlsCredentials, {
        'grpc.ssl_target_name_override': peerHostAlias,
    });
}
//# sourceMappingURL=grpcConnection.js.map