import Head from "next/head";
import Footer from "../Footer";
import Header from "../Header";

export default function ViewOrder(props: any) { 
    const order = props?.order;
    
    return (
        <div className="container-fluid p-0">
            <Head>
                <title>Order</title>
                <meta name="description" content="Get list of orders" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <main className="col-9 mx-auto">
                <div className="row">
                    <div className="col-md-10 mx-auto">
                        <div className="d-flex justify-content-between">
                            <h4>Order Details</h4>
                            {order && <div className="mb-3">
                                <a
                                    href="'/order_items/' + order.order_id + '/edit'"
                                    className="btn btn-primary mr-2"
                                >
                                    Edit
                                </a>
                                <button className="btn btn-danger">Delete</button>
                            </div>}
                        </div>
                        {order
                            ? <div>
                                <table className="table borderless">
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
                                </table>
                            </div>
                            : <div>
                                Could not find order with the ID
                            </div>}
                    </div>
                </div >
            </main >

            <Footer />
        </div >
    )
}