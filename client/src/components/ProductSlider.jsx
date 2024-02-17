import { Link } from 'react-router-dom';
import { Button, Col, Image, Row } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productApiSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';

const ProductSlider = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={false}
      modules={[Autoplay, Pagination, Navigation]}
      className='mySwiper'
    >
      {products?.map((product) => (
        <SwiperSlide key={product._id} className='pb-3'>
          <Row style={{ background: '#DEE9FF' }}>
            <Col
              className='my-auto py-5 ps-4'
              style={{ background: '#DEE9FF' }}
            >
              <Link
                to={`/product/${product._id}`}
                style={{ textDecoration: 'none' }}
              >
                <h1>
                  {product.name} (${product.price})
                </h1>
              </Link>
              <Link to={`/product/${product._id}`}>
                <Button variant='primary' size='lg' className='my-3 py-2'>
                  Shop Now
                </Button>
              </Link>
            </Col>
            <Col style={{ background: '#f2f4f8' }}>
              <Image
                src={product.image}
                alt={product.name}
                fluid
                style={{ maxHeight: '500px' }}
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
