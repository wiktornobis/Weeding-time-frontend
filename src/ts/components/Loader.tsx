import React from "react";
import '@/style/components/Loader.scss';

const Loader: React.FC = () => {
    return (
        <>
            <div className="wrapper">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="shadow"></div>
                <div className="shadow"></div>
                <div className="shadow"></div>
            </div>
        </>
    )
};

export default Loader;
