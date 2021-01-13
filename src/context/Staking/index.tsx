/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { StateType, initialState } from "./state";
import { DispatchType, reducer } from "./reducer";
import { Wallet } from "elrondjs";
import { useContext } from "../../context";
import { getItem } from "../../storage/session";

export interface ContextType {
  children: React.ReactNode;
}

const Context = React.createContext<StateType | undefined>(undefined);
const Dispatch = React.createContext<DispatchType | undefined>(undefined);

function StakingContextProvider({ children }: ContextType) {
  const [state, dispatch] = React.useReducer(reducer, initialState());
  const { stakingSC } = state;
  const { address, wallet, provider, loggedIn } = useContext();
  const [interval, setRefreshInterval] = useState<NodeJS.Timeout | undefined>(
    undefined
  );

  //@ts-ignore
  useEffect(() => {
    const fetchUserData = async () => {
        if (getItem("logged_in") === false) {
          if (interval !== undefined) {
            clearInterval(interval as NodeJS.Timeout);
            setRefreshInterval(undefined);
          }
          return;
        }
        stakingSC.setUserAddress(address);
        stakingSC.setWalletSigner(wallet as Wallet);
        stakingSC.setProxyProvider(provider);
        const userBalance = await stakingSC.getUserData();
        dispatch({ type: "setBalance", balance: userBalance.balance });
        const userDelegation = await stakingSC.getUserActiveStake();
        dispatch({ type: "setIsActive", isActive: userDelegation.isActive });
        if (userDelegation.isActive && userDelegation.stakeAmount) {
          dispatch({
            type: "setDelegateBalance",
            delegateBalance: userDelegation.stakeAmount,
          });
          const rewardsAvailable = await stakingSC.getClaimableRewards();
          if (rewardsAvailable) {
            dispatch({
              type: "setRewardBalance",
              rewardBalance: rewardsAvailable.rewardAmount,
            });
          }
        }
    };
    if (getItem("logged_in") === true && wallet !== undefined) {
      fetchUserData();
      const int = setInterval(() => fetchUserData(), 6000);
      setRefreshInterval(int);
    }
    return () => {
      if (getItem("logged_in") === false) {
        clearInterval(interval as NodeJS.Timeout);
        setRefreshInterval(undefined);
      }
    };
  }, [loggedIn, wallet]);

  return (
    <Context.Provider value={state}>
      <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
    </Context.Provider>
  );
}

function useStakingContext(): StateType {
  const context = React.useContext(Context);
  if (context === undefined) {
    throw new Error("useState must be used within a Context.Provider");
  }
  return context;
}

function useStakingDispatch() {
  const context = React.useContext(Dispatch);
  if (context === undefined) {
    throw new Error("useDispatch must be used within a Dispatch.Provider");
  }
  return context;
}

export { StakingContextProvider, useStakingContext, useStakingDispatch };
