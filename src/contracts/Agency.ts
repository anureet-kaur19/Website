import {
    ProxyProvider,
    Contract,
    ContractQueryResultDataType,
    parseQueryResult,
  } from "elrondjs";
  import { toast } from "react-toastify";
  import addresses from "./addresses";
  
  
  export class Agency {
    private proxyProvider: ProxyProvider;
    private contract: Contract;
    private numNodes: number = 0;
  
    constructor(
      provider?: ProxyProvider,
      contract?: Contract
    ) {
      this.proxyProvider = provider as ProxyProvider;
      this.contract = contract as Contract;
    }
  
    public setProxyProvider(provider: ProxyProvider): void {
      this.proxyProvider = provider;
    }
  
    public async initContract(): Promise<void> {
      this.contract = await Contract.at(addresses["stakingSC"], {
        provider: this.proxyProvider,
      });
    }
    public async getContract() {
        if (this.contract === undefined) {
            await this.initContract();
        }
        return this.contract;
    }
    
    public async getTotalActiveStake(): Promise<any> {
      try {
        let response = await this.getContract().then(async (contract)=>{
            return await contract.query("getTotalActiveStake", []);
        });
        
        const totalStakedAmount = parseQueryResult(response, {
          index: 0,
          type: ContractQueryResultDataType.BIG_INT,
        });
        return totalStakedAmount.toString();
      } catch (error) {
        return "0";
      }
    }

    public async getAllNodeStates(): Promise<any> {
        try {
            let response = await this.getContract().then(async (contract)=>{
                return await contract.query("getTotalActiveStake", []);
            });
    
        //   const nodes = parseQueryResult(response, {
        //     index: 0,
        //     type: ContractQueryResultDataType.BIG_INT,
        //   });
          console.log(response)
          return;
        } catch (error) {
          return "0";
        }
      }
  
    public async getTotalUnStake(): Promise<any> {
        try {
          let response = await this.getContract().then(async (contract)=>{
            return await contract.query("getTotalUnStaked", []);
        });
          const totalUnStakedAmount = parseQueryResult(response, {
            index: 0,
            type: ContractQueryResultDataType.BIG_INT,
          });
          return totalUnStakedAmount.toString();
        } catch (error) {
          return "0";
        }
      }

    public async getNumUsers(): Promise<any> {
      try {
        let response = await this.getContract().then(async (contract)=>{
            return await contract.query("getNumUsers", []);
        });
        const totalUsers = parseQueryResult(response, {
          index: 0,
          type: ContractQueryResultDataType.INT,
        });

        return totalUsers;
        
      } catch (error) {
        return "0";
      }
    }
  
    public async getNumNodes(): Promise<any> {
      try {
        let response = await this.getContract().then(async (contract)=>{
            return await contract.query("getNumNodes", []);
        });
        const totalNodes = parseQueryResult(response, {
          index: 0,
          type: ContractQueryResultDataType.INT,
        });

        this.numNodes = totalNodes as number;
        
        return totalNodes;
      } catch (error) {
        return "0"
      }
    }
  
    public async getContractConfig(): Promise<any> {
      try {
        let response = await this.getContract().then(async (contract)=>{
            return await contract.query("getContractConfig", []);
        });
        const serviceFee = parseQueryResult(response, {
          index: 1,
          type: ContractQueryResultDataType.INT,
        });
        const maxDelegationCap = parseQueryResult(response, {
          index: 2,
          type: ContractQueryResultDataType.BIG_INT,
        });
        const automaticDelegation = parseQueryResult(response, {
          index: 4,
          type: ContractQueryResultDataType.STRING,
        });
        const unboundPeriod = parseQueryResult(response, {
          index: 8,
          type: ContractQueryResultDataType.BIG_INT,
        });
        console.log("Service fee", serviceFee);
        console.log("Max delegation Cap", maxDelegationCap.toString());
        console.log("Unbound Period", unboundPeriod.toString());
        console.log("Automatic Activation", automaticDelegation);
        return {
          fee: serviceFee,
        };
      } catch (error) {
        toast.error(error.message);
        return {
            fee: "44"
        }
      }
    }
  }
  