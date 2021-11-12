import React, {useState, useEffect} from 'react'
import './Payement.css' ;
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useHistory } from 'react-router-dom';
import { CardElement, Elements, useStripe, useElements,} from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';
import { db } from './firebase';


function Payement() {
    const history = useHistory();
    const [{basket, user}, dispatch] = useStateValue();
    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");

    const [error, setError] = useState(null);
    const [disable, setDisable] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);
    const basketTotal = (getBasketTotal(basket))*100;
    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method : 'post',
                url : `/payments/create?total=${basketTotal}`
                //stripe expects a total in a currency subunits
            });
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    }, [basket])
    console.log('user is ',user);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            db.collection('users').doc(user?.uid)
            .collection('orders').doc(paymentIntent.id)
            .set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created,
            })

            setSucceeded(true)
            setError(null)
            setProcessing(false)
            dispatch({
                type: 'EMPTY_BASKET'
            })
            history.replace('/orders')
        });
    };
    const handleChange = event =>{
        setDisable(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className="payment">
            <div className="payment__container">
                <h1>Checkout (
                    <Link to="/checkout">{basket?.length} items</Link>
                )
                </h1>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery adresse</h3>
                    </div>
                    <div className="payment__adresse">
                        <p>{user?.email}</p>
                        <p>22 jumpstreet</p>
                        <p>Los Angolos, CA</p>
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map(item => (
                            <CheckoutProduct 
                            id ={item.id}
                            title={item.title}
                            price={item.price}
                            rating={item.rating}
                            image={item.image}
                            />
                        ))}
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="payment__priceContainer">
                            <CurrencyFormat
                                renderText={(value) => (
                                <>
                                    <h3>Order total: {value} </h3>
                                </>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)} 
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                            />
                            <button type="submit" disabled={processing || disable || succeeded}>
                                <span>{processing ? <p>processing</p> : "Buy Now"} </span>
                            </button>
                            </div>
                            {error && <div>{error} </div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payement
