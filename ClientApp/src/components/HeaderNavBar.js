import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar, NavLink, NavItem, NavbarBrand, Tooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import './header-nav-bar.scss';
import logo from '../styles/img/logo2.png';
import LayoutContext from '../contexts/LayoutContext';
import HeaderCustomButtons from './Header/HeaderCustomButtons';
import AppVersion from './Header/AppVersion';
import UserDropdown from './Header/UserDropdown';
import PageTitle from './Header/PageTitle'

const HeaderNavBar = () => {
    const { t } = useTranslation();
    const { toggleSideBar } = useContext(LayoutContext);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    return (
        <Navbar>
            <div className="left">
                <NavbarBrand tag={Link} to="/">
                    <img src={logo} alt="logo" />
                    <span>ISPSecurity</span>
                </NavbarBrand>
                <AppVersion />
                <button id="toggle-side-bar" onClick={toggleSideBar} className="anchor">
                    <i className="icon-reorder"></i>
                </button>
                <Tooltip
                    placement="bottom"
                    isOpen={tooltipOpen}
                    target={"toggle-side-bar"}
                    toggle={() => setTooltipOpen(!tooltipOpen)}
                    delay={{show: 0, hide: 0}}
                >
                    Toggle navigation
                </Tooltip>
                <PageTitle />
            </div>
            <ul>
                <HeaderCustomButtons />
                <NavItem>
                    <NavLink tag={Link} to="/"><i className="icon-question"></i>{t('HELP')}</NavLink>
                </NavItem>
                <NavItem>
                    <UserDropdown />
                </NavItem>
            </ul>
        </Navbar>
    );
}

export default HeaderNavBar;