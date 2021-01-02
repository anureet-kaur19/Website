
import {
  SmartContract,
  Address,
  ProxyProvider,
  Transaction,
  IDappProvider,
  WalletProvider,
  HWProvider
} from "@elrondnetwork/erdjs";

import {
  AbiRegistry,
  Namespace
} from "@elrondnetwork/erdjs/out/smartcontracts/typesystem";
import { BinaryCodec } from "@elrondnetwork/erdjs/out/smartcontracts/codec";
import { setItem } from "../storage/session";
import abi from "./abi";
import addresses from "./addresses";

export class Staking {
  contract: SmartContract;
  proxyProvider: ProxyProvider;
  signerProvider?: IDappProvider;
  abi: AbiRegistry;
  namespace: Namespace;
  account: any
  codec = new BinaryCodec();

  constructor(provider: ProxyProvider, signer?: IDappProvider) {
    const address = new Address(addresses["managerSC"]);
    this.contract = new SmartContract({ address });
    this.proxyProvider = provider;
    this.signerProvider = signer;
    this.abi = new AbiRegistry();
    this.abi.extend(abi);
    this.namespace = this.abi.findNamespace("lottery-egld");
  }


  async signTX(tx: Transaction): Promise<boolean> {
    if (!this.signerProvider) {
      throw new Error(
        "You need a singer to send a transaction, use either WalletProvider or LedgerProvider"
      );
    }

    switch (this.signerProvider.constructor) {
      case WalletProvider:
        return this.sendFundsWalletProvider(tx);
      case HWProvider:
        return this.sendFundsHWProvider(tx);
      default:
        console.warn("invalid signerProvider");
    }

    return true;
  }

  private async sendFundsWalletProvider(tx: Transaction): Promise<boolean> {
    // Can use something like this to handle callback redirect
    setItem("transaction_identifier", true, 120);
    // @ts-ignore
    await this.signerProvider.sendTransaction(tx);

    return true;
  }
  private async sendFundsHWProvider(tx: Transaction): Promise<boolean> {
    // @ts-ignore
    await this.signerProvider.sendTransaction(tx);

    return true;
  }
}
