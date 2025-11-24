import React from 'react';
import BaseLayout from '../BaseLayout';
import Menu from '../../components/Menu/Menu';

function PublicLayout() {
    return (
        <BaseLayout
            header={<Menu />}
            sidebar={null}
            showFooter={true}
        />
    );
}

export default PublicLayout;