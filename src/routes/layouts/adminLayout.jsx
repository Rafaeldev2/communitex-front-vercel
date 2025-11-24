import React from 'react';
import BaseLayout from '../baseLayout.jsx';
import Menu from '../../components/Menu/Menu';
import SidebarAdmin from '../../components/sidebars/SidebarAdmin';

function AdminLayout() {
    return (
        <BaseLayout
            header={<Menu />}
            sidebar={<SidebarAdmin />}
            showFooter={true}
        />
    );
}

export default AdminLayout;