import { StateType } from "./state";

export type DispatchType = (action: ActionType) => void;

export type ActionType =
  | { type: "setBalance"; balance: StateType["balance"] }
  | { type: "setRewardBalance"; rewardBalance: StateType["rewardBalance"] }
  | { type: "setTotalRewardBalance"; totalRewardBalance: StateType["totalRewardBalance"] }
  | {
      type: "setDelegateBalance";
      delegateBalance: StateType["delegateBalance"];
    }
  | { type: "setUserUnStakedValue"; unStakedBalance: StateType["unStakedBalance"] }
  | { type: "setUserUnBondable"; unBondableBalance: StateType["unBondableBalance"] }
  | { type: "setStakingSC"; stakingSC: StateType["stakingSC"] }
  | { type: "setIsActive"; isActive: StateType["isActive"] };

export function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "setBalance": {
      const { balance } = action;
      return {
        ...state,
        balance,
      };
    }

    case "setTotalRewardBalance": {
      const { totalRewardBalance } = action;
      return {
        ...state,
        totalRewardBalance,
      };
    }
  
    case "setRewardBalance": {
      const { rewardBalance } = action;
      return {
        ...state,
        rewardBalance,
      };
    }

    case "setDelegateBalance": {
      const { delegateBalance } = action;
      return {
        ...state,
        delegateBalance,
      };
    }

    case "setUserUnStakedValue": {
      const { unStakedBalance } = action;
      return {
        ...state,
        unStakedBalance,
      };
    }

    case "setUserUnBondable": {
      const { unBondableBalance } = action;
      return {
        ...state,
        unBondableBalance,
      };
    }
    case "setStakingSC": {
      const { stakingSC } = action;
      return {
        ...state,
        stakingSC,
      };
    }

    case "setIsActive": {
      const { isActive } = action;
      return {
        ...state,
        isActive,
      };
    }

    default: {
      throw new Error(`Unhandled action type: ${action!.type}`);
    }
  }
}
