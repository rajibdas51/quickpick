import { Row, Col } from 'react-bootstrap';
import React from 'react';
import Loader from '../components/Loader.jsx';
import Product from '../components/Product.jsx';
import Message from '../components/Message.jsx';
import Paginate from '../components/Paginate.jsx';
const ProductList = ({ products, keyword, isLoading, error, page, pages }) => {
  //const { pageNum, keyword } = useParams();
  // const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNum });

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
          <Row className='pe-0'>
            {products?.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <div className='d-flex justify-content-center mt-4'>
            <Paginate
              page={page}
              pages={pages}
              keyword={keyword ? keyword : ''}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ProductList;
