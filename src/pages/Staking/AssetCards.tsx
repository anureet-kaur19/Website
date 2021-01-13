import React from "react";
import Denominate from "../../components/Denominate";
import Stats from "../../pages/Staking/Stats";
import { decimals } from "../../config";
import "../../assets/sass/assetsCardImages.scss";
import Card from '@material-ui/core/Card';
import { CardContent } from "@material-ui/core";
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
  showDecimals = false,
}: AssetsCardType) => (
  <Card
    className={`card-body ${className}`}
  >
      <CardContent>      
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
        </CardContent>
  </Card>
);
export default AssetsCard;
