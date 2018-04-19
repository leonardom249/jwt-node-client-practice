import React from 'react';
import {connect} from 'react-redux';
import {backToLogin} from '../actions/auth';

export function TimerAlert(props){
    return(
        <div>
            <h2>Your session will finish in 1 minute</h2>
            <p>Please re-login to continue</p>
            <button 
                onClick={()=> props.dispatch(backToLogin())}
            >
                Sorry, I didn't learn how to keep you here
            </button>
        </div>
    )
}

export default connect()(TimerAlert)
