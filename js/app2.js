//Variables
const btnEnviar = document.querySelector('#enviar'); //seleccionamos id del boton enviar
const btnReset = document.querySelector('#resetBtn'); 
const formulario = document.querySelector('#enviar-mail');

//Variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListener();
function eventListener(){
    //cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);
    
    //campos del formulario
    email.addEventListener('blur', validarFormulario);//BLUR se activa cuando se deselecciona el formulario
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //reiniciar formulario
    btnReset.addEventListener('click', resetearFormulario);

    //enviar email
    formulario.addEventListener('submit', enviarEmail);

}

//Funciones
function iniciarApp(){
    //deshabilitamos boton enviar 
    btnEnviar.disabled = true;
    //en este proyecto ocupamos el framework 'tailwind' por lo que agregamos clases de ese framework
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

//función: valida el formulario
function validarFormulario(e){ 
    if(e.target.value.length > 0){
        //ELIMINA LOS ERRORES...
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }
        //eliminamos las clases que no estamos utilizando
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
        } else{
            e.target.classList.remove('border', 'border-green-500');
            //agregamos clases de css para mostrar borde rojo
            e.target.classList.add('border', 'border-red-500');
            //mandamos a llamar una funcion al tener un error
            mostrarError('Todos los campos son obligatorios');
        } 
        
        validarEmail(e);
        activarBoton();
}

//función: validar email
function validarEmail(campo){
    if(campo.target.type === 'email'){
        if(er.test(campo.target.value)){
            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }
            campo.target.classList.remove('border', 'border-red-500');
            campo.target.classList.add('border', 'border-green-500');
        }else{
            campo.target.classList.remove('border', 'border-green-500');
            campo.target.classList.add('border', 'border-red-500');
            mostrarError('Email no válido');
        }
    } 
}

//función: activa boton de envio
function activarBoton(){
    if(er.test( email.value ) && asunto.value !== '' && mensaje.value !== ''){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }
}

//función: muestra mensaje de error
function mostrarError(mensaje){
    //creamos un parrafo con un mensaje de error
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    
    //agregamos clases de css
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    //si mas de algun elemento posee la clase .error esta no se sigue agregando
    const errores = document.querySelectorAll('.error');
    if(errores.length === 0){
        //agregamos al HTML
        formulario.appendChild(mensajeError);
    }
    
}

//función: envia el email
function enviarEmail(e){
    e.preventDefault();

    //mostrar el spinner
    const spinner = document.querySelector('#spinner');
    //habilitamos el spinner
    spinner.style.display = 'flex';

    //despues de 3 segundos ocultar el spinner y mostrar el mensaje
    setTimeout(() =>{
        spinner.style.display = 'none';

        //mensaje de envio
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envío correctamente';
        //agregamos estilos css a nuestro mensaje
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');

        //mostramos el mensaje antes(arriba) del spinner
        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove(); //eliminar el mensaje de exito

            resetearFormulario();
        }, 3000)

    }, 3000);
}

//función: resetea el formulario
function resetearFormulario(){
    formulario.reset();

    //inhabilita nuevamente el boton de enviar
    iniciarApp(); 
}