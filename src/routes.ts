import React from "react";
import Home from "./pages/Home";
import withPageTitle from "./components/PageTitle";
import Lottery from "./pages/Lottery";
import Staking from "./pages/Staking";
import Stats from "./pages/Stats";
import Agency from "./pages/Agency";

interface RouteType {
  path: string;
  title: string;
  isProtected: boolean;
  component: any;
}

const routes: RouteType[] = [
  {
    path: "/",
    title: "Home",
    isProtected: false,
    component: Home
  },
  {
    path: "/staking",
    title: "Staking",
    isProtected: true,
    component: Staking
  },
  {
    path: "/agency",
    title: "Agency",
    isProtected: false,
    component: Agency
  },
  {
    path: "/lottery",
    title: "Lottery",
    isProtected: true,
    component: Lottery
  },
  {
    path: "/stats",
    title: "Stats",
    isProtected: false,
    component: Stats
  }
];

const wrappedRoutes = () => {
  return routes.map(route => {
    const title = route.title
      ? `${route.title} • Elrond | TrustStaking`
      : "Elrond | TrustStaking";
    return {
      isProtected: route.isProtected,
      path: route.path,
      component: (withPageTitle(
        title,
        route.component
      ) as any) as React.ComponentClass<{}, any>
    };
  });
};

export default wrappedRoutes();
