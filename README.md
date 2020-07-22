# server-braintree001

completar (crear si no existe) el archivo .env que contiene la configuracion de braintree

### Iniciar

instalar paquetes
<pre> npm install </pre>

iniciar el servidor
<pre> node index.js </pre>


### Pruebas

llamada GET que inicia Braintree:
<pre> http://localhost:8000/initializeBraintree </pre>

llamada POST que envia el intento de pago hacia Braintree
<pre> http://localhost:8000/confirmBraintree 

Parametros de la llamada:
{
  "payment_method_nonce": "fake-valid-nonce",
  "amount": "10.00"
}
</pre>
