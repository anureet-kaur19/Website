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
import { Link } from 'react-router-dom';
import { Button, NavItem, NavLink, Nav, Container, Row, Col, UncontrolledTooltip } from 'reactstrap';

const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col md="3">
                        <h1 className="title">Trust Staking</h1>
                    </Col>
                    <Col md="3">
                        <Nav>
                            <NavItem>
                                <NavLink to="/technology" tag={Link}>
                                    Technology
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/contact" tag={Link}>
                                    Contact Us
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col md="3">
                        <Nav>
                            <NavItem>
                                <NavLink to="/team" tag={Link}>
                                    Team
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/about" tag={Link}>
                                    About
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col md="3">
                        <h3 className="title">Follow us:</h3>
                        <div className="btn-wrapper profile">
                            <Button
                                className="btn-icon btn-neutral btn-round btn-simple"
                                color="default"
                                href="https://twitter.com/TrustStaking"
                                id="tooltip622135962"
                                target="_blank"
                            >
                                <i className="fa fa-twitter" />
                            </Button>
                            <UncontrolledTooltip delay={0} target="tooltip622135962">
                                Follow us
                            </UncontrolledTooltip>
                            <Button
                                className="btn-icon btn-neutral btn-round btn-simple"
                                color="default"
                                href="https://www.linkedin.com/company/TrustStaking"
                                id="tooltip230450801"
                                target="_blank"
                            >
                                <i className="fa fa-linkedin-square" />
                            </Button>
                            <UncontrolledTooltip delay={0} target="tooltip230450801">
                                Like us
                            </UncontrolledTooltip>
                            <Button
                                className="btn-icon btn-neutral btn-round btn-simple"
                                color="default"
                                href="https://instagram.com/TrustStaking"
                                id="tooltip318450378"
                                target="_blank"
                            >
                                <i className="fa fa-instagram" />
                            </Button>
                            <UncontrolledTooltip delay={0} target="tooltip318450378">
                                Follow us
                            </UncontrolledTooltip>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
