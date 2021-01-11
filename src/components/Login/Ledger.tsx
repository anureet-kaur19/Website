import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { LedgerWallet, BasicWallet } from "elrondjs";
import { useDispatch } from "../../context";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  createStyles,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Theme,
  Typography,
} from "@material-ui/core";
import { ReactComponent as Ledger } from "../../assets/img/ledger.svg";
import TransportWebUsb from "@ledgerhq/hw-transport-webusb";
import TransportU2F from "@ledgerhq/hw-transport-u2f";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import clsx from "clsx";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const LedgerLogin = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const [getPEM, setPEM] = React.useState("");
  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const ledgerLogin = async () => {
    dispatch({ type: "loading", loading: true });
    try {
      const wallet = await LedgerWallet.connect([
        TransportWebUsb,
        TransportU2F,
      ]);
      const address = wallet.address();
      // Set this provider as default inside the app
      dispatch({ type: "setWallet", wallet });
      dispatch({ type: "login", address });
      dispatch({ type: "loginType", loginType: "Ledger" });
    } catch (error) {
      dispatch({ type: "loading", loading: false });
      toast.warn(
        "Could not initialise Ledger app, make sure Elrond app is open",
        error
      );
    }
  };

  const pemLogin = async () => {
    if (getPEM === "") {
      toast.error(
        "You have to first upload your PEM file and after use the Login!"
      );
      return;
    }
    try {
      const wallet = await BasicWallet.fromPemFileString(getPEM);
      const address = wallet.address();
      // Set this provider as default inside the app
      dispatch({ type: "setWallet", wallet });
      dispatch({ type: "login", address });
      dispatch({ type: "loginType", loginType: "PEM" });
      dispatch({ type: "PEM", PEM: Buffer.from(getPEM).toString("base64") });
    } catch (error) {
      toast.warn(error.message);
    }
  };
  const onDrop = useCallback((acceptedFiles) => {
    const onload = (fileReader: any) => (e: any) => {
      try {
        const pemString = fileReader.result!;
        setPEM(pemString);
      } catch (e) {
        return;
      }
    };

    acceptedFiles.forEach((file: any) => {
      const fileReader = new FileReader();
      fileReader.onload = onload(fileReader);
      fileReader.readAsText(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".pem",
    multiple: false,
  });

  return (
    <Paper style={{ padding: "15px" }}>
      <Box textAlign="center" fontWeight="fontWeightBold" fontFamily={"Roboto"}>
        <Typography variant="h3">Access your wallet</Typography>
      </Box>
      <Box textAlign="center" fontFamily={"Arial"}>
        <Typography variant="h6">
          Choose how you wish to access your wallet.
        </Typography>
      </Box>
      <Box textAlign="center">
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChangeTab}
          centered
          aria-label="disabled tabs example"
        >
          <Tab label="Ledger" {...a11yProps(0)} />
          <Tab label="PEM" {...a11yProps(1)} />
          <Tab label="JSON" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box textAlign="center">
          <Ledger height={"150px"} width={"200px"} />
        </Box>
        <Box
          textAlign="center"
          fontWeight="fontWeightBold"
          fontFamily={"Roboto"}
        >
          <Typography variant={"h3"}>Connect Ledger</Typography>
        </Box>
        <Box textAlign="center" fontFamily={"Arial"}>
          <Typography>
            Unlock your device and open the Elrond App before Login
          </Typography>
        </Box>
        <Box textAlign="center" paddingTop={"15px"}>
          <Button variant="contained" color="primary" onClick={ledgerLogin}>
            Login
          </Button>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box textAlign="center" paddingTop={"15px"}>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the PEM file here</p>
            ) : (
              <p>Drag and drop your PEM file here</p>
            )}
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => pemLogin()}
          >
            Login
          </Button>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <JSONLogin />
      </TabPanel>
    </Paper>
  );
};
interface State {
  password: string;
  showPassword: boolean;
}
const JSONLogin = () => {
  const dispatch = useDispatch();
  const [values, setValues] = React.useState<State>({
    password: "",
    showPassword: false,
  });
  const [jsonFile, setJSON] = React.useState("");
  const onDrop = useCallback((acceptedFiles) => {
    const onload = (fileReader: any) => (e: any) => {
      try {
        const JSONString = fileReader.result!;
        setJSON(JSONString);
      } catch (e) {
        return;
      }
    };

    acceptedFiles.forEach((file: any) => {
      const fileReader = new FileReader();
      fileReader.onload = onload(fileReader);
      fileReader.readAsText(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".json",
    multiple: false,
  });

  const JSONLogin = async () => {
    if (jsonFile === "" || values.password === "") {
      toast.error(
        "You have to first upload your JSON file, type your password and after use the Login!"
      );
      return;
    }
    try {
      const wallet = await BasicWallet.fromJsonKeyFileString(
        jsonFile,
        values.password
      );
      const address = wallet.address();
      // Set this provider as default inside the app
      dispatch({ type: "setWallet", wallet });
      dispatch({ type: "login", address });
      dispatch({ type: "loginType", loginType: "JSON" });
      let body = {
        json: jsonFile,
        pass: values.password,
      };
      dispatch({
        type: "JSON",
        JSONText: Buffer.from(JSON.stringify(body)).toString("base64"),
      });
    } catch (error) {
      toast.warn(error.message);
    }
  };
  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: "flex",
        flexWrap: "wrap",
      },
      margin: {
        margin: theme.spacing(1),
      },
      withoutLabel: {
        marginTop: theme.spacing(3),
      },
      textField: {
        width: "25ch",
      },
    })
  );
  const classes = useStyles();
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <Box textAlign="center" paddingTop={"15px"}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the JSON here</p>
        ) : (
          <p>Drag and drop your JSON file here</p>
        )}
      </div>
      <FormControl className={clsx(classes.margin, classes.textField)}>
        <InputLabel htmlFor="standard-adornment-password">
          Type your password!
        </InputLabel>
        <Input
          id="standard-adornment-password"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange("password")}
          required
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        <Box textAlign="center" padding={"15px"}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => JSONLogin()}
          >
            Login
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
};
export default LedgerLogin;
