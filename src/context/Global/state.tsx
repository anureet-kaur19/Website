import { getItem } from "../../storage/session";
import { Agency } from "../../contracts/Agency"
import { ProxyProvider } from "elrondjs";

export interface AgencyDetails {
  fee: number;
  numNodes: number;
  numUsers: number;
  totalStaked: string;
  totalReward: string;
  totalUnStaked: string;
}

export interface StateType {
  USD: number;
  CAP: number;
  change: number;
  agencyInfo: AgencyDetails;
  agencySC: Agency;
  provider: ProxyProvider;
  VOL: number;
  LNG: string;
  Label: string;
}
const provider = new ProxyProvider("https://testnet-gateway.elrond.com", {
  callOptions: { timeout: 5000 },
});
export const initialState = (): StateType => {
  return {
    LNG: getItem('LNG') || 'en',
    Label: "XeGLD",   
    provider,
    agencyInfo: {
      fee: 0,
      numNodes: 0,
      numUsers: 0,
      totalStaked: "0",
      totalReward: "0",
      totalUnStaked: "0"
    },
    agencySC: new Agency(provider),
    USD: 0,
    CAP: 0,
    change: 0,
    VOL: 0,
  };
};
