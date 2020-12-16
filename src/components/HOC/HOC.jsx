import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

let matStateToProps = (state) => {
    return {
        isAuthorized: state.Authentication.isAuthorized
    }
}

export let withAuthRedirect = (Component) => {
    class withAuthRedirectContainer extends React.Component {
        render() {
            if (!this.props.isAuthorized) {
                return <Redirect to={'/login'} />
            }
            return <Component {...this.props}/>
        }
    }
    return connect(matStateToProps)(withAuthRedirectContainer);
}