import React from 'react';
import { Card, Placeholder } from 'react-bootstrap';

const ProductLoader = ({ product }) => {
  return (
    <Card className='my-3  ' style={{ border: 'none', boxShadow: 'none' }}>
      <Placeholder variant='top' fluid animation='glow' />

      <Card.Body>
        <Placeholder as='Card.Title' className='product-title' animation='glow'>
          <strong></strong>
        </Placeholder>

        <Placeholder as={Card.Text}>
          <Placeholder xs={6} bg='light' animation='glow' />
        </Placeholder>
        <Placeholder as={Card.Text}></Placeholder>
      </Card.Body>
    </Card>
  );
};

export default ProductLoader;
