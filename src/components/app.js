import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';

import TimerAlert from './timer-alert';
import HeaderBar from './header-bar';
import LandingPage from './landing-page';
import Dashboard from './dashboard';
import RegistrationPage from './registration-page';
import {refreshAuthToken, clearAuth, almostTimeout} from '../actions/auth';

export class App extends React.Component {
    componentDidMount(){
        let timeOut;
        let alertTimeOut;
        document.addEventListener('click', ()=>{
            clearTimeout(alertTimeOut);
           alertTimeOut=
           setTimeout(()=>{
                console.log('times almost up');
                this.props.dispatch(almostTimeout())
                console.log(this.props.dialogAlert)
            }, 240000)

            clearTimeout(timeOut);
           timeOut=
             setTimeout(()=>{
                console.log('time')
                this.props.dispatch(clearAuth())
            }, 300000)
        })
        
    }






    componentDidUpdate(prevProps) {
        if (!prevProps.loggedIn && this.props.loggedIn) {
            // When we are logged in, refresh the auth token periodically
            this.startPeriodicRefresh();
        } else if (prevProps.loggedIn && !this.props.loggedIn) {
            // Stop refreshing when we log out
            this.stopPeriodicRefresh();
        }
    }

    componentWillUnmount() {
        this.stopPeriodicRefresh();
    }

    startPeriodicRefresh() {
        this.refreshInterval = setInterval(
            () => this.props.dispatch(refreshAuthToken()),
            10 * 60* 1000 // 10 minutes
        );
    }

    stopPeriodicRefresh() {
        if (!this.refreshInterval) {
            return;
        }

        clearInterval(this.refreshInterval);
    }

    render() {
        if(this.props.dialogAlert === true){
            return(
                <TimerAlert />
            )
        }
            return (
                <div className="app">
                    <HeaderBar />
                    <Route exact path="/" component={LandingPage} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/register" component={RegistrationPage} />
                </div>
            );
        
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null,
    dialogAlert: state.auth.dialogAlert,
    state: state
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));


