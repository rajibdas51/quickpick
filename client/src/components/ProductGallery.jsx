import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const ProductGallery = () => {
  return (
    <Container>
      <Row className='g-0'>
        <Col md={9}>
          <Row className='g-0'>
            <Col md={5} className='col'>
              <LinkContainer to='/shop/category/Speaker'>
                <Image
                  src='/images/Jbl.png'
                  alt='Speakers'
                  fluid
                  className='g-img'
                />
              </LinkContainer>
            </Col>
            <Col md={7}>
              <LinkContainer to='/shop/category/Watch'>
                <Image
                  src='/images/watch.png'
                  alt='Watches'
                  fluid
                  className='g-img'
                />
              </LinkContainer>
            </Col>
          </Row>
          <Row className='g-0'>
            <Col md={7}>
              <LinkContainer to='/shop/category/Headsets'>
                <Image
                  src='/images/headphones.png'
                  alt='Headphones'
                  fluid
                  className='g-img'
                />
              </LinkContainer>
            </Col>
            <Col md={5}>
              <LinkContainer to='/shop/category/Phone'>
                <Image
                  src='/images/phones.png'
                  alt='Phones'
                  fluid
                  className='g-img'
                />
              </LinkContainer>
            </Col>
          </Row>
        </Col>
        <Col md={3}>
          <LinkContainer to='/shop/category/Earbuds'>
            <Image
              src='/images/airpods.png'
              alt='Tws'
              fluid
              className='g-img airpod-img'
            />
          </LinkContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductGallery;
