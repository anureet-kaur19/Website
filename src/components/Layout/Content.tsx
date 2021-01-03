import React from "react";
import BodyWrapper from "./BodyWrapper";
import Footer from "./Footer";
import { NavSidebar } from "./NavSidebar";

//@ts-ignore
export const DashboardLayout = ({ children }) => {
  return (
    <BodyWrapper>
      <div className="flex h-screen bg-gray-200">
        <NavSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="content">
            <section className="sm:flex-row flex flex-col flex-1">
              <div
                className="content-box"
                style={{ flexGrow: 3, flexBasis: "0%", padding: "50px" }}
              >
                {children}
              </div>
            </section>
          </main>
          <Footer />
        </div>
      </div>
    </BodyWrapper>
  );
};
