import React from 'react';
import CollapsableItem from './SideBarItem/CollapsableItem';
import FinalItem from './SideBarItem/FinalItem';
import { renderMenus } from '../SideBar';

const SideBarItem = props => {
    if (props.fbUserMenu.idParent != null) {
        const content = props.childMenus.length
            ? <CollapsableItem {...props} />
            : <FinalItem {...props} />;

        return <li>{content}</li>;
    } else {
        return renderMenus(props.childMenus);
    }
}

export default SideBarItem;