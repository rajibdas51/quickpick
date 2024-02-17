import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
const FeaturedCategories = () => {
  const categories = [
    { name: 'Phone', image: '/images/mobile.png' },
    { name: 'Laptop', image: '/images/laptop.png' },
    { name: 'Headsets', image: '/images/headsets.png' },
    { name: 'Earbuds', image: '/images/earbuds.png' },
    { name: 'Monitor', image: '/images/monitor.png' },
    { name: 'Mouse', image: '/images/mouse.png' },
    { name: 'Keyboard', image: '/images/keyboard.png' },
    { name: 'Drone', image: '/images/drone.png' },
    { name: 'Watch', image: '/images/smart-watch.png' },
    { name: 'vr', image: '/images/vr.png' },
  ];
  return (
    <Container fluid>
      <h1 className='text-center mt-5'>Featured Categories</h1>
      <p className='text-center'>
        Get Your Desired Product from Featured Category!
      </p>

      <Row className='my-4 justify-content-center'>
        {categories.map((category) => (
          <LinkContainer to={`/shop/category/${category.name}`}>
            <Col md={2} lg={2} sm={6} className=' category ms-2 mb-2 p-2'>
              <img src={category.image} alt={category.name} className='py-2' />
              <h3>{category.name}</h3>
            </Col>
          </LinkContainer>
        ))}
      </Row>
    </Container>
  );
};

export default FeaturedCategories;
