
const express    = require("express");
const bodyParser = require('body-parser');
const cors       = require('cors')
const braintree  = require('braintree');

const app = express();
app.use(cors())

const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
};

app.get('/', function(req, res) {
 respuesta = {
  error: true,
  codigo: 200,
  mensaje: 'Punto de inicio'
 };
 res.send(respuesta);
});

const gateway = braintree.connect({
    "environment": braintree.Environment[process.env.BRAINTREE_ENV],
    "merchantId" : process.env.BRAINTREE_MERCHANT_ID,
    "publicKey"  : process.env.BRAINTREE_PUBLIC_KEY,
    "privateKey" : process.env.BRAINTREE_PRIVATE_KEY
});

// app.post('/customer-find', async (req, res) => 
// {
//     const data = req.body;

//     let transactionResponse = await gateway.customer.find(data.customerId, function(err, customer) { 
//         if (err)
//             res.send({data: err});
//         else
//             res.send({data: customer});    
//     });
    
// });

// app.post('/create-customer', async (req, res) => 
// {
//     const data = req.body;

//     // crear un customer asociado a un metodo de pago
//     gateway.customer.create(
//     {
//         id: data.customer_id,
//         firstName: data.firstName,
//         lastName: data.lastName,
//         paymentMethodNonce: data.payment_method_nonce
//     }, 
//     function (err, result) {
//             res.send({data: result});
//     });

// });

app.get('/initializeBraintree', async (req, res) => 
{
    let token = (await gateway.clientToken.generate({})).clientToken;
    res.send({data: token});
});

app.post('/confirmBraintree', async (req, res) => 
{
    const data = req.body;

    let transactionResponse = await gateway.transaction.sale(
    {
        amount: data.amount,
        paymentMethodNonce: data.payment_method_nonce,
        customerId: data.customer_id,
        options: {
            submitForSettlement: true
        }
    });
    
    res.send({data: transactionResponse});
});


app.use(function(req, res, next) {
 respuesta = {
  error: true, 
  codigo: 404, 
  mensaje: 'URL no encontrada'
 };
 res.status(404).send(respuesta);
});

app.listen(8000, () => {
 console.log("El servidor está inicializado en el puerto 8000");
});
