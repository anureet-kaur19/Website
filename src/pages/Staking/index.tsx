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
    totalRewardBalance,
    isActive,
  } = useStakingContext();
  const { Label } = useGlobalContext();

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
  if (delegateBalance !== "0") {
    entries.push({
      label: "Delegated",
      value: delegateBalance,
      icon: faBookOpen,
      showDecimals: true,
      className: "delegated",
      dataTestId: "delegated",
    });
  }
  if (totalRewardBalance !== "0") {
    entries.push({
      label: "Total Cumulated Rewards",
      value: totalRewardBalance,
      icon: faBookOpen,
      showDecimals: true,
      className: "rewards",
      dataTestId: "rewards",
    });
  }
  if (rewardBalance !== "0") {
    entries.push({
      label: "Reward",
      value: rewardBalance,
      icon: faWonSign,
      showDecimals: true,
      className: "rewards",
      dataTestId: "rewards",
    });
  }
  if (unStakedBalance !== "0") {
    entries.push({
      label: "Waiting Period",
      value: unStakedBalance,
      icon: faBookOpen,
      showDecimals: true,
      className: "delegated",
      dataTestId: "delegated",
    });
  }
  if (unBondableBalance !== "0") {
    entries.push({
      label: "Available to withdraw",
      value: unBondableBalance,
      icon: faBookOpen,
      showDecimals: true,
      className: "available",
      dataTestId: "unstaked",
    });
  }

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
                erdLabel={Label}
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
      {isActive && delegateBalance !== "0" ? (
        <Calculator balance={delegateBalance} />
      ) : null}
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
  const {
    delegateBalance,
    unBondableBalance,
    rewardBalance,
  } = useStakingContext();
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
              {delegateBalance !== "0" ? <UnDelegateForm /> : null}
              {unBondableBalance !== "0" ? <WithdrawForm /> : null}
              {rewardBalance !== "0" ? <ClaimRewardsForm /> : null}
              {rewardBalance !== "0" ? <ReDelegateRewardsForm /> : null}
            </div>
          </div>
        </div>
      </Grid>
    </div>
  );
};

const DelegateForm = () => {
  const classes = useStyles();
  const { USD, Label } = useGlobalContext();
  const { balance, stakingSC } = useStakingContext();
  const [amount, setAmount] = useState("0");
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
    setAmount((parseFloat(maxAmount) - 0.005).toString());
  };

  const delegate = useCallback(async () => {
    if (parseFloat(amount) < 10) {
      toast.error(
        `Your delegation amount is under the minimum value of 10 ${Label}!`
      );
      return;
    }
    if (parseFloat(amount) > parseFloat(maxAmount)) {
      toast.error(
        `Your delegation amount is above your available balance!`
      );
      return;
    }
    try {
      setSpinner(true);
      await stakingSC.delegate(amount);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setAmount("0");
      setSpinner(false);
      setOpen(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
                      <InputAdornment position="start">{Label}</InputAdornment>
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
                  <small className="form-text text-secondary mt-0">
                    Available: {maxAmount}{" "}{Label}
                  </small>
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
  const { USD, Label } = useGlobalContext();
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
    const checkAmount = parseFloat(maxAmount) - parseFloat(amount);
    if (checkAmount < 10 && checkAmount > 0) {
      toast.error(`You cannot keep under 10 ${Label} delegated! Use the Max button!`);
      return;
    }
    if (parseFloat(amount) < 10) {
      toast.error(`You cannot undelegate less than 10 ${Label}!`);
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
                      min: 10,
                      max: maxAmount,
                    }}
                    required
                    startAdornment={
                      <InputAdornment position="start">{Label}</InputAdornment>
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
                  <small className="form-text text-secondary mt-0">
                    Available: {maxAmount}{" "}{Label}
                  </small>
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

const WithdrawForm = () => {
  const classes = useStyles();
  const { stakingSC, unBondableBalance } = useStakingContext();
  const { USD, Label } = useGlobalContext();
  const [spinner, setSpinner] = useState(false);
  const [open, setOpen] = useState(false);

  const maxAmount = denominate({
    input: unBondableBalance,
    denomination: 18,
    decimals: 18,
    showLastNonZeroDecimal: false,
    addCommas: false,
  });

  const USDAmountInit = usdValue({
    amount: maxAmount,
    usd: USD,
  });

  const [USDAmount, setUSDAmount] = useState(USDAmountInit);

  useEffect(() => {
    setUSDAmount(USDAmountInit);
  }, [USDAmountInit, setUSDAmount]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const withdraw = async () => {
    try {
      setSpinner(true);
      await stakingSC.withdraw();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSpinner(false);
      setOpen(false);
    }
  };

  return (
    <>
      <Button color="primary" onClick={handleClickOpen} variant="contained">
        Withdraw
      </Button>
      <Dialog
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Withdraw
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
                    value={maxAmount}
                    type={"number"}
                    disabled
                    startAdornment={
                      <InputAdornment position="start">{Label}</InputAdornment>
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
                        label="I acknowledge that my funds will be sent to my wallet"
                      />
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography color="textSecondary">
                        The withdraw process is the last step where your funds
                        will be available in your wallet.
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
                withdraw();
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

const ClaimRewardsForm = () => {
  const classes = useStyles();
  const { stakingSC, rewardBalance } = useStakingContext();
  const { USD, Label } = useGlobalContext();
  const [spinner, setSpinner] = useState(false);
  const [open, setOpen] = useState(false);

  const maxAmount = denominate({
    input: rewardBalance,
    denomination: 18,
    decimals: 18,
    showLastNonZeroDecimal: false,
    addCommas: false,
  });

  const USDAmountInit = usdValue({
    amount: maxAmount,
    usd: USD,
  });

  const [USDAmount, setUSDAmount] = useState(USDAmountInit);

  useEffect(() => {
    setUSDAmount(USDAmountInit);
  }, [USDAmountInit, setUSDAmount]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const claimReward = async () => {
    try {
      setSpinner(true);
      await stakingSC.claimRewards();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSpinner(false);
      setOpen(false);
    }
  };

  return (
    <>
      <Button color="primary" onClick={handleClickOpen} variant="contained">
        Claim Reward
      </Button>
      <Dialog
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Claim Reward
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
                    value={maxAmount}
                    type={"number"}
                    disabled
                    startAdornment={
                      <InputAdornment position="start">{Label}</InputAdornment>
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
                        label="I acknowledge that my reward will be sent to my wallet"
                      />
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography color="textSecondary">
                        The claim reward process is the last step where your
                        funds will be available in your wallet.
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
                claimReward();
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

const ReDelegateRewardsForm = () => {
  const classes = useStyles();
  const { stakingSC, rewardBalance } = useStakingContext();
  const { USD, Label } = useGlobalContext();
  const [spinner, setSpinner] = useState(false);
  const [open, setOpen] = useState(false);

  const maxAmount = denominate({
    input: rewardBalance,
    denomination: 18,
    decimals: 18,
    showLastNonZeroDecimal: false,
    addCommas: false,
  });

  const USDAmountInit = usdValue({
    amount: maxAmount,
    usd: USD,
  });

  const [USDAmount, setUSDAmount] = useState(USDAmountInit);

  useEffect(() => {
    setUSDAmount(USDAmountInit);
  }, [USDAmountInit, setUSDAmount]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const reDelegateReward = async () => {
    try {
      setSpinner(true);
      await stakingSC.reDelegateRewards();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSpinner(false);
      setOpen(false);
    }
  };

  return (
    <>
      <Button color="primary" onClick={handleClickOpen} variant="contained">
        ReDelegate Rewards
      </Button>
      <Dialog
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          ReDelegate Rewards
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
                    value={maxAmount}
                    type={"number"}
                    disabled
                    startAdornment={
                      <InputAdornment position="start">{Label}</InputAdornment>
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
                        label="I acknowledge that my reward will be added back to the delegation contract"
                      />
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography color="textSecondary">
                        The re-delegation reward process will add your funds
                        back to the delegation contract. This action is often
                        called compounding.
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
                reDelegateReward();
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
