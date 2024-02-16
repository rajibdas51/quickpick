import { Link } from 'react-router-dom';
import { Button, Col, Image, Row } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productApiSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const ProductSlider = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Swiper spaceBetween={50} slidesPerView={1}>
      {products?.map((product) => (
        <SwiperSlide key={product._id}>
          <Row>
            <Col className='my-auto'>
              <h1>
                {product.name} (${product.price})
              </h1>
              <Link to={`/product/${product._id}`}>
                <Button variant='primary' size='lg' className='my-3 py-2'>
                  Shop Now
                </Button>
              </Link>
            </Col>
            <Col>
              <Image
                src={product.image}
                alt={product.name}
                fluid
                style={{ maxHeight: '450px' }}
              />
            </Col>
          </Row>
        </SwiperSlide>
      ))}
      ...
    </Swiper>
  );
};

export default ProductSlider;
