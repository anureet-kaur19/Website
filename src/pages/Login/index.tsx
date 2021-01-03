import React from "react";
import LedgerLogin from "../../components/Login/Ledger";
import WalletLogin from "../../components/Login/Wallet";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "../../context";
import { Redirect } from "react-router-dom";

const Login = () => {
  const ref = React.useRef(null);

  const { loggedIn } = useContext();
  if (loggedIn) {
    return <Redirect to={'/'} />
  }

  return (
    <div ref={ref} className="d-flex flex-fill align-items-center container">
      <div className="row w-100 d-flex flex-column login__container">
        <LedgerLogin />
        <WalletLogin />
      </div>
    </div>
  );
};

export default Login;
