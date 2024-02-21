import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
const Footer = () => {
  const currentyear = new Date().getFullYear();
  return (
    <footer className='footer'>
      <Container>
        <Row>
          <Col md={3}>
            <h3>ABOUT US</h3>
            <p>
              QuickPick - Your go-to destination for seamless online shopping,
              offering a curated selection of quality products at your
              fingertips.
            </p>
            <Row className='d-flex'>
              <Col xs={3} sm={2}>
                <FaFacebook className='social-icon' />
              </Col>
              <Col xs={3} sm={2}>
                <FaTwitter className='social-icon' />
              </Col>
              <Col xs={3} sm={2}>
                <FaInstagram className='social-icon' />
              </Col>
              <Col xs={3} sm={2}>
                <FaYoutube className='social-icon' />
              </Col>
            </Row>
          </Col>
          <Col md={3} className='ps-5 shop-links'>
            <h3>Shop</h3>
            <ul className='links  '>
              <li>
                <a href='#'>Laptops</a>
              </li>
              <li>
                <a href='#'>Computers</a>
              </li>
              <li>
                <a href='#'>Monitors</a>
              </li>
              <li>
                <a href='#'>Apple Products</a>
              </li>
              <li>
                <a href='#'>Parts</a>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h3>HELP</h3>
            <ul className='links '>
              <li>
                <a href='#'>Shipping & Returns</a>
              </li>
              <li>
                <a href='#'>Privacy Policy</a>
              </li>
              <li>
                <a href='#'>Terms & Conditions</a>
              </li>
              <li>
                <a href='#'>Contact Us</a>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h3>NEWSLETTER</h3>
            <Form>
              <Form.Group controlId='email' className='my-3'>
                <Form.Control type='email' placeholder='Enter email' />
              </Form.Group>
              <Button type='submit' variant='warning' c>
                Subscribe
              </Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col className='text-center py-3'>
            <hr />

            <p>QuicPick &copy;{currentyear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
