
import React, { ReactNode } from 'react';
import WarehouseLeft from '../warehouse/LeftWareHouse';
type Props = {
    children: ReactNode
}
export default function AdminLayout(props: Props) {
    return <div>
        <WarehouseLeft />
        {props.children}
    </div>;
}
