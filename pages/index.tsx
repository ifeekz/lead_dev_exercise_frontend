import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';

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

          <OrdersTable />

        </main>
      </Layout>
    </>
  );
}

export default Home;