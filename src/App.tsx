import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ContextProvider } from "./context";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { DashboardLayout } from "./components/Layout/Content";
import routes from "./routes";

const App = () => {

  return (
    <Router>
      <ContextProvider>
        <DashboardLayout>
          <Switch>
            {routes.map((route, i) => (
              <Route
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

export default App;