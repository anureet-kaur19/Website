import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import RedirectTo from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { ReactComponent as Logo } from "../../assets/img/logo.svg";
import { Link } from "react-router-dom";
import LayersIcon from "@material-ui/icons/Layers";
import StorageOutlinedIcon from '@material-ui/icons/StorageOutlined';
import TelegramIcon from "@material-ui/icons/Telegram";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import HomeIcon from "@material-ui/icons/Home";
import { useContext, useDispatch } from "../../context/Wallet";
import {
  Box,
  FormControl,
  ListSubheader,
  MenuItem,
  Select,
} from "@material-ui/core";
import { isMobile } from "react-device-detect";
import { useGlobalContext, useGlobalDispatch } from "../../context/Global";
import { useTranslation } from 'react-i18next';

function Copyright() {
  return (
    <Typography variant="body2" color="inherit" align="center">
      {"Copyright © "}
      <RedirectTo color="inherit" href="https://truststaking.com/">
        Trust Staking (Testing Phase)
      </RedirectTo>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 25, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#fe8646",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    flexDirection: "column",
    minHeight: "100vh",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    minHeight: "86vh",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    flexGrow: 1,
    color: "white",
    backgroundColor: "#fe8646",
    overflow: "auto",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 30,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

// @ts-ignore
export default function Dashboard({ children }) {
  const classes = useStyles();
  const { loggedIn } = useContext();
  const { LNG } = useGlobalContext();
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const dispatchGlobal = useGlobalDispatch();
  const [open, setOpen] = React.useState(isMobile ? false : true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout = () => {
    dispatch({ type: "logout" });
  };

  const handleChange = (event: any) => {
    const language = event.target.value as string;
    i18n.changeLanguage(language)
    dispatchGlobal({ type: "language", language});
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="b"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Trust Staking
          </Typography>
          {loggedIn && (
            <IconButton
              color="inherit"
              onClick={() => {
                logout();
              }}
            >
              <ExitToAppIcon />
            </IconButton>
          )}
          <FormControl className={classes.formControl}>
            <Select
              value={LNG}
              onChange={handleChange}
            >
              <MenuItem value={'en'}>EN</MenuItem>
              <MenuItem value={'ro'}>RO</MenuItem>
              {/* <MenuItem value={'it'}>IT</MenuItem> */}
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        {open ? (
          <Box textAlign="center">
            <Logo />
          </Box>
        ) : null}
        <Divider />
        <List>{mainListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          {children}
        </Container>
        <footer className={classes.footer}>
          <Container maxWidth="sm">
            <Copyright />
          </Container>
        </footer>
      </main>
    </div>
  );
}
export const mainListItems = (
  <div>
    <ListItem button component={Link} to={"/"}>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" onClick={() => {}} />
    </ListItem>
    <ListItem button component={Link} to={"/staking"}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Staking" />
    </ListItem>
    <ListItem button component={Link} to={"/agency"}>
      <ListItemIcon>
        <StorageOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Agency Stats" />
    </ListItem>
    <Divider />
    <ListSubheader inset>Follow us!</ListSubheader>
    <ListItem
      button
      component="a"
      href={"https://t.me/truststaking"}
      target="_blank"
    >
      <ListItemIcon>
        <TelegramIcon />
      </ListItemIcon>
      <ListItemText primary="Telegram" />
    </ListItem>
    <ListItem
      button
      component="a"
      href={"https://twitter.com/truststaking"}
      target="_blank"
    >
      <ListItemIcon>
        <TwitterIcon />
      </ListItemIcon>
      <ListItemText primary="Twitter" />
    </ListItem>
    <ListItem
      button
      component="a"
      href={"https://github.com/truststaking"}
      target="_blank"
    >
      <ListItemIcon>
        <GitHubIcon />
      </ListItemIcon>
      <ListItemText primary="GitHub" />
    </ListItem>
    <ListItem
      button
      component="a"
      href={"https://www.youtube.com/channel/UCeknNkwBJZhrHcPPEMHAYrg"}
      target="_blank"
    >
      <ListItemIcon>
        <YouTubeIcon />
      </ListItemIcon>
      <ListItemText primary="YouTube" />
    </ListItem>
    <ListItem
      button
      component="a"
      href={"https://www.linkedin.com/company/truststaking/"}
      target="_blank"
    >
      <ListItemIcon>
        <LinkedInIcon />
      </ListItemIcon>
      <ListItemText primary="LinkedIn" />
    </ListItem>
  </div>
);
