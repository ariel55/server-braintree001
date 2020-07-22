# server-braintree001

completar (crear si no existe) el archivo .env que contiene la configuracion de braintree

## run
npm install
node index.js 


##pruebas
get -> http://localhost:8000/initializeBraintree
post -> http://localhost:8000/confirmBraintree
{
  "payment_method_nonce": "fake-valid-nonce",
  "amount": "10.00"
}
