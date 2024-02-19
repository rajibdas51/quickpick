import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
const Paginate = ({
  totalProducts,
  productsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  //console.log(totalProducts);
  return (
    totalProducts > 1 && (
      <Pagination>
        {[...Array(Math.ceil(totalProducts / productsPerPage)).keys()].map(
          (p) => (
            <LinkContainer
              to=''
              key={p + 1}
              onClick={() => setCurrentPage(p + 1)}
            >
              <Pagination.Item active={p + 1 === currentPage}>
                {p + 1}
              </Pagination.Item>
            </LinkContainer>
          )
        )}
      </Pagination>
    )
  );
};

export default Paginate;
