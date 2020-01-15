import React from 'react';

const LoaderSmall = () => {
    return (
        <div className="preloader-wrapper small active" style={{marginTop: "50px", marginLeft: "auto", marginRight: "auto"}}>
            <div className="spinner-layer spinner-green-only">
                <div className="circle-clipper left">
                    <div className="circle"></div>
                </div>
            <div className="gap-patch">                   
            <div className="circle"></div>
            </div>
                <div className="circle-clipper right">
                    <div className="circle"></div>
                </div>
            </div>
        </div>
    )
}

export default LoaderSmall;