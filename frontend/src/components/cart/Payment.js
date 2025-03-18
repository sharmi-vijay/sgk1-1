// import { useElements, useStripe } from "@stripe/react-stripe-js"
// import { CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
// import axios from "axios";
// import { useEffect } from "react";
// import {useDispatch, useSelector} from 'react-redux';
// import {useNavigate} from 'react-router-dom'
// import { toast } from "react-toastify";
// import { orderCompleted } from "../../slices/cartSlice";
// import {validateShipping} from '../cart/Shipping';
// import {createOrder} from '../../actions/orderActions'
// import { clearError as clearOrderError } from "../../slices/orderSlice";

// export default function Payment() {
//     const stripe = useStripe();
//     const elements = useElements();
//     const dispatch = useDispatch()
//     const navigate = useNavigate();
//     const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
//     const { user } = useSelector(state => state.authState)
//     const {items:cartItems, shippingInfo } = useSelector(state => state.cartState)
//     const { error:orderError } = useSelector(state => state.orderState)

//     const paymentData = {
//         amount : Math.round( orderInfo.totalPrice * 100),
//         shipping :{
//             name: user.name,
//             address:{
//                 city: shippingInfo.city,
//                 postal_code : shippingInfo.postalCode,
//                 country: shippingInfo.country,
//                 state: shippingInfo.state,
//                 line1 : shippingInfo.address
//             },
//             phone: shippingInfo.phoneNo
//         }
//     }

//     const order = {
//         orderItems: cartItems,
//         shippingInfo
//     }

//     if(orderInfo) {
//         order.itemsPrice = orderInfo.itemsPrice
//         order.shippingPrice = orderInfo.shippingPrice
//         order.taxPrice = orderInfo.taxPrice
//         order.totalPrice = orderInfo.totalPrice
        
//     }

//     useEffect(() => {
//         validateShipping(shippingInfo, navigate)
//         if(orderError) {
//             toast(orderError, {
//                 position: toast.POSITION.BOTTOM_CENTER,
//                 type: 'error',
//                 onOpen: ()=> { dispatch(clearOrderError()) }
//             })
//             return
//         }

//     },[])

//     const submitHandler = async (e) => {
//         e.preventDefault();
//         document.querySelector('#pay_btn').disabled = true;
//         try {
//             const {data} = await axios.post('/api/v1/payment/process', paymentData)
//             const clientSecret = data.client_secret
//             const result = await stripe.confirmCardPayment(clientSecret, {
//                 payment_method: {
//                     card: elements.getElement(CardNumberElement),
//                     billing_details: {
//                         name: user.name,
//                         email: user.email
//                     }
//                 }
//             })

//             if(result.error){
//                 toast(result.error.message, {
//                     type: 'error',
//                     position: toast.POSITION.BOTTOM_CENTER
//                 })
//                 document.querySelector('#pay_btn').disabled = false;
//             }else{
//                 if((await result).paymentIntent.status === 'succeeded') {
//                     toast('Payment Success!', {
//                         type: 'success',
//                         position: toast.POSITION.BOTTOM_CENTER
//                     })
//                     order.paymentInfo = {
//                         id: result.paymentIntent.id,
//                         status: result.paymentIntent.status
//                     }
//                     dispatch(orderCompleted())
//                     dispatch(createOrder(order))

//                     navigate('/order/success')
//                 }else{
//                     toast('Please Try again!', {
//                         type: 'warning',
//                         position: toast.POSITION.BOTTOM_CENTER
//                     })
//                 }
//             }


//         } catch (error) {
            
//         }
//     }


//      return (
//         <div className="row wrapper">
//             <div className="col-10 col-lg-5">
//                 <form onSubmit={submitHandler} className="shadow-lg">
//                     <h1 className="mb-4">Card Info</h1>
//                     <div className="form-group">
//                     <label htmlFor="card_num_field">Card Number</label>
//                     <CardNumberElement
//                         type="text"
//                         id="card_num_field"
//                         className="form-control"
                       
//                     />
                    
//                     </div>
                    
//                     <div className="form-group">
//                     <label htmlFor="card_exp_field">Card Expiry</label>
//                     <CardExpiryElement
//                         type="text"
//                         id="card_exp_field"
//                         className="form-control"
                       
//                     />
                    
//                     </div>
                    
//                     <div className="form-group">
//                     <label htmlFor="card_cvc_field">Card CVC</label>
//                     <CardCvcElement
//                         type="text"
//                         id="card_cvc_field"
//                         className="form-control"
//                         value=""
//                     />
//                     </div>
        
                
//                     <button
//                     id="pay_btn"
//                     type="submit"
//                     className="btn btn-block py-3"
//                     >
//                     Pay - { ` ₹${orderInfo && orderInfo.totalPrice}` }
//                     </button>
        
//                 </form>
//             </div>
//         </div>
//     )
// }


// import { useElements, useStripe } from "@stripe/react-stripe-js";
// import { CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { orderCompleted } from "../../slices/cartSlice";
// import { validateShipping } from "../cart/Shipping";
// import { createOrder } from "../../actions/orderActions";
// import { clearError as clearOrderError } from "../../slices/orderSlice";

// export default function Payment() {
//     const stripe = useStripe();
//     const elements = useElements();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
//     const { user } = useSelector(state => state.authState);
//     const { items: cartItems, shippingInfo } = useSelector(state => state.cartState);
//     const { error: orderError } = useSelector(state => state.orderState);
//     const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("stripe");

//     const paymentData = {
//         amount: Math.round(orderInfo.totalPrice * 100),
//         shipping: {
//             name: user.name,
//             address: {
//                 city: shippingInfo.city,
//                 postal_code: shippingInfo.postalCode,
//                 country: shippingInfo.country,
//                 state: shippingInfo.state,
//                 line1: shippingInfo.address
//             },
//             phone: shippingInfo.phoneNo
//         }
//     };

//     const order = {
//         orderItems: cartItems,
//         shippingInfo,
//         itemsPrice: orderInfo.itemsPrice,
//         shippingPrice: orderInfo.shippingPrice,
//         taxPrice: orderInfo.taxPrice,
//         totalPrice: orderInfo.totalPrice
//     };

//     useEffect(() => {
//         validateShipping(shippingInfo, navigate);
//         if (orderError) {
//             toast(orderError, {
//                 position: toast.POSITION.BOTTOM_CENTER,
//                 type: 'error',
//                 onOpen: () => { dispatch(clearOrderError()); }
//             });
//         }
//     }, [orderError, dispatch, navigate, shippingInfo]);

//     const handleStripePayment = async (e) => {
//         e.preventDefault();
//         document.querySelector('#pay_btn').disabled = true;
//         try {
//             const { data } = await axios.post('/api/v1/payment/process', paymentData);
//             const clientSecret = data.client_secret;
//             const result = await stripe.confirmCardPayment(clientSecret, {
//                 payment_method: {
//                     card: elements.getElement(CardNumberElement),
//                     billing_details: {
//                         name: user.name,
//                         email: user.email
//                     }
//                 }
//             });

//             if (result.error) {
//                 toast(result.error.message, { type: 'error', position: toast.POSITION.BOTTOM_CENTER });
//                 document.querySelector('#pay_btn').disabled = false;
//             } else if (result.paymentIntent.status === 'succeeded') {
//                 toast('Payment Success!', { type: 'success', position: toast.POSITION.BOTTOM_CENTER });
//                 order.paymentInfo = { id: result.paymentIntent.id, status: result.paymentIntent.status };
//                 dispatch(orderCompleted());
//                 dispatch(createOrder(order));
//                 navigate('/order/success');
//             } else {
//                 toast('Please Try again!', { type: 'warning', position: toast.POSITION.BOTTOM_CENTER });
//             }
//         } catch (error) {
//             toast('Payment failed!', { type: 'error', position: toast.POSITION.BOTTOM_CENTER });
//             document.querySelector('#pay_btn').disabled = false;
//         }
//     };

//     const handleRazorpayPayment = () => {
//         const amount = orderInfo.totalPrice * 100;
//         if (!amount) {
//             alert("Enter the amount");
//             return;
//         }

//         const options = {
//             key: "rzp_test_mL5jDOIqQ2F3iL",
//             key_secret: "EGgijLeX69N4FqNsYbPXT7Qg",
//             amount: 1000,
//             currency: 'INR',
//             name: 'Simons & Sons',
//             description: 'Payment for products',
//             handler: function (response) {
//                 alert(`Payment ID: ${response.razorpay_payment_id}`);
//                 order.paymentInfo = { id: response.razorpay_payment_id, status: 'succeeded' };
//                 dispatch(orderCompleted());
//                 dispatch(createOrder(order));
//                 navigate('/order/success');
//             },
//             prefill: {
//                 name: user.name,
//                 email: user.email,
//                 contact: shippingInfo.phoneNo
//             },
//             notes: { address: "Razorpay Corporate Office" },
//             theme: { color: '#3399cc' }
//         };
//         const pay = new window.Razorpay(options);
//         pay.open();
//     };

//     return (
//         <div className="row wrapper">
//             <div className="col-10 col-lg-5">
//                 <form onSubmit={selectedPaymentMethod === "stripe" ? handleStripePayment : (e) => e.preventDefault()} className="shadow-lg">
//                     <h1 className="mb-4">Payment Method</h1>
//                     <div>
//                         <label>
//                             <input type="radio" name="paymentMethod" value="stripe" checked={selectedPaymentMethod === "stripe"} onChange={() => setSelectedPaymentMethod("stripe")} />
//                             Pay with Stripe
//                         </label>
//                         <label>
//                             <input type="radio" name="paymentMethod" value="razorpay" checked={selectedPaymentMethod === "razorpay"} onChange={() => setSelectedPaymentMethod("razorpay")} />
//                             Pay with Razorpay
//                         </label>
//                     </div>
//                     {selectedPaymentMethod === "stripe" && (
//                         <>
//                             <div className="form-group">
//                                 <label htmlFor="card_num_field">Card Number</label>
//                                 <CardNumberElement id="card_num_field" className="form-control" />
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="card_exp_field">Card Expiry</label>
//                                 <CardExpiryElement id="card_exp_field" className="form-control" />
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="card_cvc_field">Card CVC</label>
//                                 <CardCvcElement id="card_cvc_field" className="form-control" />
//                             </div>
//                         </>
//                     )}
//                     <button id="pay_btn" type="submit" className="btn btn-block py-3" onClick={selectedPaymentMethod === "razorpay" ? handleRazorpayPayment : null}>
//                         Pay - {` ₹${orderInfo?.totalPrice}`}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { orderCompleted } from "../../slices/cartSlice";
import { validateShipping } from "../cart/Shipping";
import { createOrder } from "../../actions/orderActions";
import { clearError as clearOrderError } from "../../slices/orderSlice";

export default function Payment() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const { user } = useSelector((state) => state.authState);
    const { items: cartItems, shippingInfo } = useSelector((state) => state.cartState);
    const { error: orderError } = useSelector((state) => state.orderState);

    const amount = Math.round(orderInfo.totalPrice * 100);

    const order = {
        orderItems: cartItems,
        shippingInfo,
        itemsPrice: orderInfo.itemsPrice,
        shippingPrice: orderInfo.shippingPrice,
        taxPrice: orderInfo.taxPrice,
        totalPrice: orderInfo.totalPrice,
    };

    useEffect(() => {
        validateShipping(shippingInfo, navigate);
        if (orderError) {
            toast(orderError, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: "error",
                onOpen: () => {
                    dispatch(clearOrderError());
                },
            });
        }
    }, []);

    const handlePayment = async () => {
        try {
            const { data } = await axios.post("/api/v1/payment/process", { amount });
            const options = {
                key: "rzp_test_mL5jDOIqQ2F3iL", // Replace with your Razorpay Test Key
                amount: amount,
                currency: "INR",
                name: "Simons & Sons",
                description: "Payment for products",
                handler: function (response) {
                    toast("Payment Successful!", {
                        type: "success",
                        position: toast.POSITION.BOTTOM_CENTER,
                    });
                    order.paymentInfo = {
                        id: response.razorpay_payment_id,
                        status: "succeeded",
                    };
                    dispatch(orderCompleted());
                    dispatch(createOrder(order));
                    navigate("/order/success");
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: shippingInfo.phoneNo,
                },
                theme: {
                    color: "#3399cc",
                },
            };
            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            toast("Payment Failed!", {
                type: "error",
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }
    };

    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <div className="shadow-lg p-4">
                    <h1 className="mb-4">Payment Method</h1>
                    <button
                        id="pay_btn"
                        type="button"
                        className="btn btn-block py-3 btn-primary"
                        onClick={handlePayment}
                    >
                        Pay - ₹{orderInfo && orderInfo.totalPrice}
                    </button>
                </div>
            </div>
        </div>
    );
}
