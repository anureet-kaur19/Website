import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center mt-2 mb-3">
        <p>
          <a
            {...{
              target: "_blank",
            }}
            className="align-items-center"
            href="https://elrond.com/"
          >
            Elrond Network
          </a>{" "}
          and{" "}
          <a
            {...{
              target: "_blank",
            }}
            className="align-items-center"
            href="https://truststaking.com/"
          >
            Trust Staking
          </a>
        </p>
    </footer>
  );
};

export default Footer;
