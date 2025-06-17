import React from 'react'
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';


const Register = () => {
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const registerbtn= async (e)=>{
        e.preventDefault();
        try{
            const user = {username,email,password};
            const responseFromApi = await apicallingFn(user);  
            if(responseFromApi){
              localStorage.setItem('registeredToken',JSON.stringify(responseFromApi.data.token));
              toast.success('User registered successfully');
              navigate('/home');
            }           
            console.log(responseFromApi);
    }
        catch(error){
          toast.error("use proper credentials")
            console.error("Error during registration:", error);
        }
    }
    const apicallingFn= async (user)=>{
      try{
        const returnedObject = await axios.post('/User/register',user);
        return returnedObject;
      }catch(error){
        console.log(error);
      }

    }
  return (
     <div className='formContainer'>
         <div className="mb-3">
        <label htmlFor="exampleInputUsername" className="form-label">Full Name</label>
        <input 
        value = {username}
        onChange={(e)=>setUsername(e.target.value)}
        type="text" className="form-control" id="exampleInputUsername" />
      </div>
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
        
      <button type="submit" onClick={registerbtn} className="btn btn-primary">register</button>
      <div><p>already a user? please  
            <Link to='/login'>login</Link></p></div>
      </div>
  )
}

export default Register;
