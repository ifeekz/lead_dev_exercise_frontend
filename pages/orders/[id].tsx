import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Breadcrumb, Button, ButtonGroup, Table } from 'react-bootstrap';
import Swal from 'sweetalert2'

import Layout from '../../components/Layout';
import { orderService } from '../../services/order.service';
import { userService } from '../../services/user.service';

export default function Order() {
    const [order, setOrder]: Array<any> = useState(null);
    const router = useRouter()

    useEffect(() => {
        if (!router.isReady) return;
        if (!userService.userValue?.seller_id === undefined) {
            router.push('/login');
        }

        orderService.getById(router.query.id).then((response: any) => {
            setOrder(response)
        });
    }, [router.isReady]);

    const deleteOrder = async () => {
        try {
            await Swal.fire({
                title: 'Are you sure you want to delete this order?',
                showDenyButton: true,
                confirmButtonText: 'Yes',
                denyButtonText: 'No',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await orderService.delete(order.order_id);
                    Swal.fire('Deleted successfully!', '', 'success')
                    router.push('/');
                }
            })
        } catch (error: any) {
            console.log(error);
        }
    }

    return (
        <>
            <Head>
                <title>Order</title>
                <meta name="description" content="Get list of orders" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout>
                <main className="container">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                        <div className="d-block mb-4 mb-md-0">
                            <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
                                <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
                                <Breadcrumb.Item href="/">OList ECommerce</Breadcrumb.Item>
                                {order && <Breadcrumb.Item href="/">Orders</Breadcrumb.Item>}
                                <Breadcrumb.Item active>Order Details</Breadcrumb.Item>
                            </Breadcrumb>
                            <h4>Order Details</h4>
                        </div>
                        {order && <div className="btn-toolbar mb-2 mb-md-0">
                            <ButtonGroup>
                                <Button variant="outline-info" size="sm" onClick={() => router.push(`/orders/${order.order_id}/edit`)}>Edit</Button>
                                <Button variant="outline-danger" size="sm" onClick={deleteOrder}>Delete</Button>
                            </ButtonGroup>
                        </div>}
                    </div>
                    <div className="row">
                        <div className="col-md-12 mx-auto">
                            {order
                                ? <div>
                                    <Table hover className="user-table align-items-center">
                                        <tbody>
                                            <tr>
                                                <th>Order ID:</th>
                                                <td>{order.order_id}</td>
                                            </tr>
                                            <tr>
                                                <th>Product Id:</th>
                                                <td>{order.product_id}</td>
                                            </tr>
                                            <tr>
                                                <th>Price:</th>
                                                <td>{order.price}</td>
                                            </tr>
                                            <tr>
                                                <th>Freight Value:</th>
                                                <td>{order.freight_value}</td>
                                            </tr>
                                            <tr>
                                                <th>Shipping Limit Date:</th>
                                                <td>{order.shipping_limit_date}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                                : <div>
                                    Could not find order with the ID
                                </div>}
                        </div>
                    </div>
                </main>
            </Layout>
        </>
    );
}
