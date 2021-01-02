import React from "react";
import Home from "./pages/Home";
import withPageTitle from "./components/PageTitle";
import Lottery from "./pages/Lottery";
import Staking from "./pages/Staking";
import Stats from "./pages/Stats";

interface RouteType {
  path: string;
  title: string;
  component: any;
}

const routes: RouteType[] = [
  {
    path: "/",
    title: "Home",
    component: Home
  },
  {
    path: "/staking",
    title: "Staking",
    component: Staking
  },
  {
    path: "/lottery",
    title: "Lottery",
    component: Lottery
  },
  {
    path: "/stats",
    title: "Stats",
    component: Stats
  }
];

const wrappedRoutes = () => {
  return routes.map(route => {
    const title = route.title
      ? `${route.title} • Elrond | TrustStaking`
      : "Elrond | TrustStaking";
    return {
      path: route.path,
      component: (withPageTitle(
        title,
        route.component
      ) as any) as React.ComponentClass<{}, any>
    };
  });
};

export default wrappedRoutes();
