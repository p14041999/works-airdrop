import { addDoc, collection, getDoc, getDocs, query, where } from '@firebase/firestore'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { firestore } from '../Firebase'

export default class Dashboard extends Component {
    state={
        done:false,
        email:'',
        telegram:'',
        twitter:'',
        walletId:'',
        faebook:''
    }
    componentDidMount(){
        let done = localStorage.getItem('done');
        if(done==='yes'){
            this.setState({done:true});
        }
    }
    participate=async()=>{
        try {
            let q1 = query(collection(firestore,'participants'),where('email', '==',this.state.email));
            let q2 = query(collection(firestore,'participants'),where('telegram', '==',this.state.telegram));
            let q3 = query(collection(firestore,'participants'),where('twitter', '==',this.state.twitter));
            let q4 = query(collection(firestore,'participants'),where('walletId', '==',this.state.walletId));
            let r1 = await getDocs(q1);
            let r2 = await getDocs(q2);
            let r3 = await getDocs(q3);
            let r4 = await getDocs(q4);
            if(r1.size === 0 && r2.size === 0 && r3.size === 0 && r4.size === 0){
                await addDoc(collection(firestore,'participants'),{
                    telegram:this.state.telegram,
                    email:this.state.email, 
                    twitter:this.state.twitter,
                    walletId:this.state.walletId,
                    facebook:this.state.facebook
                })
                this.setState({done:true});
                localStorage.setItem('done','yes');
            }else{
                alert("Details are already in use!");
            }
        } catch (error) {
            console.log(error);
            alert('Something went wrong!');
        }
    }

    render() {
        return (
            <div className="container-fluid p-0 position-relative d-flex align-items-center py-5" style={{height:'100%'}}>
                {!this.state.done && <div className="card m-auto border-0 shadow-xl text-light" style={{maxWidth:'400px',backgroundColor:'#00000054',backdropFilter:'blur(10px)'}}>
                    <div className="card-body d-flex align-items-center h-100 px-5">
                        <div className="w-100">
                            <div className="mb-1 d-flex justify-content-center">
                                <img src="/logo.png" alt="" height="50" />
                            </div>
                            <div className="mb-4 d-flex justify-content-center">
                                <span>WORKS</span>
                            </div>
                            <div class="form-group mb-5 d-flex justify-content-center ">
                                <h4 className="card-title">Participate in Airdrop</h4>
                                <br/>
                            </div>
                            <div class="mb-4 d-flex justify-content-between">
                                <label>1. Follow our Twitter Handle</label>
                                <a href="https://twitter.com/thecoinworks" target="_blank">
                                <button className="btn btn-primary shadow">Follow</button>
                                </a>
                            </div>
                            <div class="mb-4 d-flex justify-content-between">
                                <label>2. Join Our Telegram group</label>
                                <a href="https://t.me/thecoinworks" target="_blank">
                                <button className="btn btn-primary shadow">Join Now</button>
                                </a>
                            </div>
                            <div class="mb-4 d-flex justify-content-between">
                                <label>3. Retweet Pinned Post</label>
                                <a href="https://twitter.com/thecoinworks" target="_blank">
                                <button className="btn btn-primary shadow">Retweet</button>
                                </a>
                            </div>
                            <div class="mb-4 d-flex justify-content-between">
                                <label>4. Follow us on facebook</label>
                                <a href="https://www.facebook.com/thecoinworks" target="_blank">
                                <button className="btn btn-primary shadow">Follow</button>
                                </a>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">5. Email address</label>
                                <input type="email" value={this.state.email} onChange={e=>{this.setState({email:e.target.value})}} class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">6. Twitter Handle</label>
                                <input type="text" value={this.state.twitter} onChange={e=>{this.setState({twitter:e.target.value})}} class="form-control" id="exampleFormControlInput1" placeholder="@example"/>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">7. Telegram Handle</label>
                                <input type="text" value={this.state.telegram} onChange={e=>{this.setState({telegram:e.target.value})}} class="form-control" id="exampleFormControlInput1" placeholder="@example"/>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">8. Facebook profile link</label>
                                <input type="text" value={this.state.facebook} onChange={e=>{this.setState({facebook:e.target.value})}} class="form-control" id="exampleFormControlInput1" placeholder="0x2Ef8ac6e2579780f56d295ABf661DBf400aF205D"/>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">9. Wallet Address</label>
                                <input type="text" value={this.state.walletId} onChange={e=>{this.setState({walletId:e.target.value})}} class="form-control" id="exampleFormControlInput1" placeholder="0x2Ef8ac6e2579780f56d295ABf661DBf400aF205D"/>
                            </div>
                            <div class="form-check mb-3">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked />
                                <label class="form-check-label" for="flexCheckChecked">
                                    I agree to receive all the communication mails including airdrop and ICO of this project.
                                </label>
                            </div>                          
                            <div class="form-floating mb-3">
                                <button className="btn btn-primary  w-100 shadow" onClick={this.participate}>Participate in Airdrop</button>
                            </div>
                            <div class="form-floating mb-5">
                            </div>
                        </div>
                    </div>
                </div>}
                {this.state.done && <div className="card m-auto border-0 shadow-xl text-light" style={{maxWidth:'400px',backgroundColor:'#00000054',backdropFilter:'blur(10px)'}}>
                    <div className="card-body d-flex flex-column align-items-center h-100 px-5">
                        <h4 className="card-title">Congratulations!</h4>
                        <p>Congratulations on participating in Works Token Airdrop. You will be notified by mail once airdrop result declares.</p>
                    </div>
                </div>}
                <div className="position-fixed bg-purple" style={{zIndex:'-1',top:0,left:0,right:0,bottom:0}}>
                    <img src="/bg.jpg" alt="" style={{height:'100%',width:'100%',objectFit:'cover',objectPosition:'center'}} />
                </div>
            </div>
        )
    }
}
