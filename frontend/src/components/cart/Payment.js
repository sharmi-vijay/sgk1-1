import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { orderCompleted } from "../../slices/cartSlice";
import { validateShipping } from "../cart/Shipping";
import { createOrder } from "../../actions/orderActions";
import { clearError as clearOrderError } from "../../slices/orderSlice";

export default function Payment() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    const { user } = useSelector(state => state.authState);
    const { items: cartItems, shippingInfo } = useSelector(state => state.cartState);
    const { error: orderError } = useSelector(state => state.orderState);

    const order = {
        orderItems: cartItems,
        shippingInfo,
        itemsPrice: orderInfo.itemsPrice,
        shippingPrice: orderInfo.shippingPrice,
        taxPrice: orderInfo.taxPrice,
        totalPrice: orderInfo.totalPrice
    };

    useEffect(() => {
        validateShipping(shippingInfo, navigate);
        if (orderError) {
            toast(orderError, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearOrderError()); }
            });
        }
    }, [orderError, dispatch, navigate, shippingInfo]);

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleRazorpayPayment = async () => {
        const isLoaded = await loadRazorpayScript();
        
        if (!isLoaded) {
            alert("Razorpay SDK failed to load. Check your internet connection.");
            return;
        }
    
        const amount = orderInfo.totalPrice * 100; // Convert to paisa
        if (!amount) {
            alert("Enter the amount");
            return;
        }
    
        const options = {
            key: "rzp_test_mL5jDOIqQ2F3iL", // Use your Razorpay test/live key
            amount: amount,
            currency: 'INR',
            name: 'SGK Fabrics',
            description: 'Payment for products',
            handler: function (response) {
                alert(`Payment ID: ${response.razorpay_payment_id}`);
                order.paymentInfo = { id: response.razorpay_payment_id, status: 'succeeded' };
                dispatch(orderCompleted());
                dispatch(createOrder(order));
                navigate('/order/success');
            },
            prefill: {
                name: user.name,
                email: user.email,
                contact: shippingInfo.phoneNo
            },
            theme: { color: '#3399cc' }
        };
    
        const pay = new window.Razorpay(options);
        pay.open();
    };

    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg">
                    <h1 className="mb-4">Payment</h1>
                    <button id="pay_btn" type="button" className="btn btn-block py-3" onClick={handleRazorpayPayment}>
                        Pay - {` ₹${orderInfo?.totalPrice}`}
                    </button>
                </form>
            </div>
        </div>
    );
}



