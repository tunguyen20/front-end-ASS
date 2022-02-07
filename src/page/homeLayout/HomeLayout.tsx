import React, { ReactNode } from 'react';
import Footer from '../../component/Footer/Footer';
import Header from '../../component/Header/Header';
type Props = {
    children: ReactNode
}
export default function HomeLayout(props:Props) {
    return <div>
        <Header />
        {props.children}
        <Footer/>
    </div>;
}
