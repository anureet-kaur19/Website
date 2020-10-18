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
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// reactstrap components
import {
    Button,
    Collapse,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    Row,
    Col,
    UncontrolledTooltip,
} from 'reactstrap';
import logo from '../../assets/img/logo.png';

const NavBar = () => {
    const [collapseOpen, setCollapseOpen] = useState(false);
    const [color, setColor] = useState('navbar-transparent');
    const [collapseOut, setCollapseOut] = useState('');

    useEffect(() => {
        window.addEventListener('scroll', changeColor);
        return () => {
            window.removeEventListener('scroll', changeColor);
        };
    });
    const toggleCollapse = () => {
        document.documentElement.classList.toggle('nav-open');
        setCollapseOpen(!collapseOpen);
    };

    const onCollapseExiting = () => {
        setCollapseOut('collapsing-out');
    };

    const onCollapseExited = () => {
        setCollapseOut('');
    };
    const changeColor = () => {
        if (document.documentElement.scrollTop >= 99 || document.body.scrollTop >= 99) {
            setColor('bg-info');
        } else if (document.documentElement.scrollTop <= 100 || document.body.scrollTop <= 100) {
            setColor('navbar-transparent');
        }
    };
    return (
        <Navbar className={'fixed-top ' + color} color-on-scroll="100" expand="lg">
            <Container>
                <div className="navbar-translate">
                    <NavbarBrand to="/" id="navbar-brand" tag={Link}>
                        <img
                            src={logo}
                            style={{ borderRadius: '50%', width: '100px', height: '100px' }}
                            alt="Trust Staking"
                        />
                    </NavbarBrand>
                    <UncontrolledTooltip placement="bottom" target="navbar-brand">
                        PoS service running on Amazon AWS infrastucture
                    </UncontrolledTooltip>
                    <button
                        aria-expanded={collapseOpen}
                        className="navbar-toggler navbar-toggler"
                        onClick={toggleCollapse}
                    >
                        <span className="navbar-toggler-bar bar1" />
                        <span className="navbar-toggler-bar bar2" />
                        <span className="navbar-toggler-bar bar3" />
                    </button>
                </div>
                <Collapse
                    className={'justify-content-end ' + collapseOut}
                    navbar
                    isOpen={collapseOpen}
                    onExiting={onCollapseExiting}
                    onExited={onCollapseExited}
                >
                    <div className="navbar-collapse-header">
                        <Row>
                            <Col className="collapse-brand" xs="6">
                                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                    Trust Staking
                                </a>
                            </Col>
                            <Col className="collapse-close text-right" xs="6">
                                <button
                                    aria-expanded={collapseOpen}
                                    className="navbar-toggler"
                                    onClick={toggleCollapse}
                                >
                                    <i className="tim-icons icon-simple-remove" />
                                </button>
                            </Col>
                        </Row>
                    </div>
                    <Nav navbar>
                        <NavItem className="p-0">
                            <NavLink
                                data-placement="bottom"
                                href="https://twitter.com/TrustStaking"
                                rel="noopener noreferrer"
                                target="_blank"
                                title="Follow us on Twitter"
                            >
                                <i className="fa fa-twitter" />
                                <p className="d-lg-none d-xl-none">Twitter</p>
                            </NavLink>
                        </NavItem>
                        <NavItem className="p-0">
                            <NavLink
                                data-placement="bottom"
                                href="https://www.linkedin.com/company/TrustStaking"
                                rel="noopener noreferrer"
                                target="_blank"
                                title="Follow us on Linkedin"
                            >
                                <i className="fa fa-linkedin-square" />
                                <p className="d-lg-none d-xl-none">LinkedIn</p>
                            </NavLink>
                        </NavItem>
                        <NavItem className="p-0">
                            <NavLink
                                data-placement="bottom"
                                href="https://www.instagram.com/TrustStaking"
                                rel="noopener noreferrer"
                                target="_blank"
                                title="Follow us on Instagram"
                            >
                                <i className="fa fa-instagram" />
                                <p className="d-lg-none d-xl-none">Instagram</p>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <Button className="nav-link d-none d-lg-block" color="primary" tag={Link} to={'/stake'}>
                                <i className="tim-icons icon-spaceship" /> Stake with us
                            </Button>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
