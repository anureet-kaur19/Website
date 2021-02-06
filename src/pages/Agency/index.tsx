import React from "react";
import { Card, CardContent, Container, Grid } from "@material-ui/core";
import { useGlobalContext } from "../../context/Global";
import nominate from "../../components/Nominate";
import AssetsCard from "../../components/Cards";

const Agency = () => {
  return (
    <Container>
      <DashboardControl />
    </Container>
  );
};

export default Agency;

const DashboardControl = () => {
  const { agencyInfo, Label } = useGlobalContext();
  return (
    <div>
      <Grid style={{ padding: "10px" }}>
        <div className="page-header mb-spacer no-gutters row">
          <div className="col-12 d-lg-flex justify-content-between align-items-center">
            <div>
              <span className="text-uppercase page-subtitle d-block">
                Trust Staking
              </span>
              <h3 className="page-title d-inline">Agency Dashboard</h3>
            </div>
          </div>
        </div>
      </Grid>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="stretch"
        spacing={2}
      >
      <Grid item md={4} sm={6} xs={12}>
        <Card className={`card-body APRCalculator`}>
          <CardContent>
            <p className="my-3">
              <b className="text-uppercase text-white text-nowrap">
                Agency Fee
              </b>
            </p>
            <p className={"h4 mb-0 text-white"}>{agencyInfo?.fee / 100}{" "}%</p>
            <br/>
          </CardContent>
        </Card>
      </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Card className={`card-body APRCalculator`}>
            <CardContent>
              <p className="my-3">
                <b className="text-uppercase text-white text-nowrap">
                  Total Users
                </b>
              </p>
              <p className={"h4 mb-0 text-white"}>{agencyInfo?.numUsers}</p>
              <br/>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Card className={`card-body APRCalculator`}>
            <CardContent>
              <p className="my-3">
                <b className="text-uppercase text-white text-nowrap">
                  Total Nodes
                </b>
              </p>
              <p className={"h4 mb-0 text-white"}>{agencyInfo?.numNodes}</p>
              <br/>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <AssetsCard
            erdLabel={Label}
            showDecimals={true}
            className={"APRCalculator"}
            label={"Total Delegated"}
            value={nominate(agencyInfo?.totalStaked as string)}
          />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <AssetsCard
            erdLabel={Label}
            showDecimals={true}
            className={"APRCalculator"}
            label={"Total UnStaked"}
            value={nominate(agencyInfo?.totalUnStaked as string)}
          />
        </Grid>
      </Grid>
    </div>
  );
};
