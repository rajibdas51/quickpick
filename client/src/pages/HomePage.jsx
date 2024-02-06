import { Row, Col } from 'react-bootstrap';
import React from 'react';
import Loader from '../components/Loader.jsx';
import Product from '../components/Product.jsx';
import Message from '../components/Message.jsx';
import { useGetProductsQuery } from '../slices/productApiSlice.js';
import { useParams } from 'react-router-dom';
import Paginate from '../components/Paginate.jsx';
const HomePage = () => {
  const { pageNum } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ pageNum });

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
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <div className='d-flex justify-content-center mt-4'>
            <Paginate page={data.page} pages={data.pages} />
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
