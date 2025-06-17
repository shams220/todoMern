
import React ,{useState} from 'react';
import axios from 'axios';
import { Link ,useNavigate} from 'react-router-dom';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {toast} from 'react-hot-toast'
 const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
//     const loginbtn= async (e)=>{
//         try{
//             e.preventDefault();
//             const user = {email,password};
//             const res = await loginData(user);
//             console.log(res.data)
//         }catch(error){
//             console.error("Error during login:", error);
//         }
//     }
//     const loginData=async(user)=>{ 
//       try{
//         const response = await axios.post('/User/login',user);
//         console.log("Login successful");
//         return response;
//       }catch(error){
//         console.error("Error during login:", error);
//       }

// }

const loginHandler  = async  (e)=>{
try{
  e.preventDefault();
  const userObject = {email,password};
  //user object ko ese functino me bhejna hai jo api call kare with the same object
  const responseFromAPi = await loginAPIcallerWithObject(userObject);
  // jo bhi object ye retrnu karega use console karna ahai
 if(responseFromAPi?.data?.token){
localStorage.setItem("loginToken", JSON.stringify(responseFromAPi.data.token));

  toast.success("login successfull");
  navigate('/home');
 }

  console.log(responseFromAPi.data.token) 
}
catch(error){
  toast.error("something went wrong")
console.log(error);
}
}

// make loginAPiHandler function
const loginAPIcallerWithObject=async (userObject)=>{
  try{
    const apiResponse = await axios.post('User/login',userObject);
    
    console.log("data found in database");
    return apiResponse;

  }
  catch(error){
    console.log(error);
  }
}
  return (
    <>
      <div className='formContainer'>
        <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input 
        value = {email}
        onChange={(e)=>setEmail(e.target.value)}
        type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        type="password" className="form-control" id="exampleInputPassword1" />
      </div>

      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
      </div>
        
      <button type="submit" onClick={loginHandler} className="btn btn-primary">Submit</button>
      <div><p>not a user? please  
            <Link to='/register'>register</Link></p></div>
      </div>
    </>
  );
};

export default Login;
