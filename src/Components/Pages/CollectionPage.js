import React from 'react';
import { Button } from 'react-bootstrap';

const CollectionPage = ({tokenURIs}) => {

  return (
    <div>
        {tokenURIs.map(tokenURI => (
            <img src={tokenURI} />
        ))}
    </div>
  );
}

export default CollectionPage;