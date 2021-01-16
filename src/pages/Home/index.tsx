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
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SendIcon from "@material-ui/icons/Send";
import AssetsCard from "../Staking/AssetCards";
import nominate from "../../components/Nominate";

export default function Home() {
  return (
    <Container style={{ padding: "5px" }}>
      <Accordions />
      <br />
      <Calculator />
    </Container>
  );
}

const Calculator = () => {
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
            <Button
              variant="contained"
              color="primary"
              size="large"
              style={{ backgroundColor: "#2146be" }}
              endIcon={<SendIcon />}
            >
              Delegate
            </Button>
          )}
          {cards.map(({ label, value, showDecimals, className }, index) => (
            <Grid key={index} xs={12} md={3} sm={6} xl={4} item>
              <AssetsCard
                key={index}
                showDecimals={showDecimals}
                className={className}
                label={label}
                value={nominate(value.toString())}
              />
            </Grid>
          ))}
          {isBrowser && (
            <Button
              variant="contained"
              color="primary"
              size="large"
              style={{ backgroundColor: "#2146be" }}
              endIcon={<SendIcon />}
            >
              Delegate
            </Button>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

const useStylesAccordion = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(20),
      flexBasis: "55.55%",
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  })
);

const Accordions = () => {
  const classes = useStylesAccordion();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Who are we?</Typography>
          <Typography className={classes.secondaryHeading}>
            Hello there!
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ul style={{ listStyle: "none" }}>
            <li>
              <Typography variant="h5" component="p" paragraph>
                We are a team of developers running nodes on Elrond Network and
                starting to build on top of this amazing technology!
              </Typography>
            </li>
            <li>
              <Typography variant="h5" component="p" paragraph>
                Following our experience in the tech domain, we decided to start
                our own Staking Agency trying to provide the best APR and
                unbound period for Elrond Network using an on-demand approach.
              </Typography>
            </li>
          </ul>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading} >
            What can we offer to you ?
          </Typography>
          <Typography className={classes.secondaryHeading}>
            Intersting question, isn't ?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ul style={{ listStyle: "none" }}>
            <li>
              <Typography variant="h5"  paragraph>
                The first APR will be set at ~20% with a withdraw period of 3
                days.
              </Typography>
            </li>
            <li>
              <Typography variant="h5" paragraph>
                Base on our on-demand staking approach we are pushing very hard
                to have the best APR on the market.
              </Typography>
            </li>
            <li>
              <Typography variant="h5" paragraph>
                We are always happy to increase the APR if you can find a better
                offer somewhere else.
              </Typography>
            </li>
            <li>
              <Typography variant="h5" paragraph>
                As transparency is a top priority for us we will announce all future
                changes on our Telegram group.
              </Typography>
            </li>
          </ul>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>Why is this website so simple ?</Typography>
          <Typography className={classes.secondaryHeading}>
            Good question my friend!
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <ul style={{ listStyle: "none" }}>
            <li>
              <Typography variant="h5"  paragraph>
                As we are sure you are here to make a new passive income stream you are not going to be impressed by a fency website design.
              </Typography>
            </li>
            <li>
              <Typography variant="h5"  paragraph>
                We focused our attention on how easy is for you to delegate and view rewards since you arrived on our website.
              </Typography>
            </li>
          </ul>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
