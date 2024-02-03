import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetProductsQuery } from '../../slices/productApiSlice';
import { toast } from 'react-toastify';

const ProductListPage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  console.log(products);
  return <></>;
};

export default ProductListPage;
