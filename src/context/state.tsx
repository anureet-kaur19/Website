import { getItem } from "../storage/session";
import { ProxyProvider, Wallet } from "elrondjs";

export interface StateType {
  wallet: Wallet | undefined;
  loading: boolean;
  error: string;
  loggedIn: boolean;
  provider: ProxyProvider;
  address: string;
  loginType: string;
  denomination: number;
  forceLogout: boolean;
  PEM: string;
  JSONText: string;
  decimals: number;
}

export const initialState = () => {
  return {
    denomination: 18,
    decimals: 2,
    wallet: undefined,
    provider: new ProxyProvider("https://testnet-gateway.elrond.com", {
      callOptions: { timeout: 5000 },
    }),
    loading: false,
    error: "",
    loggedIn: !!getItem("logged_in"),
    loginType: getItem("loginType"),
    PEM: getItem("PEM"),
    JSONText: getItem("JSON"),
    forceLogout: !!getItem("forceLogout"),
    address: getItem("address"),
  };
};
