import {
  SmartContract,
  Address,
  ProxyProvider,
  ContractFunction,
  Transaction,
  TransactionPayload,
  Balance,
  GasLimit,
  IDappProvider,
  WalletProvider,
  HWProvider
} from "@elrondnetwork/erdjs";
import {
  AbiRegistry,
  Namespace,
  TypeDescriptor,
  U8Type,
  Vector
} from "@elrondnetwork/erdjs/out/smartcontracts/typesystem";
import { BinaryCodec } from "@elrondnetwork/erdjs/out/smartcontracts/codec";
import { setItem } from "../storage/session";
import abi from "./abi";
import addresses from "./addresses";
import { toast } from "react-toastify";

export class Lottery {
  contract: SmartContract;
  proxyProvider: ProxyProvider;
  signerProvider?: IDappProvider;
  abi: AbiRegistry;
  namespace: Namespace;
  codec = new BinaryCodec();

  constructor(provider: ProxyProvider, signer?: IDappProvider) {
    const address = new Address(addresses["lottery"]);
    this.contract = new SmartContract({ address });
    this.proxyProvider = provider;
    this.signerProvider = signer;
    this.abi = new AbiRegistry();
    this.abi.extend(abi);
    this.namespace = this.abi.findNamespace("lottery-egld");
  }

  async sendFunds(): Promise<boolean> {
    if (!this.signerProvider) {
      throw new Error(
        "You need a singer to send a transaction, use either WalletProvider or LedgerProvider"
      );
    }

    switch (this.signerProvider.constructor) {
      case WalletProvider:
        return this.sendFundsWalletProvider();
      case HWProvider:
        return this.sendFundsHWProvider();
      default:
        toast.warn("Invalid signerProvider");
    }

    return true;
  }

  async getAllLotteries(): Promise<boolean> {
    const response = await this.contract.runQuery(this.proxyProvider, {
      func: new ContractFunction("allLotteries")
    });

    let decodedResult = this.codec.decodeTopLevel<Vector>(
      response.buffers()[0],
      TypeDescriptor.createFromTypeNames(["Vector", "Vector", "U8"])
    );
    decodedResult.valueOf().forEach(lotteryName => {
      let arr = lotteryName.map((element: U8Type) => {
        return Number(element.toString());
      });
      console.log(Buffer.from(arr).toString());
    });

    return true;
  }

  private async sendFundsWalletProvider(): Promise<boolean> {
    const func = new ContractFunction("fund");
    let payload = TransactionPayload.contractCall()
      .setFunction(func)
      .build();

    let transaction = new Transaction({
      receiver: this.contract.getAddress(),
      value: new Balance(BigInt(3)),
      gasLimit: new GasLimit(10000000),
      data: payload
    });

    // Can use something like this to handle callback redirect
    setItem("transaction_identifier", true, 120);
    // @ts-ignore
    await this.signerProvider.sendTransaction(transaction);

    return true;
  }

  private async sendFundsHWProvider(): Promise<boolean> {
    const func = new ContractFunction("fund");
    let payload = TransactionPayload.contractCall()
      .setFunction(func)
      .build();

    let transaction = new Transaction({
      receiver: this.contract.getAddress(),
      value: new Balance(BigInt(3)),
      gasLimit: new GasLimit(10000000),
      data: payload
    });

    // @ts-ignore
    await this.signerProvider.sendTransaction(transaction);

    return true;
  }
}
