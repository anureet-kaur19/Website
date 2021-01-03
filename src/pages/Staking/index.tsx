import {
  faBookOpen,
  faCheck,
  faMoneyCheck,
  faWonSign
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useContext } from "../../context";
import { Staking as SC } from "../../contracts/Staking";
import AssetsCard from "./AssetCards";
import BigNumber from "bignumber.js";

const Staking = () => {
  const { address, dapp } = useContext();
  const staking = useState(new SC(address, dapp.proxy, dapp.provider))[0];
  const [isActive, setIsActive] = useState(false);
  const [userStakedBalance, setUserStakedBalance] = useState(0);
  const [userRewardsAvailable, setUserRewardAvailable] = useState(0);
  const [userBalance, setUserBalance] = useState("");

  useEffect(() => {
    // Create an scoped async function in the hook
    async function fetchUserData() {
      const userData = await staking.getUserData();
      setUserBalance(userData.balance);
      const result = await staking.getUserActiveStake();
      setIsActive(result.isActive);
      if (result.isActive && result.stakeAmount) {
        setUserStakedBalance(result.stakeAmount);
        const rewardsAvailable = await staking.getClaimableRewards();
        if (rewardsAvailable) {
          setUserRewardAvailable(rewardsAvailable.rewardAmount);
        }
        await staking.getContractConfig();
      }
    }
    // Execute the created function directly
    fetchUserData();
  }, [staking]);

  // const bnClaimableRewards = new BigNumber(claimableRewards);
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
          dataTestId: "total"
        },
        {
          label: "Available",
          value: bnBalance,
          icon: faCheck,
          showDecimals: true,
          className: "available",
          dataTestId: "balance"
        },
        {
          label: "Staked",
          value: bnDelegated,
          icon: faBookOpen,
          showDecimals: true,
          className: "delegated",
          dataTestId: "delegated"
        },
        {
          label: "Reward",
          value: bnRewards,
          icon: faWonSign,
          showDecimals: true,
          className: "rewards",
          dataTestId: "rewards"
        }
      ]
    : [
        {
          label: "Available",
          value: userBalance,
          icon: faMoneyCheck,
          showDecimals: true,
          className: "total",
          dataTestId: "balance"
        }
      ];

  return (
    <div className="justify-content-center">
      <div className="row d-flex pl-3">
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
      </div>
    </div>
  );
};

export default Staking;
