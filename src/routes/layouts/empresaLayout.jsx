import React from 'react';
import BaseLayout from '../BaseLayout';
import Menu from '../../components/Menu/Menu';
import SidebarEmpresa from '../../components/sidebars/SidebarEmpresa';

function EmpresaLayout() {
    return (
        <BaseLayout
            header={<Menu />}
            sidebar={<SidebarEmpresa />}
            showFooter={true}
        />
    );
}

export default EmpresaLayout;