/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { isMobile, isBrowser } from "react-device-detect";
import {
  Card,
  CardContent,
  Container,
  createStyles,
  Grid,
  makeStyles,
  Slider,
  Theme,
  Typography,
  Button,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import ScheduleIcon from "@material-ui/icons/Schedule";
import AssetsCard from "../Staking/AssetCards";
import nominate from "../../components/Nominate";
import StarBorderTwoToneIcon from "@material-ui/icons/StarBorderTwoTone";
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from "react-router-dom";

const useStylesHome = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(14),
      height: theme.spacing(14),
    },
    icon: {
      color: "primary",
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  })
);

export default function Home() {
  const classes = useStylesHome();
  return (
    <Container style={{ padding: "5px" }}>
      <Card style={{ paddingBottom: "35px" }}>
        <CardContent>
          {" "}
          <Grid container spacing={2} justify="center">
            <Grid item container xs={12} sm={4} justify="center">
              <Grid container justify="center">
                <Grid container justify="center">
                  <Avatar
                    style={{ backgroundColor: "transparent" }}
                    className={classes.large}
                    variant="rounded"
                  >
                    <StarBorderTwoToneIcon
                      color="primary"
                      className={classes.icon}
                    />{" "}
                  </Avatar>
                </Grid>
                <Grid container justify="center">
                  <Typography
                    align="center"
                    color="textPrimary"
                    component="h6"
                    variant="h6"
                  >
                    Reward percentage (<b>APR</b>)
                  </Typography>
                </Grid>
                <Grid container justify="center">
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    align="center"
                  >
                    We will offer you the best <b>APR</b> on the market set at{" "}
                    <b>
                      <i>20%</i>
                    </b>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container xs={12} sm={4} justify="center">
              <Grid container justify="center">
                <Grid container justify="center">
                  <Avatar
                    style={{ backgroundColor: "transparent" }}
                    className={classes.large}
                    variant="rounded"
                  >
                    <ScheduleIcon color="primary" className={classes.large} />{" "}
                  </Avatar>
                </Grid>
                <Grid container justify="center">
                  <Typography
                    align="center"
                    color="textPrimary"
                    component="h6"
                    variant="h6"
                  >
                    Unbound period
                  </Typography>
                </Grid>
                <Grid container justify="center">
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    align="center"
                  >
                    You can withdraw your money in 3 days after the request!
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container xs={12} sm={4} justify="center">
              <Grid container justify="center">
                <Grid container justify="center">
                  <Avatar
                    style={{ backgroundColor: "transparent" }}
                    className={classes.large}
                    variant="rounded"
                  >
                    <AccountBalanceIcon
                      color="primary"
                      className={classes.large}
                    />{" "}
                  </Avatar>
                </Grid>
                <Grid container justify="center">
                  <Typography
                    align="center"
                    color="textPrimary"
                    component="h6"
                    variant="h6"
                  >
                    Minimum amount
                  </Typography>
                </Grid>
                <Grid container justify="center">
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    align="center"
                  >
                    You can start delegating with <b>10 eGLD</b>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* <Accordions /> */}
      <br />
      <Calculator />
    </Container>
  );
}

const useStyles = makeStyles((theme: Theme) =>
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

const Calculator = () => {
  const classes = useStyles();
  const history = useHistory();
  const [daily, setDaily] = useState(0);
  const [weekly, setWeekly] = useState(0);
  const [monthly, setMonthly] = useState(0);
  const [yearly, setYearly] = useState(0);
  const [value, setValue] = useState(0);

  const marksBrowser = [
    {
      value: 10,
      label: "10 eGLD",
    },
    {
      value: 300,
      label: "300 eGLD",
    },
    {
      value: 650,
      label: "650 eGLD",
    },
    {
      value: 950,
      label: "950 eGLD",
    },
    {
      value: 1250,
      label: "1250 eGLD",
    },
    {
      value: 1750,
      label: "1750 eGLD",
    },
    {
      value: 2000,
      label: "2000 eGLD",
    },
    {
      value: 2500,
      label: "2500 eGLD",
    },
  ];
  const marksMobile = [
    {
      value: 10,
      label: "10 eGLD",
    },
    {
      value: 750,
      label: "750 eGLD",
    },
    {
      value: 1500,
      label: "1500 eGLD",
    },
    {
      value: 2500,
      label: "2500 eGLD",
    },
  ];

  const getReward = (value: number) => {
    setValue(value);
  };

  useEffect(() => {
    setValue(50);
    setYearly(value * (20 / 100));
    setMonthly(yearly / 12);
    setWeekly(yearly / 52);
    setDaily(yearly / 365);
  }, []);

  useEffect(() => {
    setYearly(value * (20 / 100));
    setMonthly(yearly / 12);
    setWeekly(yearly / 52);
    setDaily(yearly / 365);
  }, [value, yearly]);

  const cards = [
    {
      label: "Daily",
      value: daily,
      className: "APRCalculator",
      showDecimals: true,
    },
    {
      label: "Weekly",
      value: weekly,
      className: "APRCalculator",
      showDecimals: true,
    },
    {
      label: "Monthly",
      value: monthly,
      className: "APRCalculator",
      showDecimals: true,
    },
    {
      label: "Yearly",
      value: yearly,
      className: "APRCalculator",
      showDecimals: true,
    },
    {
      label: "Current Value",
      value: value,
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
    <Card style={{ paddingBottom: "35px" }}>
      <CardContent>
        <Typography
          variant="h4"
          align="center"
          style={{ paddingBottom: "35px" }}
        >
          How much EGLD do you have?
        </Typography>
        <Grid
          container
          justify="center"
          style={{ padding: "24px", paddingTop: "0px" }}
        >
          <Slider
            defaultValue={50}
            min={10}
            max={2500}
            onChange={(_e, value) => getReward(value as number)}
            aria-labelledby="discrete-slider-always"
            step={1}
            marks={isMobile ? marksMobile : marksBrowser}
            valueLabelDisplay="on"
          />
        </Grid>
        <Grid container justify="center" spacing={2}>
          {isMobile && (
            <Grid container justify="center" style={{ padding: "20px" }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  history.push("/staking");
                }}
                style={{ backgroundColor: "#2146be" }}
                endIcon={<SendIcon />}
              >
                Delegate
              </Button>
            </Grid>
          )}
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
          {isBrowser && (
            <Grid container justify="center" style={{ padding: "20px" }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  history.push("/staking");
                }}
                style={{ backgroundColor: "#2146be" }}
                endIcon={<SendIcon />}
              >
                Delegate
              </Button>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};
