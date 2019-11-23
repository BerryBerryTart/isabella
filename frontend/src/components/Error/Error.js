import React from 'react';

function Error({message, refresh=false}){
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
            </div>
            {refreshMessage}
        </div>
    );
}

export default Error;