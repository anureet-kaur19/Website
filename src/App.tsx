import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdbreact/dist/css/mdb.css";
import { ContextProvider, useContext } from "./context";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { DashboardLayout } from "./components/Layout/Content";
import routes from "./routes";
import Login from "./pages/Login";

const App = () => {
  return (
    <Router>
      <ContextProvider>
        <DashboardLayout>
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
        </DashboardLayout>
      </ContextProvider>
      <ToastContainer />
    </Router>
  );
};
//@ts-ignore
const GuardedRoute = ({ component: Component, isProtected, ...rest }) => {
  const { loggedIn } = useContext();

  if (isProtected) {
    if (loggedIn) {
      return <Route {...rest} render={props => <Component {...props} />} />;
    } else {
      return <Login />;
    }
  } else {
    return <Route {...rest} render={props => <Component {...props} />} />;
  }
};
export default App;
