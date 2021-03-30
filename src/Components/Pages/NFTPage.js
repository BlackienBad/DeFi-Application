import React, {useState, useEffect} from 'react';
import Web3 from 'web3';
import NFTCard from '../NFTCard.js';
import './NFTPage.css';

const NFTPage = () => {
  const [account, setAccount] = useState(null);
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
      }
    function mintNFT(img){
        console.log(img)
    }
  return (
    <div>
        <div class="grid-containerNFT">
            <div class="NFT-Card-1"><NFTCard text="much art" img="./images/mint1.jpg" mintFunction={mintNFT}/></div>
            <div class="NFT-Card-2"><NFTCard text="monnadoge" img="./images/mint2.jpg" mintFunction={mintNFT}/></div>
            <div class="NFT-Card-3"><NFTCard text="such value" img="./images/mint3.jpg" mintFunction={mintNFT}/></div>
            <div class="NFT-Card-4"><NFTCard text="choosen one" img="./images/mint4.png" mintFunction={mintNFT}/></div>
        </div>
    </div>
  );
}

export default NFTPage;