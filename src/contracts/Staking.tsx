import {
  SmartContract,
  Address,
  ProxyProvider,
  Transaction,
  IDappProvider,
  WalletProvider,
  HWProvider,
  ContractFunction,
  Argument,
  Account
} from "@elrondnetwork/erdjs";

// import {
//   AbiRegistry,
//   Namespace
// } from "@elrondnetwork/erdjs/out/smartcontracts/typesystem";
import { BinaryCodec } from "@elrondnetwork/erdjs/out/smartcontracts/codec";
import { toast } from "react-toastify";
import { setItem } from "../storage/session";
// import abi from "./abi";
import addresses from "./addresses";

interface UserActiveStake {
  isActive: boolean;
  stakeAmount?: number;
}
interface UserData {
  balance: string;
}
export class Staking {
  contract: SmartContract;
  proxyProvider: ProxyProvider;
  signerProvider?: IDappProvider;
  userAccount: Account;
  userAddress: Address;
  codec = new BinaryCodec();

  constructor(wallet: string, provider: ProxyProvider, signer?: IDappProvider) {
    const address = new Address(addresses["stakingSC"]);
    this.contract = new SmartContract({ address });
    this.userAddress = new Address(wallet);
    this.userAccount = new Account(this.userAddress);
    this.proxyProvider = provider;
    this.signerProvider = signer;
  }

  public async getUserActiveStake(): Promise<UserActiveStake> {
    try {
      let response = await this.contract.runQuery(this.proxyProvider, {
        func: new ContractFunction("getUserActiveStake"),
        args: [Argument.fromPubkey(this.userAddress)]
      });
      if (response.isSuccess()) {
        return {
          isActive: true,
          stakeAmount: response.returnData[0].asNumber
        };
      } else {
        toast.error(
          "Elrond API is not working please come back! FUND ARE SAFU"
        );
        return {
          isActive: false
        };
      }
    } catch (error) {
      return {
        isActive: false
      };
    }
  }

  public async getClaimableRewards(): Promise<any> {
    try {
      let response = await this.contract.runQuery(this.proxyProvider, {
        func: new ContractFunction("getClaimableRewards"),
        args: [Argument.fromPubkey(this.userAddress)]
      });
      if (response.isSuccess()) {
        if (response.returnData[0]) {
          return {
            rewardAmount: response.returnData[0].asNumber
          };
        }
      } else {
        toast.error(
          "Elrond API is not working please come back! FUND ARE SAFU"
        );
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  public async getContractConfig(): Promise<any> {
    try {
      let response = await this.contract.runQuery(this.proxyProvider, {
        func: new ContractFunction("getTotalActiveStake"),
        args: []
      });
      console.log(response);
    } catch (error) {
      toast.error(error.message);
    }
  }
  public async getUserData(): Promise<UserData> {
    await this.userAccount.sync(this.proxyProvider);
    return {
      balance: this.userAccount.balance.toString()
    };
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
        toast.warn("Invalid signerProvider");
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
