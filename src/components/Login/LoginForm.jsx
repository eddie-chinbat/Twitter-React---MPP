import React from "react";
import TextFieldGroup from "../TextFieldGroup"
import { identifier } from "@babel/types";

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            identifier:'',
            password:'',
            errors:{},
            isLoading: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e){
        e.preventDefault();
    }
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    render(){
        const{errors, identifier, password, isLoading} = this.state;
        return(
            <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                    field="identifier"
                    label="Username / email"
                    value={identifier}
                    error={errors.identifier}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    field="password"
                    label="password"
                    value={password}
                    error={errors.password}
                    onChange={this.onChange}
                    type="password"
                />
                <div className="form-group"><button className="btn btn-primary lg" disabled={isLoading}>Login</button></div>
            </form>
        )
    }
}