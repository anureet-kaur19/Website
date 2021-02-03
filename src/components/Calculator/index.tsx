import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import nominate from "../../components/Nominate";
import denominate from "../Denominate/denominate";
import { Grid } from "@material-ui/core";
import AssetsCard from "../Cards";
import {
    makeStyles,
    Theme,
    createStyles,
  } from "@material-ui/core/styles";
  
const useCalculatorStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  })
);

interface CalcualtorProps {
  balance: string;
};

export const Calculator = ({balance}: CalcualtorProps) => {
  const classes = useCalculatorStyles();
  const { t } = useTranslation();
  const [daily, setDaily] = useState(0);
  const [weekly, setWeekly] = useState(0);
  const [monthly, setMonthly] = useState(0);
  const [yearly, setYearly] = useState(0);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const year = value * (20 / 100);
    setYearly(year);
    setMonthly(year / 12);
    setWeekly(year / 52);
    setDaily(year / 365);
  }, [value]);

  useEffect(() =>{
    const result = parseInt(
      denominate({
        input: balance,
        denomination: 18,
        decimals: 18,
        showLastNonZeroDecimal: false,
        addCommas: false,
      }));
      setValue(result);
  }, [balance]);

  const cards = [
    {
      label: t("daily"),
      value: daily,
      className: "APRCalculator",
      showDecimals: true,
    },
    {
      label: t("weekly"),
      value: weekly,
      className: "APRCalculator",
      showDecimals: true,
    },
    {
      label: t("monthly"),
      value: monthly,
      className: "APRCalculator",
      showDecimals: true,
    },
    {
      label: t("yearly"),
      value: yearly,
      className: "APRCalculator",
      showDecimals: true,
    },
    {
      label: "APR",
      value: 20,
      className: "APRCalculator",
    },
  ];

  return (
    <>
      <Grid style={{ padding: "10px" }}>
        <div className="page-header mb-spacer no-gutters row">
          <div className="col-12 d-lg-flex justify-content-between align-items-center">
            <div>
              <h3 className="page-title d-inline">Revenue Dashboard</h3>
            </div>
          </div>
        </div>
      </Grid>
      <Grid
        container
        justify="center"
        direction="row"
        alignItems="center"
        spacing={2}
        className={classes.root}
      >
        {cards.map(({ label, value, showDecimals, className }, index) => (
          <Grid item key={index} md={4} sm={6} xs={12}>
            <AssetsCard
              key={index}
              showDecimals={showDecimals}
              className={className}
              label={label}
              value={nominate(value.toString())}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
