import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';

import { OrdersTable } from "../components/Tables";
import { userService } from '../services/user.service';
import Layout from '../components/Layout';

const Home = () => {
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return;
    if (!userService.userValue?.seller_id === undefined) {
      router.push('/login');
    }
  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Get list of orders" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className="container">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
            <div className="d-block mb-4 mb-md-0">
              <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
                <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
                <Breadcrumb.Item>OList ECommerce</Breadcrumb.Item>
                <Breadcrumb.Item active>Orders</Breadcrumb.Item>
              </Breadcrumb>
              <h4>My Orders</h4>
            </div>
            <div className="btn-toolbar mb-2 mb-md-0">
              <ButtonGroup>
                <Button variant="outline-primary" size="sm">Create Order</Button>
              </ButtonGroup>
            </div>
          </div>

          <div className="table-settings mb-4">
            <Row className="justify-content-between align-items-center">
              <Col xs={8} md={6} lg={3} xl={4}>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faSearch} />
                  </InputGroup.Text>
                  <Form.Control type="text" placeholder="Search" />
                </InputGroup>
              </Col>
              <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-0">
                    <span className="icon icon-sm icon-gray">
                      <FontAwesomeIcon icon={faCog} />
                    </span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu-xs dropdown-menu-right">
                    <Dropdown.Item className="fw-bold text-dark">Show</Dropdown.Item>
                    <Dropdown.Item className="d-flex fw-bold">
                      10 <span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>
                    </Dropdown.Item>
                    <Dropdown.Item className="fw-bold">20</Dropdown.Item>
                    <Dropdown.Item className="fw-bold">30</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
          </div>

          <OrdersTable />



          {/* <div className="container-fluid p-0">
            <main className="col-9 mx-auto">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th style={{ width: '25%' }}>Order Id</th>
                    <th style={{ width: '20%' }}>Product Category</th>
                    <th style={{ width: '20%' }}>Price</th>
                    <th style={{ width: '25%' }}>Product Id</th>
                    <th style={{ width: '10%' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {orders && orders.map((order: { id: Key; product_category: string; price: string; product_id: string; }) =>
                    <tr key={order.id}>
                      id}</td>
                      product_category}</td>
                      price}</td>
                      product_id}</td>
                      <td style={{ whiteSpace: 'nowrap' }}>
                        <Link href={`/orders/${order.id}`} onClick={() => router.push(`/orders/${order.id}`)} className="btn btn-sm btn-primary mr-1">View</Link>
                      </td>
                    </tr>
                  )}
                  {!orders &&
                    <tr>
                      <td colSpan="5" className="text-center">
                        <div className="spinner-border spinner-border-lg align-center"></div>
                      </td>
                    </tr>
                  }
                  {orders && !orders.length &&
                    <tr>
                      <td colSpan="5" className="text-center">
                        <div className="p-2">No orders To Display</div>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
              <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                activeClassName={'active'}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                initialPage={props.currentPage - 1}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={pagginationHandler}
              />
            </main>

          </div> */}
        </main>
      </Layout>
    </>
  );
}

export default Home;