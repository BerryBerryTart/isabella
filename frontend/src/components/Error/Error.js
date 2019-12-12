import React from 'react';

function Error({message, refresh=false, close}){
    let refreshMessage;
    if(refresh){
        refreshMessage=
        <div className="alert alert-primary" role="alert">
            Attempting to refresh in 30 seconds.
        </div>;
    }
    return(
        <div className="errorMessage">
            <div className="alert alert-danger" role="alert">
                {message}
                <button onClick={close} type="button" className="btn btn-default errorBtn" aria-label="Close">
                    <span className="oi oi-x" aria-hidden="true"></span>
                </button>
            </div>
            {refreshMessage}
        </div>
    );
}

export default Error;