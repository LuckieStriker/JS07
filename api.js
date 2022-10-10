
/**
 * Función asíncrona para traer los datos del fetch
 */
async function cargarDatosApi(){
    var data= await fetch('https://reqres.in/api/users?delay=3');
    return data.json();
}

/**
 * Función para llamar los datos del local storage dentro de los próximos 10 segundos
 * @returns 
 */
async function cargarDatosLocalStorage(){
    var now=new Date();
    data=await cargarDatosApi();
    const item = {
        valor:data,
        expira: now.getTime() + 10000,
    }
    localStorage.setItem("datos", JSON.stringify(item));
    return data;
}


/**
 * Función y condicionantes para llamar los datos de la API
 * en caso de que haya pasado el tiempo.
 * 
 */
async function cargarDatos(){
    var now= new Date();
    var data=JSON.parse(localStorage.getItem("datos"));
    if(data){
        if(now.getTime() > JSON.parse(localStorage.getItem("datos")).expira){
            data=await cargarDatosLocalStorage();
        }else{
            data=JSON.parse(localStorage.getItem("datos")).valor;
        }
    }else{
        data=await cargarDatosLocalStorage();
    }
    return data;
}


/**
 * Los datos que se llaman, ya sea de la API o del local storage, se colocan en una tabla
 */
async function pintarDatos(){
    var spinner='<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>';
    document.getElementById('bodyTabla').innerHTML =spinner;
    var datos=await cargarDatos();
    var html="";
    datos.data.forEach(element => {
        var id_column="<td>"+element.id+"</td>";
        var name_column="<td>"+element.first_name+"</td>";
        var last_name_column="<td>"+element.last_name+"</td>";
        var email_column="<td>"+element.email+"</td>";
        var photo_column='<td><img src="'+element.avatar+'" class="rounded-circle"></td>';
        html=html+"<tr>"+id_column+name_column+last_name_column+email_column+photo_column+"</tr>";
        
    });
    document.getElementById('bodyTabla').innerHTML =html;
}

pintarDatos();

