import './BalancePage.css'
import React, {useState, useEffect} from 'react';
import Web3 from 'web3';
import CollectionPage from './CollectionPage.js';
import Doge from '../../abis/Doge.json';
import Elon from '../../abis/Elon.json';
import Snoop from '../../abis/Snoop.json';
import TokenLP1 from '../../abis/TokenLP1.json';
import TokenLP2 from '../../abis/TokenLP2.json';
import MintNFT from '../../abis/MintNFT.json';
import {dogeAddress, elonAddress, snoopAddress, tokenLP1Address, tokenLP2Address, elonDogeAddress, snoopDogeAddress, mintNFTAddress} from '../../Constants/ContractAddresses.js';


const BalancePage = () => {

    const [account, setAccount] = useState(null);
    const [doge, setDoge] = useState();
    const [elon, setElon] = useState();
    const [snoop, setSnoop] = useState();
    const [elonDoge, setElonDoge] = useState();
    const [snoopDoge, setSnoopDoge] = useState();
    const [balanceOfDoge, setBalanceOfDoge] = useState(0);
    const [balanceOfElon, setBalanceOfElon] = useState(0);
    const [balanceOfSnoop, setBalanceOfSnoop] = useState(0);
    const [balanceOfElonDoge, setBalanceOfElonDoge] = useState(0);
    const [balanceOfSnoopDoge, setBalanceOfSnoopDoge] = useState(0);
    const [stakedOfElonDoge, setStakedOfElonDoge] = useState(0);
    const [stakedOfSnoopDoge, setStakedOfSnoopDoge] = useState(0);
    const [balanceOfURIs, setBalanceOfURIs] = useState(0);
    const [tokenURIs, setTokenURIs] = useState([]);
  useEffect(() => {
		loadWeb3();
        loadRopstenData();
	},[]);

    const loadWeb3 = async () => {
        if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
        }
        else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    const loadRopstenData = async () => {
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        setAccount(accounts[0])
        const dogeToken = new web3.eth.Contract(Doge.abi, dogeAddress)
        const elonToken = new web3.eth.Contract(Elon.abi, elonAddress)
        const snoopToken = new web3.eth.Contract(Snoop.abi, snoopAddress)
        const tokenLP1 = new web3.eth.Contract(TokenLP1.abi, tokenLP1Address)
        const tokenLP2 = new web3.eth.Contract(TokenLP2.abi, tokenLP2Address)
        const mintNFTToken = new web3.eth.Contract(MintNFT.abi, mintNFTAddress)
        if(accounts[0] !== undefined){
            setBalanceOfURIs(await mintNFTToken.methods.returnTotalSupply().call());
            setBalanceOfDoge(await dogeToken.methods.balanceOf(accounts[0]).call() / 1000000000000000000)
            setBalanceOfElon(await elonToken.methods.balanceOf(accounts[0]).call() / 1000000000000000000)
            setBalanceOfSnoop(await snoopToken.methods.balanceOf(accounts[0]).call() / 1000000000000000000)
            setBalanceOfElonDoge(await tokenLP1.methods.balanceOf(accounts[0]).call() / 1000000000000000000)
            setBalanceOfSnoopDoge(await tokenLP2.methods.balanceOf(accounts[0]).call() / 1000000000000000000)
            setStakedOfElonDoge(await dogeToken.methods.balanceOf(elonDogeAddress).call() / 1000000000000000000)
            setStakedOfSnoopDoge(await dogeToken.methods.balanceOf(snoopDogeAddress).call() / 1000000000000000000)
            setTokenURIs(await mintNFTToken.methods.returnTokenURIsOfOwner().call());
            console.log(tokenURIs)
            }
        }
  return (
    <div>
        <div class="grid-container">
            <div class="balance-doge">Doge Balance: {balanceOfDoge}</div>
            <div class="balance-elon">Elon Balance: {balanceOfElon}</div>
            <div class="balance-snoop">Snoop Balance: {balanceOfSnoop}</div>
            <div class="balance-ed">ElonDoge Balance: {balanceOfElonDoge}</div>
            <div class="balance-sd">SnoopDoge Balance: {balanceOfSnoopDoge}</div>
            <div class="staked-1">Coin locked in the first contract(by everyone): {stakedOfElonDoge}</div>
            <div class="staked-2">Coin locked in the second contract(by everyone): {stakedOfSnoopDoge}</div>
        </div>
    </div>
  );
}

export default BalancePage;