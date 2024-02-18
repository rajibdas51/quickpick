import React, { useEffect, useState } from 'react';
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
import {
  useGetProductsQuery,
  useGetAllCategoriesQuery,
} from '../slices/productApiSlice.js';
import { Link, useParams } from 'react-router-dom';
import Rating from '../components/Rating.jsx';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

const ShopPage = () => {
  const { pageNum, keyword, catName } = useParams();
  const { data: products, isLoading, error } = useGetProductsQuery();
  //console.log(products);
  const { data: categories } = useGetAllCategoriesQuery();
  //console.log(categories);
  const navigate = useNavigate();
  const ratingArray = [5, 4, 3, 2, 1];
  const [filterProducts, setFilterProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: catName || '',
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

  let filteredProducts;

  if (keyword) {
    filteredProducts = products
      ?.filter((product) => {
        return (
          (!filters.category || product.category === filters.category) &&
          (filters.brand.length === 0 ||
            filters.brand.includes(product.brand)) &&
          (filters.ratings.length === 0 ||
            filters.ratings.includes(product.rating)) &&
          (!filters.minPrice || product.price >= parseInt(filters.minPrice)) &&
          (!filters.maxPrice || product.price <= parseInt(filters.maxPrice))
        );
      })
      .filter((product) => {
        return product.name.toLowerCase().includes(keyword.toLowerCase());
      });
  } else {
    filteredProducts = products?.filter((product) => {
      return (
        (!filters.category || product.category === filters.category) &&
        (filters.brand.length === 0 || filters.brand.includes(product.brand)) &&
        (filters.ratings.length === 0 ||
          filters.ratings.includes(product.rating)) &&
        (!filters.minPrice || product.price >= parseInt(filters.minPrice)) &&
        (!filters.maxPrice || product.price <= parseInt(filters.maxPrice))
      );
    });
  }

  const uniqueCategories = Array.from(
    new Set(products?.map((product) => product.category))
  );
  const uniqueBrands = Array.from(
    new Set(products?.map((product) => product.brand))
  );
  const uniqueRatings = Array.from(
    new Set(products?.map((product) => product.rating))
  );

  useEffect(() => {
    //setProducts(data?.products);
  }, [filters]);
  return (
    <Container>
      <Row>
        {/* Sidebar */}
        <Col md={3} className='py-4'>
          <h4>PRODUCT CATEGORIES</h4>
          <Form>
            <Form.Group
              controlId='categoryFilter'
              className='border-bottom my-3 pb-3'
            >
              <Form.Check
                type='radio'
                label='All Categories'
                checked={filters.category === ''}
                onChange={() => handleFilterChange('category', '')}
              />

              {uniqueCategories?.map((category) => (
                <Form.Check
                  type='radio'
                  label={category}
                  checked={filters.category === category}
                  onChange={() => handleFilterChange('category', category)}
                  id={`category-${category}`}
                />
              ))}
            </Form.Group>
          </Form>

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
            {ratingArray.map((rating) => (
              <div key={rating} className='d-flex align-items-center'>
                <Form.Check
                  type='checkbox'
                  label=''
                  checked={filters.ratings.includes(rating)}
                  onChange={() =>
                    handleFilterChange(
                      'ratings',
                      toggleArrayValue(filters.ratings, rating)
                    )
                  }
                />
                <Rating value={rating} text='' />
              </div>
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
          {keyword ||
            (catName && (
              <>
                <h1>
                  Search Results for "
                  {keyword ? keyword : catName ? `${catName} category` : ''}"
                </h1>
                <Link to='/shop' className='btn btn-light'>
                  Back to Shop
                </Link>
              </>
            ))}
          <Row>
            <ProductList
              products={filteredProducts}
              isLoading={isLoading}
              keyword={keyword}
              error={error}
            />
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
