import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Card from './context';
import {store} from './App';
import axios from "axios";

function Deposit(){
  const [show, setShow]     = useState(true);
  const [status, setStatus] = useState('');  
  const [loggedEmail, setloggedEmail] = useContext(store);
  const [balance, setBalance] = useState(0);

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={show ? 
        <DepositForm setShow={setShow} setStatus={setStatus}/> :
        <DepositMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )


function DepositMsg(props){
  return (<>
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
        Deposit again
    </button>
  </>);
} 

function DepositForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');
  

const handle = async (e) => {
    e.preventDefault();
    if(email !== loggedEmail){
      alert("You are not authorised user to make Deposit!!!");
    }
    else{
      axios.post("http://localhost:3010/deposit", {email, amount})
    .then(response => {
       console.log("deposited...");
       setBalance(response.data.userbalance);
       props.setShow(false);
    });
  }
  }

  return(
    <>
    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
      
    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Deposit</button>
    </>)
  }
}

export default Deposit;