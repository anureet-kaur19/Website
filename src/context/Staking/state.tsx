import { Staking } from "../../contracts";

export interface StateType {
  balance: string;
  rewardBalance: string;
  delegateBalance: string;
  unStakedBalance: string;
  unBondableBalance: string,
  userName: string;
  stakingSC: Staking;
  isActive: boolean;
}

export const initialState = (): StateType => {
  return {
    balance: "0",
    rewardBalance: "0",
    delegateBalance: "0",
    unStakedBalance: "0",
    unBondableBalance: "0",
    userName: "",
    stakingSC: new Staking(),
    isActive: false,
  };
};
