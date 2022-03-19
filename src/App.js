import { useState, useEffect, useCallback } from "react";
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
  const [shouldReload, reload] = useState(false);

  const reloadEffect = useCallback(function() {
    reload(!shouldReload); 
  }, [shouldReload]);

  async function loadProvider() {
    const provider = await detectEtherumProvider();
    const contract = await loadContract("Faucet", provider); 

    if(provider) {
      setWeb3Api({
        web3: new Web3(provider),
        provider,
        contract
      });
    } else {
      alert("Please, install Metamask");
    }
  }

  const addFunds = useCallback(async function() {
    const { contract, web3 } = web3Api;

    await contract.addFunds({
      from: account,
      value: web3.utils.toWei("1", "ether")
    }) 

    reloadEffect();
  }, [web3Api, account, reloadEffect]);

  const withdraw = useCallback(async function() {
    const { contract, web3 } = web3Api;
    const withdrawAmount = web3.utils.toWei("0.1", "ether");

    await contract.withdraw(withdrawAmount, {
      from: account
    }) 

    reloadEffect();
  }, [web3Api, account, reloadEffect]);

  function handleConnect() {
    const { provider } = web3Api;
    provider.request({ method: "eth_requestAccounts" });
  }

  useEffect(() => {
    loadProvider();
  }, [])   

  useEffect(() => {
    async function loadBalance() {
      const { contract, web3 } = web3Api;
      const balance = await web3.eth.getBalance(contract.address);
      setBalance(web3.utils.fromWei(balance, 'ether')); 
    }
  
    web3Api.contract && loadBalance();
  }, [web3Api, shouldReload]);
  
  useEffect(() => {   
    async function getAccount() {
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);
    }

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
      <button onClick={addFunds}>Donate 1 ETH</button>
      <button onClick={withdraw}>Withdraw</button>
    </div>
  );
}

export default App;