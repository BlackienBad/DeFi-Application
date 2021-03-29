import React from 'react';
import { Button } from 'react-bootstrap';

const FaucetButton = ({buttonText, faucet}) => {

  return (
    <div>
        <Button variant="warning" onClick={faucet}> {buttonText} </Button>
    </div>
  );
}

export default FaucetButton;