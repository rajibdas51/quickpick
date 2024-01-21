import { Row, Col } from 'react-bootstrap';
import React from 'react';
import Loader from '../components/Loader.jsx';
import Product from '../components/Product.jsx';
import Message from '../components/Message.jsx';
import { useGetProductsQuery } from '../slices/productApiSlice.js';
const HomePage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomePage;
