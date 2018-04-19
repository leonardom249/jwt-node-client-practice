import React from 'react';
import {connect} from 'react-redux';
import {backToLogin} from '../actions/auth';

export function TimerAlert(props){
    return(
        <div>
            <h2>Your session will finish in 1 minute</h2>
            <p>Please click the button below to stay on the page</p>
            <p>Otherwise you will be redirected to the login page</p>
            <button 
                onClick={()=> props.dispatch(backToLogin())}
            >
                Stay On Page
            </button>
        </div>
    )
}

export default connect()(TimerAlert)
