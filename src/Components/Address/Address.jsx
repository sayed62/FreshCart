import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';

function Address() {
    const [errorMsg, setErrorMsg] = useState('');
    const [isloading, setIsloading] = useState(false);
    let { cartId } = useParams();

    const validationSchema = Yup.object({
        details: Yup.string().required('Details is required'),
        city: Yup.string().required('City is required'),
        phone: Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number")
    });

    const onSubmit = async (values) => {
        setIsloading(true);
        setErrorMsg('');
        try {
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, {
                shippingAddress: values
            }, {
                headers: {
                    token: localStorage.getItem('token')
                },
                params: {
                    url: 'http://localhost:3001'
                }
            });
            window.open(data.session.url, '_self');
        } catch (error) {
            setErrorMsg(error.response.data.message);
        }
        setIsloading(false);
    };

    const formik = useFormik({
        initialValues: {
            details: '',
            city: '',
            phone: ''
        },
        onSubmit,
        validationSchema
    });

    return (
        <div className="w-75 m-auto my-5">
            <h2>Address:</h2>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="details" className='my-1'>Details:</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} type="text" className='form-control mb-3' id='details' name='details' />
                    {formik.errors.details && formik.touched.details && <p className='alert alert-danger'>{formik.errors.details}</p>}
                </div>

                <div>
                    <label htmlFor="city" className='my-1'>City:</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} type="text" className='form-control mb-3' id='city' name='city' />
                    {formik.errors.city && formik.touched.city && <p className='alert alert-danger'>{formik.errors.city}</p>}
                </div>

                <div>
                    <label htmlFor="phone" className='my-1'>Phone:</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="text" className='form-control mb-3' id='phone' name='phone' />
                    {formik.errors.phone && formik.touched.phone && <p className='alert alert-danger'>{formik.errors.phone}</p>}
                </div>

                {errorMsg && <div className='alert alert-danger'>{errorMsg}</div>}
                {isloading ? <button type='button' disabled className='btn btn-main px-3 text-white ms-auto d-block px-4'><i className='fas fa-spin fa-spinner'></i></button> :
                    <button type='submit' disabled={isloading || !formik.isValid} className='btn bg-main px-3 text-white ms-auto d-block'>CheckOut</button>
                }
            </form>
        </div>
    );
}

export default Address;
