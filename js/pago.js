document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Limpiar mensajes de error previos
    clearErrors();

    const cardName = document.getElementById('card-name').value.trim();
    const cardNumber = document.getElementById('card-number').value.trim();
    const cardExpiry = document.getElementById('card-expiry').value.trim();
    const cardCvc = document.getElementById('card-cvc').value.trim();
    
    let isValid = true;

    // Validación de nombre
    if (!validateName(cardName)) {
        showError('name-error', 'El nombre es obligatorio.');
        isValid = false;
    }

    // Validación del número de tarjeta
    if (!validateCardNumber(cardNumber)) {
        showError('number-error', 'Número de tarjeta inválido.');
        isValid = false;
    }

    // Validación de la fecha de vencimiento
    if (!validateExpiry(cardExpiry)) {
        showError('expiry-error', 'Fecha de vencimiento inválida.');
        isValid = false;
    }

    // Validación del CVC
    if (!validateCVC(cardCvc)) {
        showError('cvc-error', 'CVC inválido.');
        isValid = false;
    }

    if (isValid) {
        // Aquí puedes agregar la lógica para procesar el pago
        // Por ejemplo, enviar los datos a un servidor o utilizar una API de pago como Stripe o Mercado Pago

        document.getElementById('message').innerText = 'Pago procesado con éxito para ' + cardName + '!';
        document.getElementById('payment-form').reset();
        
        // Limpiar mensajes después de un pago exitoso
        clearErrors();
        
        // Puedes agregar un manejo adicional para mostrar un modal o redirigir al usuario.
        
        console.log("Datos del pago:", { cardName, cardNumber, cardExpiry, cardCvc });
        
        // Aquí podrías hacer una llamada a la API para procesar el pago.
        
        // Ejemplo ficticio:
        // processPayment({ cardName, cardNumber, cardExpiry, cardCvc });
        
        return; // Salimos para evitar mostrar el mensaje de error.
        
      } else {
          document.getElementById('message').innerText = 'Por favor corrige los errores antes de continuar.';
      }
});

// Funciones de validación
function validateName(name) {
   return name.length > 0; 
}

function validateCardNumber(number) {
   const regex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9]{2})[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|7[0-9]{15})$/; 
   return regex.test(number.replace(/\s/g, ''));
}

function validateExpiry(expiry) {
   const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/; 
   return regex.test(expiry);
}

function validateCVC(cvc) {
   return /^[0-9]{3,4}$/.test(cvc); 
}

// Funciones para mostrar y limpiar errores
function showError(id, message) {
   document.getElementById(id).innerText = message; 
   document.getElementById(id.replace('-error', '')).classList.add('error');
}

function clearErrors() {
   const errorMessages = document.querySelectorAll('.error-message');
   errorMessages.forEach(msg => msg.innerText = '');
   
   const inputs = document.querySelectorAll('input');
   inputs.forEach(input => input.classList.remove('error'));
}
