import Head from 'next/head'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { userService } from '../services';
import { Credentials } from '../interfaces/login.interface';

export default function Login() {
    const router = useRouter();

    useEffect(() => {
        if (userService.userValue) {
            router.push('/');
        }
        
    }, [userService.userValue]);

    // form validation rules
    const validationSchema: Yup.SchemaOf<Credentials> = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

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
        <>
            <Head>
                <title>Login Page</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="d-flex justify-content-md-center align-items-center vh-100">
                <div className="card" style={{ width: '30%' }}>
                    <h4 className="card-header">Login</h4>
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
                                    {...register('username')}
                                    className={`form-control ${errors.username ? 'is-invalid' : ''
                                        }`}
                                />
                                {errors.username && (
                                    <div className="invalid-feedback">
                                        {errors.username?.message}
                                    </div>
                                )}
                            </div>
                            <div className="form-group mb-3">
                                <label>Password</label>
                                <input
                                    type="password"
                                    {...register('password')}
                                    className={`form-control ${errors.password ? 'is-invalid' : ''
                                        }`}
                                />
                                {errors.password && (
                                    <div className="invalid-feedback">
                                        {errors.password?.message}
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
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
