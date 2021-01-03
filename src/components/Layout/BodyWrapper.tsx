import React from "react";
// @ts-ignore
const BodyWrapper = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      <main className="w-full min-h-screen">{children}</main>
    </div>
  );
};

export default BodyWrapper;
