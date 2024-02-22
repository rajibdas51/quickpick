import React from 'react';
import {
  Badge,
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Image,
} from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
import { useGetProductsQuery } from '../slices/productApiSlice';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const { data: products, isLoading } = useGetProductsQuery();
  const categories = products?.map((product) => product.category);
  const uniqueCategories = [...new Set(categories)];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header style={{ backgroundColor: '#ffff' }}>
      <Navbar expand='md' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <Image
                src='/images/logo.jpg'
                alt='logo'
                style={{ width: '100%', height: '60px' }}
              />
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <Nav.Link href='/shop'>Shop</Nav.Link>
              <NavDropdown title='Categories' id='nav-dropdown'>
                {uniqueCategories?.map((category, index) => (
                  <LinkContainer to={`/shop/category/${category} `} key={index}>
                    <NavDropdown.Item eventKey='4.1'>{`${category}`}</NavDropdown.Item>
                  </LinkContainer>
                ))}
              </NavDropdown>
              <SearchBox className='mx-5' />
              <Nav.Link href='/cart' className='me-3'>
                <FaShoppingCart className='cart-icon' />

                {cartItems.length > 0 && (
                  <Badge
                    pill
                    bg='warning'
                    style={{
                      position: 'absolute',
                      marginTop: '-5px',
                      marginRight: '5px',
                    }}
                  >
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </Badge>
                )}
              </Nav.Link>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link href='/login'>
                    <FaUser /> Sign-in
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
