
import { createContext} from "react";

const init ={
    user:null,
    login:()=>{},
    signup:()=>{},
    forgetPassword:()=>{},
    fetchData:()=>{},
    googleSignUp:()=>{}
}
export const UserContext = createContext(init);
