import React from 'react';
import NFTCard from '../NFTCard.js';
import './NFTPage.css';

const NFTPage = () => {

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