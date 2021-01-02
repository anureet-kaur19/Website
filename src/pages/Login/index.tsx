import React from "react";
import LedgerLogin from "../../components/Login/Ledger";
import WalletLogin from "../../components/Login/Wallet";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const ref = React.useRef(null);

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
