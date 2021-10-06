import React, { Component } from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import { UserContext } from './context/UserContext';
import './App.scss';
// import {} from 'firebase/auth';
import Login from './components/Login';
import SignUp from './components/SignUp';
// import { onAuthStateChanged } from '@firebase/auth';
// import { auth } from './Firebase';
import PrivateRoute from './PrivateRoute';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup} from "@firebase/auth";
import { getDocs,query,where,collection, addDoc } from "@firebase/firestore";
// import React, { Component, createContext, useEffect, useState } from "react";
import { auth, firestore } from "./Firebase";


async function login(email,password){
    console.log("running..")
    return signInWithEmailAndPassword(auth,email,password)
}

async function signup(email,pass){
    let res = await createUserWithEmailAndPassword(auth,email,pass);
    return checkExisting(res);
}
async function googleSignUp(){
    let provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    let res = await signInWithPopup(auth,provider);
    return checkExisting(res);
}

async function forgetPassword(){
    
}

async function fetchData(){
    
}
const checkExisting= async (result)=>{
    // firestore
    let col = collection(firestore,'users');
    let q = query(col, where('userID' ,'==',result.user.uid));
    let res = await getDocs(q);
    console.log(res.size);
    if(res.size === 0){
        await addDoc(col,{
            userID:result.user.uid,
            email:result.user.email,
            mailVerified:result.user.emailVerified
        });
    }
    return result;
}
export default class App extends Component {
  state ={
    loading:true,
    user:null,
    login,
    signup,
    forgetPassword,
    fetchData,
    googleSignUp,
  }
  componentDidUpdate(){
    onAuthStateChanged(auth,(usr)=>{
      console.log("called");
      this.setState({loading:false});
      if(usr){
        this.setState({user:usr});
      }else{
        this.setState({user:null});
      }
    },console.log,console.log);
  }
  render() {
      return (
        <>
          {/* <UserContext.Provider value={this.state}>
            <BrowserRouter>
              <Switch>
                <PrivateRoute component={Dashboard} path="/" exact />
                <Route component={Login} path="/login" />
                <Route component={SignUp} path="/signup" />
                <Route component={Dashboard} path="/forget-password" />
              </Switch>
            </BrowserRouter>
          </UserContext.Provider> */}
          <Dashboard />
        </>
      )
  }
}
