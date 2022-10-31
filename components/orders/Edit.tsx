import Head from "next/head";
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import Footer from "../Footer";
import Header from "../Header";
import { Order } from "../../interfaces/order.interface";

export default function EditOrder(props: any) {
    const order = props?.order;
    const router = useRouter()

    // form validation rules
    const validationSchema: Yup.SchemaOf<Order> = Yup.object().shape({
        shipping_limit_date: Yup.date().required('Shipping limit date is required'),
        price: Yup.number().required('Price is required'),
        freight_value: Yup.number().required('Freigh weight is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    if (order) {
        // const { ...defaultValues } = order;
        formOptions.defaultValues = order;
    }

    // get functions to build form with useForm() hook
    const { register, handleSubmit, setError, formState } = useForm(formOptions);
    const { errors } = formState;

    async function onSubmit({ username, password }: any) {
        try {
            await userService.login(username, password);
            const returnUrl: any = router.query.returnUrl || '/';
            router.push(returnUrl);
        } catch (error: any) {
            setError('apiError', { message: error });
        }
    }

    return (
        <div className="container-fluid p-0">
            <Head>
                <title>Edit Order</title>
                <meta name="description" content="Get list of orders" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <main className="col-10 mx-auto">
                <div className="row">
                    <div className="col-md-10 mx-auto">

                        {order
                            ? <div className="card" style={{ width: '30%' }}>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        {errors.apiError && (
                                            <div className="alert alert-danger mt-3 mb-0">
                                                {errors.apiError?.message}
                                            </div>
                                        )}
                                        <div className="form-group">
                                            <label>Username</label>
                                            <input
                                                type="text"
                                                {...register('shipping_limit_date')}
                                                className={`form-control ${errors.shipping_limit_date ? 'is-invalid' : ''
                                                    }`}
                                            />
                                            {errors.shipping_limit_date && (
                                                <div className="invalid-feedback">
                                                    {errors.shipping_limit_date?.message}
                                                </div>
                                            )}
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Password</label>
                                            <input
                                                type="password"
                                                {...register('password')}
                                                className={`form-control ${errors.price ? 'is-invalid' : ''
                                                    }`}
                                            />
                                            {errors.price && (
                                                <div className="invalid-feedback">
                                                    {errors.price?.message}
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            disabled={formState.isSubmitting}
                                            className="form-group btn btn-primary col-12"
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
                </div >
            </main >

            <Footer />
        </div >
    )
}