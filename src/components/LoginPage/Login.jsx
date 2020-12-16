import React from "react";
import {createField, Input} from "../Forms/CreateField";
import {email, required} from "../Forms/Validators";
import {reduxForm} from "redux-form";
import style from "./Login.module.css"
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../../Redux/Reducers/LogInReducer";
import {compose} from "redux";

export const Login = (props) => {

    return (
        <div className={style.login__page}>
            <form onSubmit={props.handleSubmit}>
                <div>Email:{createField("email", "email", [required,email], Input)}</div>
                <div>Password:{createField("password", "password", [required], Input, {type: "password"})}</div>
                {props.error && <div>{props.error}</div>}
                <div style={{textAlign: "center"}}>
                    <button type={"submit"}>Login</button>
                </div>
            </form>
        </div>
    )
}

export const LoginWithReduxForm = reduxForm({form: 'login'})(Login)

const LoginPage = (props) => {
    const logIn = (baseform) => {
        const email = baseform.email;
        const password = baseform.password;
        props.login(email,password)
    }
    if (props.isAuthorized) {
        return <Redirect to={"/contacts"}/>
    }
    return <div style={{marginTop: "10%"}}>
        <h1 style={{textAlign:"center"}}>Login</h1>
        <LoginWithReduxForm onSubmit={logIn}/>
    </div>
}

const mapStateToProps = (state) => {
    return {
        isAuthorized: state.Authentication.isAuthorized
    }
}

export default compose(
    connect(mapStateToProps,{login})
)(LoginPage);