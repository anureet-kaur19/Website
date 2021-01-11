import { Staking } from "../../contracts";

export interface StateType {
  balance: string;
  rewardBalance: string;
  delegateBalance: string;
  unBoundBalance: BigInt;
  userName: string;
  stakingSC: Staking;
  isActive: boolean;
}

export const initialState = (): StateType => {
  return {
    balance: "0",
    rewardBalance: "0",
    delegateBalance: "0",
    unBoundBalance: BigInt(0),
    userName: "",
    stakingSC: new Staking(),
    isActive: false,
  };
};
