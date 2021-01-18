import { getItem } from "../../storage/session";

export interface StateType {
  USD: number;
  CAP: number;
  change: number;
  VOL: number;
  LNG: string;
}

export const initialState = () => {
  return {
    LNG: getItem('LNG') || 'en',
    USD: 0,
    CAP: 0,
    change: 0,
    VOL: 0,
  };
};
