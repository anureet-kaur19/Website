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

interface FileInfo {
  id: string;
  name: string;
}

const Login = () => {
  const [value, setValue] = React.useState(0);

  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

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
        <LedgerLogin />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PEMLogin />
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
  const [files, setFiles] = React.useState<FileInfo[]>([]);
  const [jsonFile, setJSON] = React.useState("");

  const onDrop = useCallback((acceptedFiles) => {
    const onload = (fileReader: any, name: string) => (e: any) => {
      try {
        const JSONString = fileReader.result!;
        setFiles((ex) => {
          let updated = [...ex];
          updated.push({ name, id: "0" });
          return updated;
        });
        setJSON(JSONString);
      } catch (e) {
        return;
      }
    };

    acceptedFiles.forEach((file: any) => {
      const { name } = file;
      const fileReader = new FileReader();
      fileReader.onload = onload(fileReader, name);
      fileReader.readAsText(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".json",
    multiple: false,
  });

  const remove = (id: string) => {
    setFiles((existing) => {
      let updated = [...existing];
      // @ts-ignore
      updated = updated.filter((item) => item.id !== id);
      return updated;
    });
    setJSON("");
  };
  const onclick = (e: React.MouseEvent) => {
    e.preventDefault();
  };
  const disabledOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const login = async () => {
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
      <div
        {...getRootProps({
          className: `dropzone ${files.length > 0 ? "p-0" : ""}`,
        })}
      >
        <input {...getInputProps()} data-testid="inputPem" />
        {isDragActive ? (
          <div className="dropzone-area text-center">
            Drag and drop your JSON file here, or{" "}
            <a href="/" onClick={onclick}>
              Select
            </a>
          </div>
        ) : (
          <>
            {files.length > 0 ? (
              <div className="dropzone-area text-center has-file">
                {files.map(({ id, name }, i) => (
                  <div
                    key={id}
                    className={`file border rounded m-1 `}
                    onClick={disabledOnClick}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <p
                        className="ml-2 mb-0"
                        id={id}
                        data-testid={`uploadLabel${i}`}
                      >
                        {name}
                      </p>
                      <span
                        className="lead pr-2"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          remove(id);
                        }}
                        style={{
                          cursor: "pointer",
                          userSelect: "none",
                          verticalAlign: "-0.1rem",
                        }}
                      >
                        <span aria-hidden="true">×</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`dropzone-area text-center `}>
                Drag and drop your JSON file here, or{" "}
                <a href="/" onClick={onclick}>
                  Select
                </a>
              </div>
            )}
          </>
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
          <Button variant="contained" color="primary" onClick={() => login()}>
            Login
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
};

const PEMLogin = () => {
  const dispatch = useDispatch();

  const [files, setFiles] = React.useState<FileInfo[]>([]);
  const [getPEM, setPEM] = React.useState("");
  const onclick = (e: React.MouseEvent) => {
    e.preventDefault();
  };
  const disabledOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const remove = (id: string) => {
    setFiles((existing) => {
      let updated = [...existing];
      // @ts-ignore
      updated = updated.filter((item) => item.id !== id);
      return updated;
    });
    setPEM("");
  };
  const login = async () => {
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
    const onload = (fileReader: any, name: string) => (e: any) => {
      try {
        const pemString = fileReader.result!;
        setFiles((ex) => {
          let updated = [...ex];
          updated.push({ name, id: "0" });
          return updated;
        });
        setPEM(pemString);
      } catch (e) {
        return;
      }
    };

    acceptedFiles.forEach((file: any) => {
      const { name } = file;
      const fileReader = new FileReader();
      fileReader.onload = onload(fileReader, name);
      fileReader.readAsText(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".pem",
    multiple: false,
  });
  return (
    <Box textAlign="center" paddingTop={"15px"}>
      <Box paddingBottom={"15px"}>
        <div
          {...getRootProps({
            className: `dropzone ${files.length > 0 ? "p-0" : ""}`,
          })}
        >
          <input {...getInputProps()} data-testid="inputPem" />
          {isDragActive ? (
            <div className="dropzone-area text-center">
              Drag and drop your PEM here, or{" "}
              <a href="/" onClick={onclick}>
                Select
              </a>
            </div>
          ) : (
            <>
              {files.length > 0 ? (
                <div className="dropzone-area text-center has-file">
                  {files.map(({ id, name }, i) => (
                    <div
                      key={id}
                      className={`file border rounded m-1 `}
                      onClick={disabledOnClick}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <p
                          className="ml-2 mb-0"
                          id={id}
                          data-testid={`uploadLabel${i}`}
                        >
                          {name}
                        </p>
                        <span
                          className="lead pr-2"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            remove(id);
                          }}
                          style={{
                            cursor: "pointer",
                            userSelect: "none",
                            verticalAlign: "-0.1rem",
                          }}
                        >
                          <span aria-hidden="true">×</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`dropzone-area text-center `}>
                  Drag and drop your PEM here, or{" "}
                  <a href="/" onClick={onclick}>
                    Select
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      </Box>
      <Button variant="contained" color="primary" onClick={() => login()}>
        Login
      </Button>
    </Box>
  );
};

const LedgerLogin = () => {
  const dispatch = useDispatch();
  const login = async () => {
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
  return (
    <>
      <Box textAlign="center">
        <Ledger height={"150px"} width={"200px"} />
      </Box>
      <Box textAlign="center" fontWeight="fontWeightBold" fontFamily={"Roboto"}>
        <Typography variant={"h3"}>Connect Ledger</Typography>
      </Box>
      <Box textAlign="center" fontFamily={"Arial"}>
        <Typography>
          Unlock your device and open the Elrond App before Login
        </Typography>
      </Box>
      <Box textAlign="center" paddingTop={"15px"}>
        <Button variant="contained" color="primary" onClick={login}>
          Login
        </Button>
      </Box>
    </>
  );
};
export default Login;
