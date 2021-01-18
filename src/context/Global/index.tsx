import React, { useEffect, useState } from "react";
import { StateType, initialState } from "./state";
import { DispatchType, reducer } from "./reducer";
import axios from 'axios';

export interface ContextType {
  children: React.ReactNode;
}

const Context = React.createContext<StateType | undefined>(undefined);
const Dispatch = React.createContext<DispatchType | undefined>(undefined);

function GlobalContextProvider({ children }: ContextType) {
  const [state, dispatch] = React.useReducer(reducer, initialState());
  const [interval, setInt] = useState<NodeJS.Timeout | undefined>(undefined);

  const getLatestElrondData = async () => {
    axios.get(`https://testnet-api.elrond.com/quotes/latest`)
    .then(res => {
      dispatch({type: "USD", USD: res.data.usd});
      dispatch({type: "CAP", CAP: res.data.market_cap});
      dispatch({type: "VOL", VOL: res.data.volume_24h});
      dispatch({type: "change", change: res.data.change});
    });
  };
  useEffect(() => {
    const fetch = async () => {
      await getLatestElrondData();
    };
    setInt(setInterval(async () => {await fetch()}, 10000));
    fetch();
    return () => {
      clearInterval(interval as NodeJS.Timeout);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Context.Provider value={state}>
      <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
    </Context.Provider>
  );
}

function useGlobalContext() {
  const context = React.useContext(Context);
  if (context === undefined) {
    throw new Error("useState must be used within a Context.Provider");
  }
  return context;
}

function useGlobalDispatch() {
  const context = React.useContext(Dispatch);
  if (context === undefined) {
    throw new Error("useDispatch must be used within a Dispatch.Provider");
  }
  return context;
}

export { GlobalContextProvider, useGlobalContext, useGlobalDispatch };
