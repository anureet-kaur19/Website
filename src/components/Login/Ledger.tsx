import React from "react";
import { HWProvider, ProxyProvider } from "@elrondnetwork/erdjs";
import { useDispatch } from "../../context";
import { toast } from "react-toastify";

const LedgerLogin = () => {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    const httpProvider = new ProxyProvider("https://testnet-api.elrond.com", 4000);
    const hwWalletP = new HWProvider(httpProvider);

    dispatch({ type: "loading", loading: true });
    hwWalletP
      .init()
      .then((success: any) => {
        if (!success) {
          dispatch({ type: "loading", loading: false });
          toast.warn(
            "Could not initialise Ledger app, make sure Elrond app is open"
          );
          return;
        }

        hwWalletP
          .login()
          .then(address => {
            // Set this provider as default inside the app
            dispatch({ type: "setProvider", provider: hwWalletP });
            dispatch({ type: "login", address });
          })
          .catch((err: any) => {
            dispatch({ type: "loading", loading: false });
            toast.warn(err);
          });
      })
      .catch((err: any) => {
        dispatch({ type: "loading", loading: false });
        toast.warn(
          "Could not initialise Ledger app, make sure Elrond app is open",
          err
        );
      });
  };
  return (
    <div className="col-12 col-md-8 col-lg-5 mx-auto login-card__container">
      <div className="card shadow-sm rounded p-4 border-0">
        <div className="card-body text-center">
          <h2 className="mb-3">Ledger</h2>

          <p className="mb-3">Secure Ledger login.</p>

          <button
            onClick={() => handleOnClick()}
            className="btn btn-primary mt-3"
          >
            Connect Ledger
          </button>
        </div>
      </div>
    </div>
  );
};

export default LedgerLogin;
