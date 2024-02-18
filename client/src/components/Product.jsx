import React, { useState } from 'react';
import { Button, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { FaShoppingCart, FaEye, FaHeart } from 'react-icons/fa'; // Import necessary icons
import Rating from './Rating';
import { addToCart } from '../slices/cartSlice';
import { toast } from 'react-toastify';
const Product = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    toast.success('Item added to cart');
  };
  return (
    <Card
      className='my-3 position-relative'
      style={{ border: 'none', boxShadow: 'none' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product._id}`} className='product-img'>
        <Card.Img src={product.image} variant='top' fluid />
        {isHovered && (
          <div className='overlay'>
            <Link to='#' className='overlay-button'>
              <Button
                className='btn-add-to-cart'
                disabled={product.countInStock === 0}
                onClick={addToCartHandler}
              >
                Add To Cart
              </Button>
            </Link>

            <div className='icon-container'>
              <Link to={`/product/${product._id}`}>
                <OverlayTrigger
                  placement='bottom'
                  overlay={<Tooltip id={`tooltip-view`}>Quick View</Tooltip>}
                  className='btn-quick-view'
                >
                  <FaEye className='icon' />
                </OverlayTrigger>
              </Link>

              <OverlayTrigger
                placement='bottom'
                className='btn-favourite'
                overlay={
                  <Tooltip id={`tooltip-favorite`}>Add to Favorites</Tooltip>
                }
              >
                <FaHeart className='icon' />
              </OverlayTrigger>
            </div>
          </div>
        )}
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div' className='product-title'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={product.numReviews ? `${product.numReviews} reviews` : ''}
          />
        </Card.Text>
        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
