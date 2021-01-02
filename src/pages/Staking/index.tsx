import React from "react";

import { useContext } from "../../context";

import Login from "../Login";

const Staking = () => {
  const { loggedIn } = useContext();

  if (!loggedIn) {
    return <Login />
  }


  return (
    <React.Fragment>
    </React.Fragment>
  );
};

export default Staking;
