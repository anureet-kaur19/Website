import { setItem } from "../../storage/session";
import { StateType } from "./state";

export type DispatchType = (action: ActionType) => void;

export type ActionType =
  | { type: "USD"; USD: StateType["USD"] }
  | { type: "CAP"; CAP: StateType["CAP"] }
  | { type: "change"; change: StateType["change"] }
  | { type: "VOL"; VOL: StateType["VOL"] }
  | { type: "language"; language: StateType["LNG"] }
  | { type: "agencyInfo"; agencyInfo: StateType["agencyInfo"] };

export function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "language": {
      const { language } = action;
      setItem('LNG', language);
      return {
        ...state,
        LNG: language,
      };
    }
    case "USD": {
      const { USD } = action;
      return {
        ...state,
        USD,
      };
    }

    case "CAP": {
      const { CAP } = action;
      return {
        ...state,
        CAP,
      };
    }

    case "VOL": {
      const { VOL } = action;
      return {
        ...state,
        VOL,
      };
    }

    case "change": {
      const { change } = action;
      return {
        ...state,
        change,
      };
    }

    case "agencyInfo": {
      const { agencyInfo } = action;
      return {
        ...state,
        agencyInfo,
      };
    }

    default: {
      throw new Error(`Unhandled action type: ${action!.type}`);
    }
  }
}
