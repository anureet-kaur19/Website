import React from "react";
import Denominate from "../../components/Denominate";
import Stats from "../../pages/Staking/Stats";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { decimals } from "../../config";
import "../../assets/sass/assetsCardImages.scss";

interface AssetsCardType {
  icon?: any;
  label: React.ReactNode;
  value: string;
  className: string;
  showDecimals?: boolean;
  dataTestId?: string;
}

const AssetsCard = ({
  icon,
  label,
  value,
  className,
  dataTestId,
  showDecimals = false
}: AssetsCardType) => (
  <div
    className={`flex-grow-1 mr-3 mb-spacer assets-card ${className}`}
    style={{ flexBasis: "0" }}
  >
    <div className="stats-small card card-small">
      <div className="px-0 pb-0 card-body">
        <div className="px-3 pb-3 d-flex flex-column">
          <div className="assets-icon align-self-end">
            {icon ? <FontAwesomeIcon icon={icon} /> : null}
          </div>
          <p className="my-3">
            <small className="text-uppercase mb-3 text-white text-nowrap">
              {label}
            </small>
          </p>
          <p className={"h4 mb-0 text-white"}>
            <Denominate
              value={value}
              data-testid={dataTestId ? dataTestId : ""}
              decimals={showDecimals ? decimals : 0}
            />
          </p>
          <Stats.UsdValue
            input={value}
            className="text-white"
            dataTestId={`${dataTestId}Usd`}
          />
        </div>
      </div>
    </div>
  </div>
);

export default AssetsCard;
