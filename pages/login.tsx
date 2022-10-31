import Head from 'next/head'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Col, Row, Form, Button, InputGroup, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import BgImage from "../assets/images/illustrations/signin.svg";

import { userService } from '../services';
import { Credentials } from '../interfaces/login.interface';

export default () => {
    const router = useRouter();

    useEffect(() => {
        if (userService.userValue?.seller_id !== undefined) {
            router.push('/');
        }

    }, [userService.userValue]);

    // form validation rules
    const validationSchema: Yup.SchemaOf<Credentials> = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, setError, formState } = useForm(formOptions);
    const { errors } = formState;

    const  onSubmit = async ({ username, password }: any) => {
        try {
            await userService.login(username, password);
            const returnUrl: any = router.query.returnUrl || '/';
            router.push(returnUrl);
        } catch (error: any) {
            setError('apiError', { message: error });
        }
    }

    return (
        <main>
            <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                <Container>
                    <Row className="justify-content-center form-bg-image" style={{backgroundImage: `url(${BgImage})`}}>
                        <Col xs={12} className="d-flex align-items-center justify-content-center">
                            <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                                <div className="text-center text-md-center mb-4 mt-md-0">
                                    <h3 className="mb-0">Sign In</h3>
                                </div>
                                {errors.apiError && (
                                    <div className="alert alert-danger mt-3 mb-0 text-center">
                                        Invalid username or password
                                    </div>
                                )}
                                <Form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                                    <Form.Group id="usename" className="mb-4">
                                        <Form.Label>Username</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faEnvelope} />
                                            </InputGroup.Text>
                                            <Form.Control {...register('username')} className={`${errors.username ? 'is-invalid' : ''}`} autoFocus type="text" placeholder="Username" />
                                        </InputGroup>
                                        {errors.username && (
                                            <div className="invalid-feedback">
                                                Username name is required
                                            </div>
                                        )}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Group id="password" className="mb-4">
                                            <Form.Label>Password</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    <FontAwesomeIcon icon={faUnlockAlt} />
                                                </InputGroup.Text>
                                                <Form.Control {...register('password')} className={`${errors.password ? 'is-invalid' : ''}`} type="password" placeholder="Password" />
                                            </InputGroup>
                                            {errors.password && (
                                                <div className="invalid-feedback">
                                                    Password is required
                                                </div>
                                            )}
                                        </Form.Group>
                                    </Form.Group>
                                    <Button disabled={formState.isSubmitting}  variant="success" type="submit" className="w-100">
                                        {formState.isSubmitting && (
                                            <span className="spinner-border spinner-border-sm mr-1"></span>
                                        )}
                                        Login
                                    </Button>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    );
};