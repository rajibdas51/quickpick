import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import ProductList from '../components/ProductList';

const ShopPage = () => {
  const initialProducts = [
    {
      id: 1,
      name: 'Product 1',
      category: 'Electronics',
      brand: 'Brand A',
      rating: 4,
      price: 100,
    },
    {
      id: 2,
      name: 'Product 2',
      category: 'Clothing',
      brand: 'Brand B',
      rating: 3,
      price: 50,
    },
    // Add more products as needed
  ];

  const [products, setProducts] = useState(initialProducts);
  const [filters, setFilters] = useState({
    category: '',
    brand: [],
    ratings: [],
    minPrice: '',
    maxPrice: '',
  });

  const handleFilterChange = (filterName, value) => {
    setFilters({ ...filters, [filterName]: value });
  };

  const handleApplyFilter = () => {
    const minPrice = parseInt(filters.minPrice);
    const maxPrice = parseInt(filters.maxPrice);

    if (!isNaN(minPrice) && !isNaN(maxPrice) && minPrice <= maxPrice) {
      setFilters({ ...filters, minPrice, maxPrice });
    }
  };

  const filteredProducts = products.filter((product) => {
    return (
      (!filters.category || product.category === filters.category) &&
      (filters.brand.length === 0 || filters.brand.includes(product.brand)) &&
      (filters.ratings.length === 0 ||
        filters.ratings.includes(product.rating)) &&
      (!filters.minPrice || product.price >= parseInt(filters.minPrice)) &&
      (!filters.maxPrice || product.price <= parseInt(filters.maxPrice))
    );
  });

  const uniqueCategories = Array.from(
    new Set(products.map((product) => product.category))
  );
  const uniqueBrands = Array.from(
    new Set(products.map((product) => product.brand))
  );
  const uniqueRatings = Array.from(
    new Set(products.map((product) => product.rating))
  );

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={3} className='py-4'>
          <h4>PRODUCT CATEGORIES</h4>
          <ListGroup variant='flush' className='border-bottom my-3'>
            <ListGroup.Item
              action
              onClick={() => handleFilterChange('category', '')}
            >
              All Categories
            </ListGroup.Item>
            {uniqueCategories.map((category) => (
              <ListGroup.Item
                key={category}
                action
                onClick={() => handleFilterChange('category', category)}
              >
                {category}
              </ListGroup.Item>
            ))}
          </ListGroup>

          <h4 className='mt-3'> FILTER BY BRANDS</h4>
          <Form className='border-bottom my-3 pb-3'>
            {uniqueBrands.map((brand) => (
              <Form.Check
                key={brand}
                type='checkbox'
                label={brand}
                checked={filters.brand.includes(brand)}
                onChange={() =>
                  handleFilterChange(
                    'brand',
                    toggleArrayValue(filters.brand, brand)
                  )
                }
              />
            ))}
          </Form>

          <h4 className='mt-3'>FILTER BY RATING</h4>
          <Form className='border-bottom my-4 pb-3'>
            {uniqueRatings.map((rating) => (
              <Form.Check
                key={rating}
                type='checkbox'
                label={`Rating ${rating}+`}
                checked={filters.ratings.includes(rating)}
                onChange={() =>
                  handleFilterChange(
                    'ratings',
                    toggleArrayValue(filters.ratings, rating)
                  )
                }
              />
            ))}
          </Form>

          <h4 className='my-3 '>FILTER BY PRICE</h4>
          <Form>
            <Form.Group controlId='minPrice'>
              <Form.Label>Min Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Min Price'
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='maxPrice'>
              <Form.Label>Max Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Max Price'
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              />
            </Form.Group>
            <Button
              variant='primary'
              onClick={handleApplyFilter}
              className='my-3'
            >
              Apply
            </Button>
          </Form>
        </Col>

        {/* Product List */}
        <Col md={9}>
          <h2>Products</h2>
          <Row>
            <ProductList />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ShopPage;

function toggleArrayValue(array, value) {
  if (array.includes(value)) {
    return array.filter((item) => item !== value);
  } else {
    return [...array, value];
  }
}
