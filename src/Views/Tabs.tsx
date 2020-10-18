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
import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
// @ts-ignore
import Nouislider from 'react-nouislider';
// reactstrap components
import {
    TabContent,
    TabPane,
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Nav,
    NavItem,
    NavLink,
    Table,
} from 'reactstrap';

const EGLDStakeReward: React.FunctionComponent = () => {
    const [value, setValue] = useState(100);
    const [reward, setReward] = useState('2.9');
    const [dailyReward, setDailyReward] = useState('2.9');
    const [weeklyReward, setWeeklyReward] = useState('2.9');
    const [monthlyReward, setMonthlyReward] = useState('2.9');
    const APRDelegator = 26;
    const APRValidator = 36;

    const getAPR = (value: number) => {
        setValue(value);
        const rewardPerYear = (APRDelegator / 100) * value;
        const rewardPerYearValidator = (APRValidator / 100) * value;
        const profit = rewardPerYearValidator - rewardPerYear;
        setDailyReward((profit / 365).toFixed(2));
        setWeeklyReward((profit / 52).toFixed(2));
        setMonthlyReward((profit / 12).toFixed(2));
        setReward(profit.toFixed(2));
    };

    useEffect(() => {
        getAPR(value);
    }, []);

    return (
        <>
            <Nouislider
                pips={{
                    mode: 'range',
                    density: 3,
                }}
                onChange={getAPR}
                value={value}
                range={{ min: 10, max: 20000 }}
                start={[100]}
                tooltips
            />
            <Table borderless>
                <thead>
                    <tr>
                        <th>Daily</th>
                        <th>Weekly</th>
                        <th>Monthly</th>
                        <th>Yearly</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{dailyReward} eGLD</td>
                        <td>{weeklyReward} eGLD</td>
                        <td>{monthlyReward} eGLD</td>
                        <td>{reward} eGLD</td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
};
const Tabs = () => {
    const [iconTabs, setIconTabs] = useState(1);
    const [textTabs, setTextTabs] = useState(4);
    const toggleTabs = (e: any, stateName: string, index: number) => {
        e.preventDefault();
        if (stateName === 'iconTabs') {
            setIconTabs(index);
        } else {
            setTextTabs(index);
        }
    };
    return (
        <div className="section section-tabs">
            <Container>
                <Row>
                    <Col md="12" xl="12">
                        <Card>
                            <CardHeader>
                                <Nav className="nav-tabs-info" role="tablist" tabs>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({
                                                active: textTabs === 4,
                                            })}
                                            onClick={(e) => toggleTabs(e, 'textTabs', 4)}
                                            href="#pablo"
                                        >
                                            Profile
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({
                                                active: textTabs === 5,
                                            })}
                                            onClick={(e) => toggleTabs(e, 'textTabs', 5)}
                                            href="#pablo"
                                        >
                                            Settings
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({
                                                active: textTabs === 6,
                                            })}
                                            onClick={(e) => toggleTabs(e, 'textTabs', 6)}
                                            href="#pablo"
                                        >
                                            Options
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </CardHeader>
                            <CardBody>
                                <TabContent className="tab-space" activeTab={'link' + textTabs}>
                                    <TabPane tabId="link4">
                                        <p>
                                            These cases are perfectly simple and easy to distinguish. In a free hour,
                                            when our power of choice is untrammelled and when nothing prevents our being
                                            able to do what we like best, every pleasure is to be welcomed and every
                                            pain avoided. <br />
                                            But in certain circumstances and owing to the claims of duty or the
                                            obligations of business it will frequently occur that pleasures
                                        </p>
                                    </TabPane>
                                    <TabPane tabId="link5">
                                        <p>
                                            I will be the leader of a company that ends up being worth billions of
                                            dollars, because I got the answers. I understand culture. I am the nucleus.
                                            I think that’s a responsibility that I have, to push possibilities, to show
                                            people, this is the level that things could be at. I think that’s a
                                            responsibility that I have, to push possibilities, to show people, this is
                                            the level that things could be at.
                                        </p>
                                    </TabPane>
                                    <TabPane tabId="link6">
                                        <p>
                                            I think that’s a responsibility that I have, to push possibilities, to show
                                            people, this is the level that things could be at. So when you get something
                                            that has the name Kanye West on it, it’s supposed to be pushing the furthest
                                            possibilities. I will be the leader of a company that ends up being worth
                                            billions of dollars, because I got the answers. I understand culture. I am
                                            the nucleus.
                                        </p>
                                    </TabPane>
                                </TabContent>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default EGLDStakeReward;
