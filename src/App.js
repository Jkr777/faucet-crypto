import { useState, useEffect, useCallback } from "react";
import Web3 from "web3";
import { loadContract } from "./utils/load-contract";  
import detectEtherumProvider from '@metamask/detect-provider';
import "./App.css";

function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    isProviderLoaded: false,
    web3: null,
    contract: null
  }); 

  const [balance, setBalance] = useState(null);
  const [account, setAccount] = useState(null);
  const [shouldReload, reload] = useState(false);

  const reloadEffect = useCallback(function() {
    reload(!shouldReload); 
  }, [shouldReload]);

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

  function setAccountListener(provider) {
    provider.on("accountsChanged", () => window.location.reload());
    provider.on("chainChanged", () => window.location.reload());
  }

  useEffect(() => {
    async function loadProvider() {
      const provider = await detectEtherumProvider();

      if(provider) {
        const contract = await loadContract("Faucet", provider); 
        setAccountListener(provider);
        setWeb3Api({
          web3: new Web3(provider),
          provider,
          contract,
          isProviderLoaded: true
        });
      } else {
        setWeb3Api(api => ({
          ...api,
          isProviderLoaded: true
        }));

        alert("Please, install Metamask");
      }
    }

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

  if(!web3Api.isProviderLoaded) {
    return <span  className="container">No wallet detected! <a rel="noreferrer" target="_blank" href="https://docs.metamask.io">Install Metamask</a></span>
  }

  return (
    <main className="container">
      <div className="container__account">
        <span className="container__account__title">Account:</span> 
        <div className="container__account__info">{ account ? <span className="container__account__address">{ account }</span> : <button className="btn btn--wallet" onClick={handleConnect}>Connect Metamask</button> }</div>
      </div>
      <div className="container__balance">
        <span>Current Balance: <span className="container__balance__val">{ balance } ETH</span></span>
      </div>
      <button disabled={!account} className="btn btn--donate" onClick={addFunds}>Donate 1 ETH</button>
      <button disabled={!account} className="btn btn--withdraw" onClick={withdraw}>Withdraw</button>
    </main>
  );
}

export default App;