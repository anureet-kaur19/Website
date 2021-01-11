import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ContextProvider, useContext } from "./context";
import { StakingContextProvider } from "./context/Staking";
import { ToastContainer } from "react-toastify";
import "./App.css";
import MenuAppBar from "./components/Layout/Content";
import { TransactionToastsProvider } from "react-transaction-toasts";
import routes from "./routes";
import Login from "./pages/Login";

const App = () => {
  return (
    <Router>
      <TransactionToastsProvider>
        <ContextProvider>
          <MenuAppBar>
            <StakingContextProvider>
              <Switch>
                {routes.map((route, i) => (
                  <GuardedRoute
                    isProtected={route.isProtected}
                    path={route.path}
                    key={route.path + i}
                    component={route.component}
                    exact={true}
                  />
                ))}
              </Switch>
            </StakingContextProvider>
          </MenuAppBar>
        </ContextProvider>
      </TransactionToastsProvider>
      <ToastContainer />
    </Router>
  );
};
//@ts-ignore
const GuardedRoute = ({ component: Component, isProtected, ...rest }) => {
  const { loggedIn } = useContext();

  if (isProtected) {
    if (loggedIn) {
      return <Route {...rest} render={(props) => <Component {...props} />} />;
    } else {
      return <Login />;
    }
  } else {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
};
export default App;
