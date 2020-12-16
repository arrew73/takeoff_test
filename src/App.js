import React from "react"
import './App.css';
import {connect} from "react-redux";
import Loader from "react-loader-spinner";
import {Redirect, Route, Switch} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/LoginPage/Login";
import ContactsContainer from "./components/Contacts/ContactsContainer";

class App extends React.Component {
    render() {
        return (
            <div className="App-wrapper">
                <HeaderContainer/>
                <div className="App-wrapper__container">
                    <Switch>
                        <Redirect exact from={"/"} to="/contacts" />
                        <Route path="/contacts" render={() => <ContactsContainer/>}/>
                        <Route path="/login" render={() => <LoginPage/>}/>
                        <Route path='*' render={() => <div>PAGE NOT FOUND</div>}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthorized: state.Authentication.isAuthorized
    }
}

export default connect(mapStateToProps)(App);
