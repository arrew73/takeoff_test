import React from "react";
import {Header} from "./Header";
import {connect} from "react-redux";
import {logout} from "../../Redux/Reducers/LogInReducer";

class HeaderContainer extends React.Component {
    render () {
        return <Header logout={this.props.logout} login={this.props.login} isAuthorized={this.props.isAuthorized}/>
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthorized: state.Authentication.isAuthorized,
        login: state.Authentication.login
    }
}

export default connect(mapStateToProps,{logout})(HeaderContainer)