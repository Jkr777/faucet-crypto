import { useState, useEffect } from "react";
import Web3 from "web3";
import { loadContract } from "./utils/load-contract";  
import Header from "./components/header";
import detectEtherumProvider from '@metamask/detect-provider';
import "./App.css";

function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null
  }); 

  const [balance, setBalance] = useState(null);
  const [account, setAccount] = useState(null);

  async function loadProvider() {
    const provider = await detectEtherumProvider();
    const contract = await loadContract("Faucet", provider); 

    if(provider) {
      setWeb3Api({
        web3: new Web3(provider),
        provider: true,
        contract
      });
    } else {
      alert("Please, install Metamask");
    }
  }
 
  async function getAccount() {
    const accounts = await web3Api.web3.eth.getAccounts();
    setAccount(accounts[0]);
  }

  async function loadBalance() {
    const { contract, web3 } = web3Api;
    const balance = await web3.eth.getBalance(contract.address);
    setBalance(balance); 
  }

  function handleConnect() {
    web3Api.provider.request({ method: "eth_requestAccounts" });
  }

  useEffect(() => {
    loadProvider();
  }, [])   

  useEffect(() => {
    web3Api.contract && loadBalance();
  }, [web3Api]);
  
  useEffect(() => {
    web3Api.web3 && getAccount(); 
  }, [web3Api.web3]) 

  return (
    <div>
      <Header /> 
      <div>
        <span>Account:</span> 
        <div>{ account ? <span>{ account }</span> : <button onClick={handleConnect}>Connect Metamask</button> }</div>
      </div>
      <div>
        <span>Current Balance: { balance } ETH</span>
      </div>
      <button>Donate</button>
      <button>Withdraw</button>
    </div>
  );
}

export default App;
