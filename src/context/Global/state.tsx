export interface StateType {
  USD: number;
  CAP: number;
  change: number;
  VOL: number;
}

export const initialState = () => {
  return {
    USD: 0,
    CAP: 0,
    change: 0,
    VOL: 0,
  };
};
