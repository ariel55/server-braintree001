# server-braintree001

##init
npm init 

##package
npm install express --save
npm install body-parser --save
npm install braintree --save
npm install dotenv --save

##run
node index.js 


##pruebas
get -> http://localhost:8000/initializeBraintree
post -> http://localhost:8000/confirmBraintree
{
  "payment_method_nonce": "fake-valid-nonce",
  "amount": "10.00"
}
