import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';

const UserDropdown = () => {
    const { username } = useContext(UserContext);
    const { t } = useTranslation();
    const [isOpen, setOpen] = useState(false);
    const toggleOpen = () => setOpen(!isOpen);

    return (
        <Dropdown isOpen={isOpen} toggle={toggleOpen}>
            <DropdownToggle tag="div" className="anchor" caret>
                <i className="icon-male"></i>
                <span className="username">
                    {username}
                </span>
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem tag={Link} to="/">
                    <i className="icon-eye-open"></i>
                    {t('SPECTATE_MODE')}
                </DropdownItem>
                <DropdownItem tag={Link} to="/passwordchange">
                    <i className="icon-unlock-alt"></i>
                    {t('PASSWORD_CHANGE')}
                </DropdownItem>
                <DropdownItem tag={Link} to="/logout">
                    <i className="icon-key"></i>
                    {t('LOG_OUT')}
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

export default UserDropdown;