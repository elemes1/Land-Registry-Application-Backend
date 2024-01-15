import * as grpc from '@grpc/grpc-js';
export declare function newGrpcConnection(tlsCertPath: string, peerEndpoint: string, peerHostAlias: string): Promise<grpc.Client>;
