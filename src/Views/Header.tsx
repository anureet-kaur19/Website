/*!

=========================================================
* BLK Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react';

// reactstrap components
import {
    Button,
    Card,
    CardBody,
    CardTitle,
    Container,
    Row,
    Col,
} from 'reactstrap';
import EGLDStakeReward from './Tabs';

const PageHeader = () => {
    return (
        <Container style={{ paddingTop: '150px' }}>
            <div className="wrapper">
                <div className="content-center">
                    <Row className="row-grid justify-content-between align-items-center text-left">
                        <Col lg="6" md="6">
                            <h1 className="text-white">
                                We keep your tokens <br />
                                <span className="text-white">secured</span>
                            </h1>
                            <p className="text-white mb-3">
                                Our servers are full hosted on Amazon AWS the best cloud company in the world.
                            </p>
                        </Col>
                        <Col lg="4" md="5">
                            <img alt="..." className="img-fluid" src={require('../assets/img/elrondGold.png')} />
                        </Col>
                    </Row>
                </div>
                <section className="section section-lg">
                    <Row className="justify-content-center">
                        <Col lg="12">
                            <Row className="row-grid justify-content-center">
                                <Col lg="3">
                                    <div className="info">
                                        <div className="icon icon-primary">
                                            <i className="tim-icons icon-money-coins" />
                                        </div>
                                        <h4 className="info-title">Low Commission</h4>
                                        <hr className="line-primary" />
                                        <p>
                                            We are trying to keep the reward at the highes percentage possible starting
                                            from a minimum of <span> 30% APR </span>
                                        </p>
                                    </div>
                                </Col>
                                <Col lg="3">
                                    <div className="info">
                                        <div className="icon icon-warning">
                                            <i className="tim-icons icon-chart-pie-36" />
                                        </div>
                                        <h4 className="info-title">High Incomes</h4>
                                        <hr className="line-warning" />
                                        <p>
                                            Having a low profit our delegators will be able to receive more rewards. Our
                                            profit will be as minimum as possible trying to cover just the
                                            infrastructure cost.
                                        </p>
                                    </div>
                                </Col>
                                <Col lg="3">
                                    <EGLDStakeReward />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </section>
                <section className="section section-lg section-safe">
                    <img alt="..." className="path" src={require('../assets/img/path5.png')} />
                    <Container>
                        <Row className="row-grid justify-content-between">
                            <Col md="5">
                                <img
                                    alt="..."
                                    className="img-fluid floating"
                                    src={require('../assets/img/chester-wade.jpg')}
                                />
                                <Card className="card-stats bg-danger">
                                    <CardBody>
                                        <div className="justify-content-center">
                                            <div className="numbers">
                                                <CardTitle tag="p">100%</CardTitle>
                                                <p className="card-category text-white">Safe</p>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                                <Card className="card-stats bg-info">
                                    <CardBody>
                                        <div className="justify-content-center">
                                            <div className="numbers">
                                                <CardTitle tag="p">10</CardTitle>
                                                <p className="card-category text-white">Satisfied customers</p>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                                <Card className="card-stats bg-default">
                                    <CardBody>
                                        <div className="justify-content-center">
                                            <div className="numbers">
                                                <CardTitle tag="p">29 %</CardTitle>
                                                <p className="card-category text-white">APR</p>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md="6">
                                <div className="px-md-5">
                                    <hr className="line-success" />
                                    <h3>Awesome features</h3>
                                    <p>
                                        The design system comes with three pre-built pages to help you get started
                                        faster. You can change the text and images and you're good to go.
                                    </p>
                                    <ul className="list-unstyled mt-5">
                                        <li className="py-2">
                                            <div className="d-flex align-items-center">
                                                <div className="icon icon-success mb-2">
                                                    <i className="tim-icons icon-vector" />
                                                </div>
                                                <div className="ml-3">
                                                    <h6>Ledger integration directly in our platform</h6>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="py-2">
                                            <div className="d-flex align-items-center">
                                                <div className="icon icon-success mb-2">
                                                    <i className="tim-icons icon-tap-02" />
                                                </div>
                                                <div className="ml-3">
                                                    <h6>Flexible plan options</h6>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="py-2">
                                            <div className="d-flex align-items-center">
                                                <div className="icon icon-success mb-2">
                                                    <i className="tim-icons icon-single-02" />
                                                </div>
                                                <div className="ml-3">
                                                    <h6>Super friendly support team</h6>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        </Container>
    );
};

export default PageHeader;
