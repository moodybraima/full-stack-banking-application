import React, { useContext, useState } from 'react';
// import { Context } from './context';
import 'bootstrap/dist/css/bootstrap.css';
import Card from './context';
import {store} from './App';
import axios from "axios";

// state variables and context
// var store = require('./index');

function Withdraw(){
  const [show, setShow]     = useState(true);
  const [status, setStatus] = useState(''); 
  const [loggedEmail, setloggedEmail] = useContext(store); 
  const [balance, setBalance] = useState(0);

  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus}/> :
        <WithdrawMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )

function WithdrawMsg(props){
  return(<>
  {balance !== 0 && 
  <>
  Balance : ${balance}
  </>}
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Withdraw again
    </button>
  </>);
}

function WithdrawForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');

  const handle = async (e) => {
    e.preventDefault();
    if(email !== loggedEmail){
      alert("You are not authorised user to perform Withdraw!!!")
    }
    else{
    axios.post("http://localhost:3010/withdraw", {email, amount})
    .then(response => {
      console.log("res:",response);
      if(response.data.success === false){
        alert("Insufficient funds!!!!");
      }
       else{
        setBalance(response.data.userbalance);
        console.log("withdrwn...");
       props.setShow(false);
    }});
  }}
    
  return(
    <>
    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Withdraw
    </button>
    </>)
}
}

export default Withdraw;