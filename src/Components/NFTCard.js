import React, {useState} from 'react';
import { Card, Button, Form } from 'react-bootstrap';

const NFTCard = ({img, mintFunction, text}) => {
  return (
    <div>
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Mint NFT</Card.Title>
                <Card.Img variant="top" src={img} />
                <Card.Text> {text} </Card.Text>
                <Button variant="warning" onClick={() => mintFunction(img)}>Mint</Button>
            </Card.Body>
        </Card>
    </div>
  );
}

export default NFTCard;