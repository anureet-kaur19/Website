import React from "react";

const Stats = () => {
  return (
    <div id="statsFrame">
      {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
      <iframe
        id="iframe1"
        scrolling="no"
        src="https://explorer.elrond.com/identities/truststaking"
      />
    </div>
  );
};

export default Stats;
