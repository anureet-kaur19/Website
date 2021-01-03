import {
  faBookOpen,
  faCheck,
  faMoneyCheck,
  faWonSign,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useContext } from "../../context";
import { Staking as SC } from "../../contracts/Staking";
import AssetsCard from "./AssetCards";
import {
  MDBInput,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardGroup,
} from "mdbreact";
import BigNumber from "bignumber.js";

const Staking = () => {
  const { address, dapp } = useContext();
  const staking = useState(new SC(address, dapp.proxy, dapp.provider))[0];
  const [isActive, setIsActive] = useState(false);
  const [userStakedBalance, setUserStakedBalance] = useState(0);
  const [userRewardsAvailable, setUserRewardAvailable] = useState(0);
  const [delegateAmount, setDelegateAmount] = useState(10);
  const [userBalance, setUserBalance] = useState("0");
  const [modal, setModal] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const updateUserData = async () => {
    setLoaded(false);
    const userData = await staking.getUserData();
    setUserBalance(userData.balance);
    const result = await staking.getUserActiveStake();
    setIsActive(result.isActive);
    await staking.getContractConfig();
    if (result.isActive && result.stakeAmount) {
      setUserStakedBalance(result.stakeAmount);
      const rewardsAvailable = await staking.getClaimableRewards();
      if (rewardsAvailable) {
        setUserRewardAvailable(rewardsAvailable.rewardAmount);
      }
    }
    setLoaded(true);
  };

  useEffect(() => {
    async function fetchUserData() {
      await updateUserData();
    }
    fetchUserData();
  }, []);

  const delegate = async () => {
    await staking.delegate(delegateAmount);
    setModal(false);
    setDelegateAmount(10);
  };

  if (!loaded) {
    return null;
  }
  const bnBalance = new BigNumber(userBalance);
  const bnDelegated = new BigNumber(userStakedBalance);
  const bnRewards = new BigNumber(userRewardsAvailable);

  const total = bnBalance
    .plus(bnDelegated)
    .plus(bnRewards)
    .toString(10);

  const entries = isActive
    ? [
        {
          label: "Total",
          value: !isNaN(parseFloat(total)) ? total : userBalance,
          showDecimals: true,
          icon: faMoneyCheck,
          className: "total",
          dataTestId: "total",
        },
        {
          label: "Available",
          value: userBalance,
          icon: faCheck,
          showDecimals: true,
          className: "available",
          dataTestId: "balance",
        },
        {
          label: "Delegated",
          value: bnDelegated,
          icon: faBookOpen,
          showDecimals: true,
          className: "delegated",
          dataTestId: "delegated",
        },
        {
          label: "Reward",
          value: bnRewards,
          icon: faWonSign,
          showDecimals: true,
          className: "rewards",
          dataTestId: "rewards",
        },
      ]
    : [
        {
          label: "Available",
          value: userBalance,
          icon: faMoneyCheck,
          showDecimals: true,
          className: "total",
          dataTestId: "balance",
        },
      ];

  return (
    <div className="justify-content-center">
      <MDBCardGroup deck>
        {entries.map(
          (
            { label, value, icon, className, dataTestId, showDecimals },
            index
          ) => (
            <AssetsCard
              key={index}
              icon={icon}
              showDecimals={showDecimals}
              dataTestId={dataTestId}
              className={className}
              label={label}
              value={value.toString()}
            />
          )
        )}
      </MDBCardGroup>
      <MDBCardGroup deck>
        <MDBCard
          className="card-body"
          style={{ width: "22rem", padding: "15px", marginTop: "1rem" }}
        >
          <MDBCardTitle>Delegate</MDBCardTitle>
          <MDBCardText>
            Delegate your tokens to secure the network and capture your share of
            the rewards.
          </MDBCardText>
          <div className="flex-row">
            <MDBBtn
              onClick={() => {
                setModal(!modal);
              }}
            >
              Delegate
            </MDBBtn>
            {/* @ts-ignore */}
            <MDBModal
              isOpen={modal}
              toggle={() => {
                setModal(!modal);
              }}
              centered
              animation={"top"}
              autoFocus={true}
            >
              <MDBModalHeader
                toggle={() => {
                  setModal(!modal);
                }}
              >
                Delegate Now
              </MDBModalHeader>
              <MDBModalBody>
                <label htmlFor="amount" className="grey-text">
                  Amount
                </label>
                <MDBInput
                  min={10}
                  value={delegateAmount}
                  onChange={(e) => {
                    /* @ts-ignore */
                    setDelegateAmount(e.target.value);
                  }}
                  type="number"
                  id="amount"
                />
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn
                  color="warning"
                  onClick={() => {
                    setModal(!modal);
                  }}
                >
                  Close
                </MDBBtn>
                <MDBBtn
                  color="success"
                  onClick={() => {
                    delegate();
                  }}
                >
                  Send
                </MDBBtn>
              </MDBModalFooter>
            </MDBModal>
          </div>
        </MDBCard>
      </MDBCardGroup>
    </div>
  );
};

export default Staking;
