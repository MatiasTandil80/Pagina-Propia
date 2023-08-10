"use strict";
const url = 'https://62c35351876c4700f53aaa3b.mockapi.io/api/producto'; //Direccion del Mockapi

mostrarContenido('inicio');     //Invoco a la funcion que me genera la foto y el parrafo del Index al inicializar la pagina

let apruebaFiltro=true;         //Variable booleana que voy a utilizar en la funcion que aplica el filtro de busqueda

let opcion = document.querySelectorAll(".boton-barra")  //Tomo los 3 botones del NAV (INICIO, PRODUCTO, CONTACTO) a traves de la clase boton-barra
opcion.forEach(element => {
    element.addEventListener('click', function () {    
        mostrarContenido(element.id);                   //Se muestra el contenido de cada pagina según el boton del Nav presionado
 
    })
})

/*Corresponde a la funcionalidad del botón, en la barra del header, en modo móvil*/
document.querySelector("#ID_boton-barra").addEventListener("click", menu_responsive); //Me quedo escuchando el botón del menú en modo móvil

function menu_responsive() {
    document.querySelector(".lista-menu").classList.toggle("mostrar-lista"); /*Muestro y oculto la lista */
}

async function mostrarContenido(id) {   //    Funcion que muestra el contenido de cada pagina a través de un id que proviene del boton del Nav

    let contenido = document.querySelector("#content") //Tomo el id del div del index.html
    try {

        let response = await fetch(`${id}.html`) // Traigo el contenido de la pagina solicitada a través del id
        if (response.ok) {
            let text = await response.text();   

            contenido.innerHTML = text;          //El div central del html toma el contenido del Partial
            procesarRespuesta(id);               //Activo la funcionalidad de la pagina solicitada
        } else {
            contenido.innerHTML = "El archivo no se pudo acceder"
        }
    }
    catch (error) {
        contenido.innerHTML = "Error de acceso al servidor"
    }

   
}

function procesarRespuesta(id){ //  Creo las variables, inputs, botones y funciones acorde a la pagina solicitada

    if (id == "productos") {                
        mostrarLista();                     //Doy funcionalidad a la lista de Productos para que se muestran en el parrafo 
        activarBotonesFormularioTabla();    //Activo el formulario y los botones a la izquierda de la Tabla PRECIOS
        mostrarTablaApi();                  //Traigo el contenido de la Tabla PRECIOS desde el MockApi
        
        let h1_parrafo = document.querySelector("#ID_parrafo"); //Muestro por defecto el parrafo del elemento farmacias al entrar a la pestaña PRODUCTOS
        cargar_parrafo("farmacias", h1_parrafo);
    }
    else
        if (id == "contacto") {                
            activarFormulario();             //Activo los inputs y botones del formulario Captcha
        }


}


 //#region contacto.html
function activarFormulario() {   //Activo los inputs y botones del formulario Captcha

    let btn_enviar_contacto = document.querySelector("#ID_enviar_contacto");        //Tomo los botones del formulario Captcha
    let btn_regenera_capcha = document.querySelector("#ID_regenera_capcha");
    let btn_aceptar_capcha = document.querySelector("#ID_aceptar_capcha");

    let txt_input_resultado = document.querySelector("#ID_capcha");                  //Tomo el input del formulario Captcha

    let lbl_capcha = document.querySelector("#ID_label_capcha");
    let lbl_regenera_capcha = document.querySelector("#ID_label_regenera_capcha");  


    let int_sumando1 = 0;
    let int_sumando2 = 0;


    if (btn_enviar_contacto != null) {
        btn_enviar_contacto.addEventListener("click", enviarContacto);              //Boton que invoca a la funcion enviarContacto
    }

    if (btn_regenera_capcha != null) {
        btn_regenera_capcha.addEventListener("click", hallar_miembros_suma);        //Boton que invoca a la funcion que imprime los operandos del Captcha
    }

    if (btn_aceptar_capcha != null) {
        btn_aceptar_capcha.addEventListener("click", capcha);                   //Boton que invoca a la funcion que comprueba el Captcha
    }


    if (btn_enviar_contacto != null) {
        btn_enviar_contacto.disabled = true;                                    //Boton que se activa si el Captcha es correcto
    }

    if (lbl_capcha != null) {
        hallar_miembros_suma();                                      //Funcion  que imprime los operandos del Captcha al ingresar a la pestaña Contacto
    }

        
    function capcha() {                                             
        if (txt_input_resultado.value != (int_sumando1 + int_sumando2)) {
            btn_enviar_contacto.disabled = true;
            lbl_regenera_capcha.innerHTML = "Ingreso Erróneo del Captcha";
            txt_input_resultado.focus;
        }
        else {
            btn_enviar_contacto.disabled = false;
            lbl_regenera_capcha.innerHTML = "Ingreso OK";
        }

        txt_input_resultado.value = "";
    }

    function enviarContacto() {
        alert("Contacto Enviado");
        lbl_regenera_capcha.innerHTML = "";
    }

    function hallar_miembros_suma() {
        int_sumando1 = Math.floor((Math.random() * 10) + 1);
        int_sumando2 = Math.floor((Math.random() * 10) + 1);
        lbl_capcha.innerHTML = "Ingrese: " + int_sumando1.toString() + " + " + int_sumando2.toString() + " = ";
        txt_input_resultado.value = "";
        lbl_regenera_capcha.innerHTML = "";
    }
   


} 
//#endregion contacto.html



//#region Lista
function mostrarLista() {                       //Corresponde a la funcionalidad de la lista del margen izquierdo de la pestaña PRODUCTOS
    let opcion2 = document.querySelectorAll(".producto")        //Todos los elementos de la lista tienen la clase producto
    opcion2.forEach(element => {
        element.addEventListener('click', function () {        //Creo una funcion anónima que toma todos los elementos de la lista y los vincula con su
                                                                //respectivo parrafo
            let h1_farmacia = document.querySelector("#ID_farmacia");
            let h1_cadenas = document.querySelector("#ID_cadenas");
            let h1_droguerias = document.querySelector("#ID_droguerias");
            let h1_clinicas = document.querySelector("#ID_clinicas");
            let h1_obras_sociales = document.querySelector("#ID_obras_sociales");
            let h1_parrafo = document.querySelector("#ID_parrafo");

            if (h1_farmacia != null) {        
                h1_farmacia.addEventListener("click", function () {
                    cargar_parrafo("farmacias", h1_parrafo);            //vinculo Farmacias con su parrafo
                });
            }


            if (h1_cadenas != null) {
                h1_cadenas.addEventListener("click", function () {      //vinculo Cadenas con su parrafo
                    cargar_parrafo("cadenas", h1_parrafo);
                });
            }

            if (h1_droguerias != null) {
                h1_droguerias.addEventListener("click", function () {   //vinculo Droguerías con su parrafo
                    cargar_parrafo("droguerias", h1_parrafo);
                });
            }

            if (h1_clinicas != null) {
                h1_clinicas.addEventListener("click", function () {     //vinculo Clínicas con su parrafo
                    cargar_parrafo("clinicas", h1_parrafo);
                });
            }

            if (h1_obras_sociales != null) {
                h1_obras_sociales.addEventListener("click", function () {//vinculo Obras Sociales con su parrafo
                    cargar_parrafo("obras_sociales", h1_parrafo);
                });
            }
        })
    })
}

function cargar_parrafo(modulo, h1_parrafo) {//Funcion que recibe un producto de la lista y modifica el inner del parrafo a traves de un switch case                
    try {
        switch (modulo) {
            case "farmacias":
                h1_parrafo.innerHTML = `<strong><u>Farmacias</u></strong>: Es un sistema orientado al punto de 
                    venta. Desde una sola pantalla se pueden atender todas las necesidades de una farmacia:
                    buscar medicamentos, productos y precios por múltiples atributos; facturar, imprimir resúmenes y cobrar cuentas corrientes; consultar
                    prospectos de medicamentos e instructivos de obras sociales; validar on line y administrar medicamentos trazables.`;
                break;
            case "cadenas":
                h1_parrafo.innerHTML = `<strong><u>Cadenas de Farmacias</u></strong>: Permite centralizar, en 
                    tiempo real y en  un solo lugar de administración, la información de facturación, 
                    cuentas corrientes, stock, recetas y pedidos a droguería de una cadena de farmacias, permitiendo a las sucursales acceder a los datos 
                    centralizados que sean necesarios para la operatoria diaria y, a la administración central gestionarse con información integrada, de tipo
                    gerencial y de soporte para la toma de decisiones.`;
                break;
            case "droguerias":
                h1_parrafo.innerHTML = `<strong><u>Droguerías</u></strong>: IFsoluciones es la solución para
                    la gestión y administración de droguerías y centros de distribución de cadenas de farmacia.
                    Provee una administración completa de productos, manteniendo un padrón de productos propios, que se construye a partir de actualizaciones.`;
                break;
            case "clinicas":
                h1_parrafo.innerHTML = `<strong><u>Clínicas</u></strong>: Somos una multinacional de 
                    tecnología de la información dedicada en exclusiva al ámbito de la salud que proporciona       
                    software de gestión y servicios informáticos a más de 400.000 profesionales de la salud en todo el mundo.
                    Medigest Consultores se dedica al desarrollo y soporte de software de Historia Clínica Digital, información y documentación médica y 
                    servicios sanitarios online.`;
                break;
            case "obras_sociales":
                h1_parrafo.innerHTML = `<strong><u>Obras Sociales</u></strong>: Permite la gestión de integral 
                    prestaciones médicas a poblaciones de beneficiarios, posibilitando el manejo de padrones, 
                    autorización en tiempo real de servicios vía Internet, procesamiento de las prestaciones facturadas y liquidación en función de 
                    presupuestos regionales por grupos de prácticas. Este sistema de gestión de mutuales incluye los módulos necesarios para la gestión 
                    administrativa, económica, financiera y contable de la institución.`;
                break;
            default:
                h1_parrafo.innerHTML = ``;
                break;
        };     
    } 
    catch (error) {
        
    }
};

//#region Tabla

function activarBotonesFormularioTabla(){ //tomo los botones de carga de la tabla (Cargar Modulo, Filtrar Busqueda)que se encuentran en el formulario
    
    let btn_cargar1 = document.querySelector("#ID_cargar1"); 
   
    btn_cargar1.addEventListener("click",function(){agregarElemento()});
    
    let btn_tope=document.querySelector("#ID_boton_tope_licencia");
    
    btn_tope.addEventListener("click",mostrarTablaApi);          
 
}

function filtrarBusqueda(montoFila){    //Funcion que va a filtrar lo que se va a mostrar en la Tabla. 

    let TopeLicencia=document.querySelector("#ID_tope_licencia").value;

    let numeroTopeLicencia=Number(TopeLicencia);

    if(TopeLicencia==""){   //Pregunto si ninguna condicion de filtro fue ingresada. Es decir, si el input está vacío, no hay filtro
            apruebaFiltro=true; //El elemento va a poder ser ingresado
    }
    else
        if(numeroTopeLicencia>=montoFila){  //Si el input no está vacío, comparo en valor de Tipo Number del campo.
            apruebaFiltro=true;                //Si el nuevo valor que proviene del MockApi es <= al Tope, lo dejo ingresar a la tabla
        }
        else
            {apruebaFiltro=false;}              //La licencia supera el tope. Paso al siguiente producto


}


async function borrarFila(id) {     //Borro un Json del MockApi a través del botón lateral Derecho que contiene el mismo id que el elemento a Borrar

    console.log("Se borrará la fila: " + id);
    //Borro el item en el servicio

    try {
        let res = await fetch(`${url}/${id}`, {
            "method":"DELETE"
        });

        if(res.status==200){
            console.log("Borrado el elemento: "+id);
        }

    } catch (error) {
        console.log(error);
    }

    //muestro de nuevo la tabla
        mostrarTablaApi();              //Después de borrar el elemento, refresco la tabla
}

async function editarFila(id){//Tomo los valores de los inputs que serán aplicados a la fila que posee el botón Editar en el margen Derecho 
    console.log("Se editará la fila: "+id);
    
    //tomo el valor de los inputs
    let modulo=document.querySelector("#ID_modulo").value;
    let licencia=document.querySelector("#ID_licencia").value;
    let abono=document.querySelector("#ID_abono").value;
    // modifico el json que tiene ese id
    let json_fila = {
        "Modulo": modulo,
        "Licencia": licencia,
        "Abono_Mensual": abono,
    }

    try {

        let res = await fetch(`${url}/${id}`, {
            "method":"PUT",
            "headers":{"Content-type":"application/json"},
            "body":JSON.stringify(json_fila)
        });
            if(res.status==200){
                console.log("Modificada la Fila: "+id);
                 //muestro de nuevo la tabla
                mostrarTablaApi();
            }
    } catch (error) {
        console.log(error);
    }
   

}

async function agregarElemento(){   // funcion que agregar un Elemento al final de la estructura del Mockapi

    //tomo el valor de los inputs
    let modulo=document.querySelector("#ID_modulo").value;
    let licencia=document.querySelector("#ID_licencia").value;
    let abono=document.querySelector("#ID_abono").value;
    //subo los valores al mockapi
    
        if((modulo!="")&&(licencia!="")&&(abono!="")){ //Pregunto que ningún campo esté vacío. Caso contrario muestro un alert
            let json_fila = {
                "Modulo": modulo,
                "Licencia": licencia,
                "Abono_Mensual": abono,
            }

            try {

                let res =await fetch (url, {
                    "method":"POST",
                    "headers":{"Content-type":"application/json"},
                    "body":JSON.stringify(json_fila)
                });
                    if(res.status==201){
                        console.log("Agregado con Exito!");
                        //muestro de nuevo la tabla
                        mostrarTablaApi();                  //
                    }
            } catch (error) {
                console.log(error);
            }
        }
        else{alert("Hay campos sin completar");}
}

async function mostrarTablaApi() {//Funcion que toma los valores del Mockapi, aplica un filtro de busqueda e invoca a la funcion que construye la Tabla

    let tabla_productos = document.querySelector("#ID_cuerpo-tabla");

    //Vacio la tabla para volver a listarla...
    tabla_productos.innerHTML=" ";

    try {
        let res = await fetch(url);
        let json = await res.json();

        for (let elem of json) {
           
                filtrarBusqueda(elem.Licencia);//Aplico el filtro de busqueda que va a modificar la variable del If debajo
                if(apruebaFiltro){              //apruebaFiltro es una variable global que se modifica con la funcion anterior
                    cargarItemApi(elem.Modulo, elem.Licencia, elem.Abono_Mensual, elem.id);//Si pasó con true el filtro, cargo toda la fila en la Tabla
                }
                else
                {console.log("Licencia que no fue cargada: "+elem.Licencia);} //muestro por consola la licencias que excedieron el valorde la licencia
        }

    } catch (error) {
        console.log(error);
    }

}


function cargarItemApi(modulo, licencia, abono_mensual, id) {//Funcion que construye la tabla.

    let tabla_productos = document.querySelector("#ID_cuerpo-tabla");
     

    let tr = document.createElement('tr');

    let item_modulo = document.createElement('td')            /*creo un nuevo td "modulo"*/
    item_modulo.textContent = modulo;        /*Tomo el valor de modulo del arreglo y lo paso al nuevo item td*/
    tr.appendChild(item_modulo);                            /*Cargo el item en la variable tr*/

    let item_licencia = document.createElement('td')          /*creo un nuevo td "licencia"*/
    item_licencia.textContent = licencia;
    tr.appendChild(item_licencia);

    let item_abono = document.createElement('td')             /*creo un nuevo td "abono"*/
    item_abono.textContent = abono_mensual;
    tr.appendChild(item_abono);

    //Crear botones al costado de la tabla;

    let boton_borrar = document.createElement('button');        //Creo los botones de Borrar y Editar 
    let boton_editar = document.createElement('button');

    boton_borrar.innerHTML = "borrar";
    boton_editar.innerHTML = "editar";

    boton_borrar.addEventListener("click", function () { borrarFila(id) }); //Los vinculo con su funcion acorde al id del elemento de la fila 
    boton_editar.addEventListener("click", function() {editarFila(id)});

    tr.appendChild(boton_borrar);                           //Los botones borrar y editar sin agregados al final de cada fila
    tr.appendChild(boton_editar);

    tabla_productos.appendChild(tr);                        //Agrego la nueva fila a la Tabla

}

