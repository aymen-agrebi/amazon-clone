const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const { response } = require('express');
const { request } = require('express');
const stripe = require('stripe')('sk_test_51I6hSUGjGrkWUe4Q5cjtu0M6WUwrDQ0lAqJW6JwbutM7UlNR2OzldiPOisLbdf9nQD5GS9Tzse3PTogiL6uhREMy00SqffCoa5');

// API

// -APP CONFIG
const app = express();

// -Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// -API routes
app.get('/', (request, response)=> response.status(200).send('hello world'));
app.get('/aymen', (request, response)=> response.status(200).send('hello aymen'));
app.post('/payments/create', async(request, response) =>{
    const total = request.query.total;
    console.log('payment request recieved BOOM !!!', total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, //in subunit
        currency: "usd",
    });

    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

// -Listen command
exports.api = functions.https.onRequest(app);

// example endpoint
// http://localhost:5001/marketplace-react-291a9/us-central1/api
