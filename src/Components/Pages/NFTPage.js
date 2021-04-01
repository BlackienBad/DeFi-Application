import React, {useState, useEffect} from 'react';
import Web3 from 'web3';
import NFTCard from '../NFTCard.js';
import './NFTPage.css';
import MintNFT from '../../abis/MintNFT.json';
import {mintNFTAddress} from '../../Constants/ContractAddresses.js';

const NFTPage = () => {
  const [account, setAccount] = useState(null);
  const [mintNFT, setMintNFT] = useState();
  const [balanceOf, setBalanceOf] = useState();
  const [tokenURIs, setTokenURIs] = useState([]);
  useEffect(() => {
		loadWeb3();
    loadRopstenData();
    createCollection();
    console.log(tokenURIs)
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
      const mintNFTToken = await new web3.eth.Contract(MintNFT.abi, mintNFTAddress)
      setMintNFT(await mintNFTToken)
      }

    const mintNFTFunction = async (img) =>{
        mintNFT.methods.mint(account, img.toString()).send({from: account});
        console.log(tokenURIs);
    }

    const createCollection = async () =>{
      setBalanceOf(await new window.web3.eth.Contract(MintNFT.abi, mintNFTAddress).methods.returnTotalSupply().call());
      for(var i = 1; i <= balanceOf; i++){
        let tokenURIMapped = await mintNFT.methods.tokenURI(i).call();
        console.log(await tokenURIMapped)
        setTokenURIs([...tokenURIs], tokenURIMapped);
      }
    }

  return (
    <div>
        <div class="grid-containerNFT">
            <div class="NFT-Card-1"><NFTCard text="much art" img="./images/mint1.jpg" mintFunction={mintNFTFunction}/></div>
            <div class="NFT-Card-2"><NFTCard text="monnadoge" img="./images/mint2.jpg" mintFunction={mintNFTFunction}/></div>
            <div class="NFT-Card-3"><NFTCard text="such value" img="./images/mint3.jpg" mintFunction={mintNFTFunction}/></div>
            <div class="NFT-Card-4"><NFTCard text="choosen one" img="./images/mint4.png" mintFunction={mintNFTFunction}/></div>
        </div>
        {tokenURIs.map(tokenURI => (
        <img src={tokenURI} />
      ))}
    </div>
  );
}

export default NFTPage;