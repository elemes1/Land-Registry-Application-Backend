import { Contract, Gateway } from '@hyperledger/fabric-gateway';
export declare function connectToNetwork(): Promise<{
    contract: Contract;
    gateway: Gateway;
}>;
