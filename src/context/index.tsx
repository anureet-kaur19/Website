import React, { useEffect } from "react";
import { StateType, initialState } from "./state";
import { DispatchType, reducer } from "./reducer";
import { BasicWallet, LedgerWallet } from "elrondjs";
import { toast } from "react-toastify";
import { Buffer } from "buffer";
const TransportWebUsb = require("@ledgerhq/hw-transport-webusb").default;
const TransportU2F = require("@ledgerhq/hw-transport-u2f").default;

export interface ContextType {
  children: React.ReactNode;
}

const Context = React.createContext<StateType | undefined>(undefined);
const Dispatch = React.createContext<DispatchType | undefined>(undefined);

function ContextProvider({ children }: ContextType) {
  const [state, dispatch] = React.useReducer(reducer, initialState());
  const { wallet, forceLogout, loginType, loggedIn, PEM, JSONText } = state;

  useEffect(() => {
    const ledgerLogin = async () => {
      try {
        const wallet = await LedgerWallet.connect([
          TransportWebUsb,
          TransportU2F,
        ]);
        const address = wallet.address();
        // Set this provider as default inside the app
        dispatch({ type: "setWallet", wallet });
        dispatch({ type: "login", address });
        dispatch({ type: "loginType", loginType: "Ledger" });
      } catch (error) {
        dispatch({ type: "loading", loading: false });
        dispatch({ type: "logout" });
      }
    };
    const PEMLogin = async () => {
      if (PEM) {
        try {
          const wallet = await BasicWallet.fromPemFileString(
            Buffer.from(PEM, "base64").toString()
          );
          const address = wallet.address();
          console.log(wallet);
          // Set this provider as default inside the app
          dispatch({ type: "setWallet", wallet });
          dispatch({ type: "login", address });
        } catch (error) {
          dispatch({ type: "logout" });
        }
      } else {
        dispatch({ type: "logout" });
      }
    };
    const JSONLogin = async () => {
      if (JSONText) {
        try {
          const data = JSON.parse(Buffer.from(JSONText, "base64").toString());
          const wallet = await BasicWallet.fromJsonKeyFileString(
            data.json.toString(),
            data.pass
          );
          const address = wallet.address();
          // Set this provider as default inside the app
          dispatch({ type: "setWallet", wallet });
          dispatch({ type: "login", address });
        } catch (error) {
          dispatch({ type: "logout" });
        }
      } else {
        dispatch({ type: "logout" });
      }
    };
    if (wallet === undefined && loggedIn) {
      if (!forceLogout) {
        switch (loginType) {
          case "Ledger":
            ledgerLogin();
            break;
          case "PEM":
            console.log("Auto Login PEM");
            PEMLogin();
            break;
          case "JSON":
            console.log("Auto Login JSON");
            JSONLogin();
            break;
          default:
            dispatch({ type: "logout" });
            break;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return (
    <Context.Provider value={state}>
      <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
    </Context.Provider>
  );
}

function useContext() {
  const context = React.useContext(Context);
  if (context === undefined) {
    throw new Error("useState must be used within a Context.Provider");
  }
  return context;
}

function useDispatch() {
  const context = React.useContext(Dispatch);
  if (context === undefined) {
    throw new Error("useDispatch must be used within a Dispatch.Provider");
  }
  return context;
}

export { ContextProvider, useContext, useDispatch };
