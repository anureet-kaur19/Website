import {
  faBookOpen,
  faCheck,
  faMoneyCheck,
  faWonSign,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useCallback, useEffect } from "react";
import { useStakingContext } from "../../context/Staking";
import AssetsCard from "../../components/Cards";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import { toast } from "react-toastify";
import { useGlobalContext } from "../../context/Global";
import { usdValue } from "../../components/Cards/Stats";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import BigNumber from "bignumber.js";
import {
  FormControl,
  Grid,
  InputAdornment,
  Button,
  Dialog,
  InputLabel,
  Input,
  AccordionSummary,
  Accordion,
  AccordionDetails,
  FormControlLabel,
  DialogActions,
  IconButton,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Calculator } from "../../components/Calculator";
import denominate from "../../components/Denominate/denominate";
import { DialogContent, DialogTitle } from "../../components/Dialog";

const Staking = () => {
  const {
    balance,
    delegateBalance,
    rewardBalance,
    unBondableBalance,
    unStakedBalance,
    isActive,
  } = useStakingContext();

  const bnBalance = new BigNumber(balance.toString());

  const total = bnBalance
    .plus(delegateBalance)
    .plus(unStakedBalance)
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
      {
        label: "Waiting Period",
        value: unStakedBalance,
        icon: faBookOpen,
        showDecimals: true,
        className: "available",
        dataTestId: "unstaked",
      },
      {
        label: "Available to withdraw",
        value: unBondableBalance,
        icon: faBookOpen,
        showDecimals: true,
        className: "available",
        dataTestId: "unstaked",
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
    <Container>
      <DashboardControl />
      <Grid container justify="center" spacing={2}>
        {entries.map(
          (
            { label, value, icon, className, dataTestId, showDecimals },
            index
          ) => (
            <Grid key={index} xs={12} md={3} sm={6} xl={3} item>
              <AssetsCard
                key={index}
                icon={icon}
                showDecimals={showDecimals}
                dataTestId={dataTestId}
                className={className}
                label={label}
                value={value.toString()}
              />
            </Grid>
          )
        )}
      </Grid>
      {isActive ? <Calculator balance={delegateBalance} /> : null}
    </Container>
  );
};

export default Staking;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexWrap: "wrap",
    },
    margin: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    textField: {
      width: "25ch",
    },
  })
);

const DashboardControl = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid style={{ padding: "10px" }}>
        <div className="page-header mb-spacer no-gutters row">
          <div className="col-12 d-lg-flex justify-content-between align-items-center">
            <div>
              <span className="text-uppercase page-subtitle d-block">
                Trust Staking
              </span>
              <h3 className="page-title d-inline">Delegation Dashboard</h3>
            </div>
            <div className={classes.margin}>
              <DelegateForm />
              <UnDelegateForm />
            </div>
          </div>
        </div>
      </Grid>
    </div>
  );
};

const DelegateForm = () => {
  const classes = useStyles();
  const { USD } = useGlobalContext();
  const { balance, stakingSC } = useStakingContext();
  const [amount, setAmount] = useState("10");
  const [spinner, setSpinner] = useState(false);
  const [open, setOpen] = useState(false);
  const USDAmountInit = usdValue({
    amount,
    usd: USD,
  });
  const [USDAmount, setUSDAmount] = useState(USDAmountInit);
  const maxAmount = denominate({
    input: balance,
    denomination: 18,
    decimals: 3,
    showLastNonZeroDecimal: false,
    addCommas: false,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (amount) {
      const result = usdValue({
        amount,
        usd: USD,
      });
      setUSDAmount(result);
    } else {
      setUSDAmount("0");
    }
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (value: string) => {
    setAmount(value);
  };

  const setMaxAmount = () => {
    setAmount((parseFloat(maxAmount) - 0.001).toString());
  };

  const delegate = useCallback(async () => {
    if (parseFloat(amount) < 10 || null) {
      toast.error(
        "Your delegation amount is under the minimum value of 10 eGLD!"
      );
      return;
    }
    try {
      setSpinner(true);
      await stakingSC.delegate(amount);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setAmount("10");
      setSpinner(false);
      setOpen(false);
    }
  }, [amount, stakingSC]);

  return (
    <>
      <Button color="primary" onClick={handleClickOpen} variant="contained">
        Delegate
      </Button>
      <Dialog
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Delegation
        </DialogTitle>
        <DialogContent dividers>
          {spinner && (
            <Backdrop className={classes.backdrop} open={spinner}>
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
          <Grid container justify="center">
            <div className={classes.root}>
              <div>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="standard"
                >
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Amount ${USDAmount}
                  </InputLabel>
                  <Input
                    id="outlined-adornment-amount"
                    value={amount}
                    onChange={(e) => {
                      handleChange(e.target.value);
                    }}
                    type={"number"}
                    inputProps={{
                      min: 10,
                      step: "0.001",
                      max: maxAmount,
                    }}
                    required
                    startAdornment={
                      <InputAdornment position="start">eGLD</InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            setMaxAmount();
                          }}
                          size="small"
                          edge="end"
                        >
                          Max
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <div className={classes.root}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-label="Expand"
                      aria-controls="additional-actions1-content"
                      id="additional-actions1-header"
                    >
                      <FormControlLabel
                        aria-label="Acknowledge"
                        onClick={(event) => event.stopPropagation()}
                        onFocus={(event) => event.stopPropagation()}
                        control={<></>}
                        label="I acknowledge that I know where my funds will be stored"
                      />
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography color="textSecondary">
                        Delegation process is sending the funds direct to our
                        Smart Contract generated by Elrond Team. Your
                        delegation/reward amount can be added/withdrawed just by
                        your wallet.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-label="Expand"
                      aria-controls="additional-actions2-content"
                      id="additional-actions2-header"
                    >
                      <FormControlLabel
                        aria-label="Acknowledge"
                        onClick={(event) => event.stopPropagation()}
                        onFocus={(event) => event.stopPropagation()}
                        control={<></>}
                        label="I acknowledge that I am aware of the 10 days waiting time for any withdraw"
                      />
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography color="textSecondary">
                        There will be a 10 days waiting time after deciding to
                        initiate a withdrawal.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>
            </div>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container justify="center">
            <Button
              autoFocus
              onClick={() => {
                delegate();
              }}
              color="primary"
            >
              Confirm
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

const UnDelegateForm = () => {
  const classes = useStyles();
  const { stakingSC, delegateBalance } = useStakingContext();
  const { USD } = useGlobalContext();
  const [amount, setAmount] = useState("10");
  const [spinner, setSpinner] = useState(false);
  const [open, setOpen] = useState(false);
  const USDAmountInit = usdValue({
    amount,
    usd: USD,
  });

  const [USDAmount, setUSDAmount] = useState(USDAmountInit);
  const maxAmount = denominate({
    input: delegateBalance,
    denomination: 18,
    decimals: 18,
    showLastNonZeroDecimal: false,
    addCommas: false,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (amount) {
      const result = usdValue({
        amount,
        usd: USD,
      });
      setUSDAmount(result);
    } else {
      setUSDAmount("0");
    }
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (value: string) => {
    setAmount(value);
  };

  const setMaxAmount = () => {
    setAmount(maxAmount);
  };

  const unDelegate = async () => {
    if (parseFloat(amount) > parseFloat(maxAmount) || null) {
      toast.error("Your amount is above your delegated amount!");
      return;
    }
    try {
      setSpinner(true);
      await stakingSC.unDelegate(amount);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setAmount("10");
      setSpinner(false);
      setOpen(false);
    }
  };

  return (
    <>
      <Button color="primary" onClick={handleClickOpen} variant="contained">
        UnDelegate
      </Button>
      <Dialog
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Undelegation
        </DialogTitle>
        <DialogContent dividers>
          {spinner && (
            <Backdrop className={classes.backdrop} open={spinner}>
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
          <Grid container justify="center">
            <div className={classes.root}>
              <div>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="standard"
                >
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Amount ${USDAmount}
                  </InputLabel>
                  <Input
                    id="outlined-adornment-amount"
                    value={amount}
                    onChange={(e) => {
                      handleChange(e.target.value);
                    }}
                    type={"number"}
                    inputProps={{
                      min: 0,
                      max: maxAmount,
                    }}
                    required
                    startAdornment={
                      <InputAdornment position="start">eGLD</InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            setMaxAmount();
                          }}
                          size="small"
                          edge="end"
                        >
                          Max
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <div className={classes.root}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-label="Expand"
                      aria-controls="additional-actions1-content"
                      id="additional-actions1-header"
                    >
                      <FormControlLabel
                        aria-label="Acknowledge"
                        onClick={(event) => event.stopPropagation()}
                        onFocus={(event) => event.stopPropagation()}
                        control={<></>}
                        label="I acknowledge that I am aware of the 10 days waiting time for any withdraw"
                      />
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography color="textSecondary">
                        UnDelegation process is requesting your funds to be
                        unlocked from our contract. This process will hold your
                        money for 10 days. After 10 days you can request to move
                        your funds to your wallet.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>
            </div>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container justify="center">
            <Button
              autoFocus
              onClick={() => {
                unDelegate();
              }}
              color="primary"
            >
              Confirm
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};
