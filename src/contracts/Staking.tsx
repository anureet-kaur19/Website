import {
  ProxyProvider,
  Wallet,
  Contract,
  addressToHexString,
  ContractQueryResultDataType,
  parseQueryResult,
  TransactionReceipt,
  numberToHex,
} from "elrondjs";
import { toast } from "react-toastify";
import { BigVal } from "bigval";
import addresses from "./addresses";

interface UserData {
  balance: string;
}

export class Staking {
  private proxyProvider: ProxyProvider;
  private signerProvider: Wallet;
  private contract: Contract;
  private userWalletBech32: string = "";

  constructor(
    walletSigner?: Wallet,
    provider?: ProxyProvider,
    contract?: Contract
  ) {
    this.signerProvider = walletSigner as Wallet;
    this.proxyProvider = provider as ProxyProvider;
    this.contract = contract as Contract;
  }

  public setWalletSigner(walletSigner: Wallet): void {
    this.signerProvider = walletSigner;
  }

  public setUserAddress(wallet: string): void {
    this.userWalletBech32 = wallet;
  }

  public setProxyProvider(provider: ProxyProvider): void {
    this.proxyProvider = provider;
  }

  public async initContract(): Promise<void> {
    this.contract = await Contract.at(addresses["stakingSC"], {
      provider: this.proxyProvider,
      signer: this.signerProvider,
      sender: this.userWalletBech32,
    });
  }

  public async getUserActiveStake(): Promise<any> {
    try {
      let response = await this.contract.query("getUserActiveStake", [
        addressToHexString(this.userWalletBech32),
      ]);
      const waitingStake = parseQueryResult(response, {
        index: 0,
        type: ContractQueryResultDataType.BIG_INT,
      });
      return {
        isActive: true,
        stakeAmount: waitingStake.toString(),
      };
    } catch (error) {
      return {
        isActive: false,
      };
    }
  }

  public async getUserUnDelegatedList(): Promise<any> {
    try {
      let response = await this.contract.query("getUserUnDelegatedList", [
        addressToHexString(this.userWalletBech32),
      ]);
      const unDelegatedAmount = parseQueryResult(response, {
        index: 0,
        type: ContractQueryResultDataType.BIG_INT,
      });
      return {
        isActive: true,
        unDelegatedAmount: unDelegatedAmount.toString(),
      };
    } catch (error) {
      return {
        unDelegatedAmount: "0",
      };
    }
  }

  public async getUserUnStakedValue(): Promise<any> {
    try {
      let response = await this.contract.query("getUserUnStakedValue", [
        addressToHexString(this.userWalletBech32),
      ]);
      const unStakedAmount = parseQueryResult(response, {
        index: 0,
        type: ContractQueryResultDataType.BIG_INT,
      });
      return {
        unStakedAmount: unStakedAmount.toString(),
      };
    } catch (error) {
      return {
        unStakedAmount: "0",
      };
    }
  }

  public async getClaimableRewards(): Promise<any> {
    try {
      let response = await this.contract.query("getClaimableRewards", [
        addressToHexString(this.userWalletBech32),
      ]);
      const rewardBalance = parseQueryResult(response, {
        index: 0,
        type: ContractQueryResultDataType.BIG_INT,
      });
      return {
        rewardAmount: rewardBalance.toString(),
      };
    } catch (error) {
      return {
        rewardAmount: "0",
      };
    }
  }

  public async getTotalActiveStake(): Promise<any> {
    try {
      let response = await this.contract.query("getTotalActiveStake", []);

      const totalStakedAmount = parseQueryResult(response, {
        index: 0,
        type: ContractQueryResultDataType.BIG_INT,
      });
      return {
        totalStakedAmount: totalStakedAmount.toString(),
      };
    } catch (error) {
      return {
        totalStakedAmount: "0",
      };
    }
  }

  public async getNumUsers(): Promise<any> {
    try {
      let response = await this.contract.query("getNumUsers", []);

      const totalUsers = parseQueryResult(response, {
        index: 0,
        type: ContractQueryResultDataType.INT,
      });
      return {
        totalUsers: totalUsers.toString(),
      };
    } catch (error) {
      return {
        totalUsers: "0",
      };
    }
  }
  public async getContractConfig(): Promise<any> {
    try {
      let response = await this.contract.query("getContractConfig");
      const rewardBalance = parseQueryResult(response, {
        index: 0,
        type: ContractQueryResultDataType.STRING,
      });
      return {
        rewardAmount: BigInt(rewardBalance).toString(),
      };
    } catch (error) {
      toast.error(error.message);
    }
  }

  public async getUserData(): Promise<UserData> {
    const balance = await this.proxyProvider.getAddress(this.userWalletBech32);
    return balance;
  }

  public async delegate(amount: number): Promise<TransactionReceipt> {
    let tx = await this.contract.invoke("delegate", [], {
      value: new BigVal(amount),
      gasLimit: 12000000,
    });

    return tx;
  }

  public async claimRewards(): Promise<TransactionReceipt> {
    let tx = await this.contract.invoke("claimRewards", [], {
      gasLimit: 6000000,
    });

    return tx;
  }

  public async withdraw(): Promise<TransactionReceipt> {
    let tx = await this.contract.invoke("withdraw", [], {
      gasLimit: 6000000,
    });

    return tx;
  }

  public async reDelegateRewards(): Promise<TransactionReceipt> {
    let tx = await this.contract.invoke("reDelegateRewards", [], {
      gasLimit: 12000000,
    });

    return tx;
  }

  public async unDelegate(amount: number): Promise<TransactionReceipt> {
    let tx = await this.contract.invoke(
      "unDelegate",
      [numberToHex(new BigVal(amount))],
      {
        gasLimit: 12000000,
      }
    );
    return tx;
  }
}
