import React, { Component } from 'react'
import { Redirect, Route } from 'react-router'
import { UserContext } from './context/UserContext';

export default class PrivateRoute extends Component {
    static contextType = UserContext;
    componentDidMount(){
        console.log(this.context.user);
    }
    render() {
        if(this.context.user!==null && this.context.user !== undefined){
            return (

            <Route {...this.props}>
                {console.log(this.context.user)}
            </Route>
            )
        }else{
            return <Redirect to="/login"/>
        }
    }
}
