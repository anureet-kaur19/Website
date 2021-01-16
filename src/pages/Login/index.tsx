import React from "react";
import LedgerLogin from "../../components/Login";
// import WalletLogin from "../../components/Login/Wallet";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "../../context/Wallet";
import { Redirect } from "react-router-dom";
import { Grid } from "@material-ui/core";

const Login = () => {
  const { loggedIn } = useContext();
  if (loggedIn) {
    return <Redirect to={"/staking"} />;
  }

  return (
    <Grid
      container
      direction="row-reverse"
      justify="center"
      alignItems="center"
    >
      {" "}
      <LedgerLogin />
    </Grid>
  );
};

export default Login;
