import { Row, Col, Button } from 'react-bootstrap';
import React from 'react';
import Loader from '../components/Loader.jsx';
import Product from '../components/Product.jsx';
import Message from '../components/Message.jsx';
import { useGetProductsQuery } from '../slices/productApiSlice.js';
import { Link, useParams } from 'react-router-dom';
import Paginate from '../components/Paginate.jsx';
import ProductSlider from '../components/ProductSlider.jsx';
import ProductLoader from '../components/ProductLoader.jsx';
import FeaturedCategories from '../components/FeaturedCategories.jsx';
import { LinkContainer } from 'react-router-bootstrap';
import ProductGallery from '../components/ProductGallery.jsx';
const HomePage = () => {
  const { pageNum, keyword } = useParams();
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {!keyword ? (
        <ProductSlider />
      ) : (
        <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>
      )}
      {isLoading ? (
        <ProductLoader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <FeaturedCategories />
          <h1 className='text-center my-4'>Latest Products</h1>
          <Row>
            {products.slice(0, 8).map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <div className='d-flex justify-content-center  mt-4 mb-5'>
            <Link to='/shop'>
              {' '}
              <Button variant='warning'>Show More Products</Button>
            </Link>
          </div>
          <Row>
            <ProductGallery />
          </Row>
        </>
      )}
    </>
  );
};

export default HomePage;
