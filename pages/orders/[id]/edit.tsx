import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Breadcrumb } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import Layout from "../../../components/Layout";
import { Order } from "../../../interfaces/order.interface";
import { userService } from "../../../services";
import { orderService } from "../../../services/order.service";

export default function EditOrder() {
    const [order, setOrder]: Array<any> = useState(null);
    const router = useRouter()

    useEffect(() => {
        if (!router.isReady) return;
        if (userService.userValue?.seller_id === undefined) {
            router.push('/login');
        }

        orderService.getById(router.query.id).then(response => {
            setOrder(response);
        });

    }, [router.isReady]);

    // form validation rules
    const validationSchema: Yup.SchemaOf<Order> = Yup.object().shape({
        shipping_limit_date: Yup.date().required('Shipping limit date is required'),
        price: Yup.number().required('Price is required'),
        freight_value: Yup.number().required('Freigh value is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, setError, formState } = useForm(formOptions);
    const { errors } = formState;

    const onSubmit = async (data: any) => {
        try {
            await orderService.update(order.order_id, data);
            setError('apiMessage', { type: 'success', message: 'Update successful' });
        } catch (error: any) {
            setError('apiMessage', { type: 'danger', message: error });
        }
    }

    return (
        <div className="container-fluid p-0">
            <Head>
                <title>Edit Order</title>
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
                                {order && <Breadcrumb.Item href={`/orders/${encodeURIComponent(order.order_id)}`}>Order</Breadcrumb.Item>}
                                <Breadcrumb.Item active>Edit Order</Breadcrumb.Item>
                            </Breadcrumb>
                            <h4>Edit Order</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-10 mx-auto">
                            {order
                                ? <div className="card">
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            {errors.apiMessage && (
                                                <div className={`alert alert-${errors.apiMessage?.type} mt-3 mb-0`}>
                                                    Update successful
                                                </div>
                                            )}
                                            <div className="form-group">
                                                <label>Shipping Limit Date</label>
                                                <input
                                                    type="text"
                                                    defaultValue={order.shipping_limit_date}
                                                    {...register('shipping_limit_date')}
                                                    className={`form-control ${errors.shipping_limit_date ? 'is-invalid' : ''
                                                        }`}
                                                />
                                                {errors.shipping_limit_date && (
                                                    <div className="invalid-feedback">
                                                        shipping_limit_date is required
                                                    </div>
                                                )}
                                            </div>
                                            <div className="form-group mb-3">
                                                <label>Price</label>
                                                <input
                                                    defaultValue={order.price}
                                                    {...register('price')}
                                                    className={`form-control ${errors.price ? 'is-invalid' : ''
                                                        }`}
                                                />
                                                {errors.price && (
                                                    <div className="invalid-feedback">
                                                        Price is required
                                                    </div>
                                                )}
                                            </div>
                                            <div className="form-group mb-3">
                                                <label>Freight Value</label>
                                                <input
                                                    defaultValue={order.freight_value}
                                                    {...register('freight_value')}
                                                    className={`form-control ${errors.freight_value ? 'is-invalid' : ''
                                                        }`}
                                                />
                                                {errors.freight_value && (
                                                    <div className="invalid-feedback">
                                                        freight_value is required
                                                    </div>
                                                )}
                                            </div>
                                            <button
                                                disabled={formState.isSubmitting}
                                                className="form-group btn btn-success col-12"
                                            >
                                                {formState.isSubmitting && (
                                                    <span className="spinner-border spinner-border-sm mr-1"></span>
                                                )}
                                                Update
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                : <div>
                                    Could not find order with the ID
                                </div>}
                        </div>
                    </div>
                </main>
            </Layout>
        </div >
    )
}