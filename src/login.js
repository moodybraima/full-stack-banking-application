import React, { useState, useContext } from 'react';
import Card from './context';
import { store } from './App';
import axios from "axios";

function Login(){
  const [show, setShow]     = useState(true);
  const [status, setStatus] = React.useState(''); 
  const [token, setToken] = useContext(store);   
  const [loggedEmail, setloggedEmail] = useContext(store);

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}  
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus}/>}
    />
  ) 

function LoginMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Authenticate again
    </button>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  const handle = async (e) => {
    e.preventDefault();
    axios.post("http://localhost:3010/login", {email, password})
    .then(response => {
      setToken(response.data.authToken);
      setloggedEmail(email)
      console.log(response.data.authToken);
      console.log(response);
     
    }
      ).catch((err)=> {
        console.log(err);
        alert("Sorry, the email is not registered. Please try again or create an account");
    })
      setEmail("");
      setPassword("");
  }

  return (
  
  <>
    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
  </>);
}}

export default Login;