import { Argument, Balance } from "@elrondnetwork/erdjs";
import {
  ProxyProvider,
  Wallet,
  Contract,
  addressToHexString,
  ContractQueryResultDataType,
  parseQueryResult,
  TransactionReceipt,
} from "elrondjs";
import { BigVal } from 'bigval'
import { toast } from "react-toastify";
import addresses from "./addresses";

interface UserData {
  balance: string;
}
export class Staking {
  proxyProvider: ProxyProvider;
  signerProvider: Wallet;
  private userWalletBech32: string = "";

  constructor(walletSigner?: Wallet, provider?: ProxyProvider) {
    this.signerProvider = walletSigner as Wallet;
    this.proxyProvider = provider as ProxyProvider;
  }

  public setWalletSigner(walletSigner: Wallet) {
    this.signerProvider = walletSigner;
  }

  public setUserAddress(wallet: string) {
    this.userWalletBech32 = wallet;
  }

  public setProxyProvider(provider: ProxyProvider) {
    this.proxyProvider = provider;
  }

  public async getUserActiveStake(): Promise<any> {
    try {
      const contract = await Contract.at(addresses["stakingSC"], {
        provider: this.proxyProvider,
      });
      let response = await contract.query("getUserActiveStake", [
        addressToHexString(this.userWalletBech32),
      ]);
      const waitingStake = parseQueryResult(response, {
        index: 0,
        type: ContractQueryResultDataType.INT,
      });
      return {
        isActive: true,
        stakeAmount: BigInt(waitingStake).toString(),
      };
    } catch (error) {
      return {
        isActive: false,
      };
    }
  }

  public async getClaimableRewards(): Promise<any> {
    try {
      const contract = await Contract.at(addresses["stakingSC"], {
        provider: this.proxyProvider,
      });
      let response = await contract.query("getClaimableRewards", [
        addressToHexString(this.userWalletBech32),
      ]);
      const rewardBalance = parseQueryResult(response, {
        index: 0,
        type: ContractQueryResultDataType.INT,
      });
      return {
        rewardAmount: BigInt(rewardBalance).toString(),
      };
    } catch (error) {
      toast.error(error.message);
    }
    return undefined;
  }

  // public async getContractConfig(): Promise<any> {
  //   let response = await this.contract.runQuery(this.proxyProvider, {
  //       func: new ContractFunction("getContractConfig"),
  //     });
  //     console.log(response);

  // }

  public async getUserData(): Promise<UserData> {
    const balance = await this.proxyProvider.getAddress('erd1x45vnu7shhecfz0v03qqfmy8srndch50cdx7m763p743tzlwah0sgzewlm');
    console.log(balance);
    return balance;
  }

  public async delegate(amount: number): Promise<TransactionReceipt> {
    const contract = await Contract.at(addresses["stakingSC"], {
      provider: this.proxyProvider,
      signer: this.signerProvider,
      sender: this.userWalletBech32,
      gasLimit: 12000000,
    });

    let tx = contract.invoke("delegate", [], {
      value: new BigVal(Balance.eGLD(amount).valueOf())
    });

    return tx;
  }

  public async unDelegate(amount: number): Promise<TransactionReceipt> {
    console.log(amount);
    const contract = await Contract.at(addresses["stakingSC"], {
      provider: this.proxyProvider,
      signer: this.signerProvider,
      sender: this.userWalletBech32,
      gasLimit: 12000000,
    });
    let tx = contract.invoke("unDelegate", [
      Argument.fromBigInt(Balance.eGLD(amount).valueOf()).valueOf(),
    ]);
    return tx;
  }
}
