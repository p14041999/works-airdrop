import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext'

export default class SignUp extends Component {
    state={
        email:'',
        password:''
    }
    static contextType = UserContext;
    login = async ()=>{
        try{
            await this.context.login(this.state.email,this.state.password)
            this.props.history.push('/');
        }catch(e){
            console.log(e);
        }
    }
    googleSignUp = async ()=>{
        try{
            await this.context.googleSignUp();
            this.props.history.push('/');
        }catch(e){
            console.log(e);
        }
    }
    render() {
        return (
            <div className="container-fluid p-0 position-relative" style={{height:'100%'}}>
                <div className="card ms-auto h-100 rounded-0 border-0 shadow-xl" style={{maxWidth:'400px'}}>
                    <div className="card-body d-flex align-items-center h-100 px-5">
                        <div className="w-100">
                            <div class="form-group mb-3 d-flex justify-content-center ">
                                <h4 className="card-title">Login</h4>
                                <br/>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" id="floatingInput" value={this.state.email} onChange={e=>{this.setState({email:e.target.value})}} placeholder="name@example.com" />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="password" class="form-control" id="floatingPassword" value={this.state.password} onChange={e=>{this.setState({password:e.target.value})}} placeholder="Password" />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>
                            
                            <div class="form-floating mb-3">
                                <button className="btn btn-primary btn-lg w-100 shadow" onClick={this.login}>Login</button>
                            </div>
                            <div class="form-floating mb-3 d-flex justify-content-center text-secondary">
                                OR
                            </div>
                            <div class="form-floating mb-3">
                                <button className="btn btn-light btn-primary w-100 shadow py-2" onClick={this.googleSignUp}>
                                    <img src="/search.png" alt="" height="20" />
                                    <span className="ms-3">Login with Google</span>
                                </button>
                            </div>
                            <div class="form-floating">
                                    <span className="ms-3">Need An Account? <Link to="/signup">Sign Up</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="position-fixed bg-purple" style={{zIndex:'-1',top:0,left:0,right:0,bottom:0}}>
                    <img src="/bg.jpg" alt="" style={{height:'100%',width:'100%',objectFit:'cover',objectPosition:'center'}} />
                </div>
            </div>
        )
    }
}
