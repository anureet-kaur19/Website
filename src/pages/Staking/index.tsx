/* eslint-disable react-hooks/exhaustive-deps */
import {
  faBookOpen,
  faCheck,
  faMoneyCheck,
  faWonSign,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useCallback } from "react";
import { useStakingContext } from "../../context/Staking";
// import AssetsCard from "./AssetCards";
import { useTransactionToasts } from "react-transaction-toasts";
// import {
//   MDBInput,
//   MDBBtn,
//   MDBModal,
//   MDBModalBody,
//   MDBModalHeader,
//   MDBModalFooter,
//   MDBCard,
//   MDBCardTitle,
//   MDBCardText,
//   MDBCardGroup,
// } from "mdbreact";
import BigNumber from "bignumber.js";
import { useContext } from "../../context";

const Staking = () => {
  const {
    balance,
    delegateBalance,
    rewardBalance,
    isActive,
    stakingSC,
  } = useStakingContext();
  const { provider, address } = useContext();
  const { trackTransaction, showError } = useTransactionToasts();
  const [delegateAmount, setDelegateAmount] = useState(10);
  const [unDelegateAmount, setUnDelegateAmount] = useState(10);
  const [modal, setModal] = useState(false);
  const [modalUnDelegate, setModalUnDelegate] = useState(false);

  //@ts-ignore
  const delegate = useCallback(async () => {
    try {
      const tx = await stakingSC.delegate(delegateAmount);
      trackTransaction(tx.hash);
    } catch (error) {
      showError(error.message);
    } finally {
      setModal(false);
      setDelegateAmount(10);
    }
  });

  //@ts-ignore
  const unDelegate = useCallback(async () => {
 try {
      const tx = await stakingSC.unDelegate(delegateAmount);
      trackTransaction(tx.hash);
    } catch (error) {
      showError(error.message);
    } finally {
      setModalUnDelegate(false);
      setUnDelegateAmount(11);
    }
  });

  const bnBalance = new BigNumber(balance.toString());

  const total = bnBalance
    .plus(delegateBalance)
    .plus(rewardBalance)
    .toString(10);

  const entries = isActive
    ? [
        {
          label: "Total",
          value: !isNaN(parseFloat(total)) ? total : balance,
          showDecimals: true,
          icon: faMoneyCheck,
          className: "total",
          dataTestId: "total",
        },
        {
          label: "Available",
          value: balance,
          icon: faCheck,
          showDecimals: true,
          className: "available",
          dataTestId: "balance",
        },
        {
          label: "Delegated",
          value: delegateBalance,
          icon: faBookOpen,
          showDecimals: true,
          className: "delegated",
          dataTestId: "delegated",
        },
        {
          label: "Reward",
          value: rewardBalance,
          icon: faWonSign,
          showDecimals: true,
          className: "rewards",
          dataTestId: "rewards",
        },
      ]
    : [
        {
          label: "Available",
          value: balance,
          icon: faMoneyCheck,
          showDecimals: true,
          className: "total",
          dataTestId: "balance",
        },
      ];

  return (
    <div className="justify-content-center">
      {address}
  </div>
  );
};

export default Staking;
