import React from "react";

import { useContext } from "../../context/Wallet";
import { addresses } from "../../contracts";

const Lottery = () => {
  const { address } = useContext();

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12 col-md-10 mx-auto">
          <div className="card shadow-sm rounded border-0">
            <div className="card-body p-1">
              <div className="card rounded border-0 bg-primary">
                <div className="card-body text-center p-4">
                  <div className="text-white">
                    <div className="mb-1">
                      <span className="opacity-6 mr-1">Your address:</span>
                      <span>{address}</span>
                    </div>
                    <div className="mb-4">
                      <span className="opacity-6 mr-1">Contract address:</span>
                      <span>{addresses["lottery"]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lottery;
