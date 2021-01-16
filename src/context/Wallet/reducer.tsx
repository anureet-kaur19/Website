import { initialState, StateType } from "./state";
import { setItem, removeItem } from "../../storage/session";

export type DispatchType = (action: ActionType) => void;

export type ActionType =
  | { type: "login"; address: StateType["address"] }
  | { type: "loginType"; loginType: StateType["loginType"] }
  | { type: "PEM"; PEM: StateType["PEM"] }
  | { type: "JSON"; JSONText: StateType["JSONText"] }
  | { type: "logout" }
  | { type: "loading"; loading: StateType["loading"] }
  | { type: "setWallet"; wallet: StateType["wallet"] };

export function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "login": {
      const { address } = action;
      setItem("logged_in", true);
      setItem("forceLogout", false);
      setItem("address", address);
      return {
        ...state,
        address,
        forceLogout: false,
        loggedIn: true,
      };
    }

    case "loginType": {
      const { loginType } = action;
      setItem("loginType", loginType);
      return {
        ...state,
        loginType,
      };
    }

    case "PEM": {
      const { PEM } = action;
      setItem("PEM", PEM);
      return {
        ...state,
        PEM,
      };
    }
    case "JSON": {
      const { JSONText } = action;
      setItem("JSON", JSONText);
      return {
        ...state,
        JSONText,
      };
    }
    case "loading": {
      const { loading } = action;
      return {
        ...state,
        loading,
      };
    }

    case "setWallet": {
      const { wallet } = action;
      return {
        ...state,
        wallet,
      };
    }
    case "logout": {
      setItem("logged_in", false);
      setItem("forceLogout", true);
      removeItem("address");
      removeItem("PEM");
      removeItem("JSON");
      removeItem("loginType");
      return initialState();
    }

    default: {
      throw new Error(`Unhandled action type: ${action!.type}`);
    }
  }
}
