import { StateType } from "./state";

export type DispatchType = (action: ActionType) => void;

export type ActionType =
  | { type: "setBalance"; balance: StateType["balance"] }
  | { type: "setRewardBalance"; rewardBalance: StateType["rewardBalance"] }
  | {
      type: "setDelegateBalance";
      delegateBalance: StateType["delegateBalance"];
    }
  | { type: "setUnBoundBalance"; unBoundBalance: StateType["unBoundBalance"] }
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

    case "setUnBoundBalance": {
      const { unBoundBalance } = action;
      return {
        ...state,
        unBoundBalance,
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
