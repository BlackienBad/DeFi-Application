import React, {useState} from 'react';
import { Card, Button, Form } from 'react-bootstrap';

const LiquidityPoolCard = ({number, img, swapFunction}) => {
  const [value, setValue] = useState(0);
  const handleChange = (e) => {    
      setValue(e.target.value);  
    }
  return (
    <div>
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={img} />
            <Card.Body>
                <Card.Title>Liquitidy pool {number}</Card.Title>
                <Card.Text>
                Swap your liquidity here
                </Card.Text>
                <Form.Group controlId="swap">
                    <Form.Control type="number" name="coinToSwap" placeholder="Coin to swap..." onChange={(e) => handleChange(e) }/>
                </Form.Group>
                <Button variant="warning" onClick={() => swapFunction(value)}>swap</Button>
            </Card.Body>
        </Card>
    </div>
  );
}

export default LiquidityPoolCard;