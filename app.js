var dbV = localStorage.getItem("dbV"); //Obtener datos de localStorage
var operacion = "A"; //"A"=agregar; "E"=edtidar
dbV = JSON.parse(dbV); // Covertir a objeto
if (dbV === null) // Si no existe, creamos un array vacio.
    dbV = [];


function Mensaje(t){
        switch (t) {
            case 1: //
                $(".mensaje-alerta").append(
                    "<div class='alert alert-success' role='alert'>Se agrego exitosamente</div>"
                );
                break;
            case 2: //
                $(".mensaje-alerta").append(
                    "<div class='alert alert-danger' role='alert'>Se elimino exitosamente</div>"
                );
                break;
            default:

        }
    }


function Agregar () {
    // Seleccionamos los datos de los inputs de formulario
    var datos_cliente = JSON.stringify({
        Nombre : $("#nombre").val(),
        Raza : $("#raza").val(),
        Peso : $("#peso").val(),
        Fecha_nacimiento : $("#fecha_nacimiento").val(),
    });

    dbV.push(datos_cliente); // Guardar datos en el array definido globalmente
    localStorage.setItem("dbV", JSON.stringify(dbV));



    Listar();


    return Mensaje(1);
}



function Listar(){
    $("#dbV-list").html(
            "<thead>" +
                "<tr>" +
                    "<th> ID </th>" +
                    "<th> Nombre </th>" +
                    "<th> Raza </th>" +
                    "<th> Peso </th>" +
                    "<th> fecha de nacimiento </th>" +
                    
                    "<th> </th>" +
                    "<th>  </th>" +
                "</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
    );

    for (var i in dbV) {
        var d = JSON.parse(dbV[i]);
        $("#dbV-list").append(
                        "<tr>" +
                            "<td>" + i + "</td>" +
                            "<td>" + d.Nombre + "</td>" +
                            "<td>" + d.Raza + "</td>" +
                            "<td>" + d.Peso + "</td>" +
                            "<td>" + d.Fecha_nacimiento + "</td>" +
                            "<td> <a id='"+ i +"' class='btnEditar' href='#'> <span class='glyphicon glyphicon-pencil'> </span>  </a> </td>" +
                            "<td> <a id='" + i + "' class='btnEliminar' href='#'> <span class='glyphicon glyphicon-trash'> </span> </a> </td>" +
                        "</tr>"
                           );
    }

}


if (dbV.length !== 0) {
    Listar();
} else {
    $("#dbV-list").append("<h2> No tiene información </h2>");
}

function contar(){
    var vac = dbV;
    nV = vac.length;

    $("#numeroV").append(
        "<a>Tienes actualmente" + "<br>" + "<span class='badge'>" + nV + "</span></a> pacientes"
    );
    return nV;
}

function Eliminar(e){
    dbV.splice(e, 1); // Args (posición en el array, numero de items a eliminar)
    localStorage.setItem("dbV", JSON.stringify(dbV));
    return Mensaje(2);
}

function Editar() {
    dbV[indice_selecionado] = JSON.stringify({
        Nombre : $("#nombre").val(),
        Raza : $("#raza").val(),
        Peso : $("#peso").val(),
        Fecha_nacimiento : $("#fecha_nacimiento").val(),
    });
    localStorage.setItem("dbV", JSON.stringify(dbV));
    operacion = "A"; //Regresamos la valor original
    return true;

}

$(".btnEliminar").bind("click", function(){
    alert("¿Seguro que quiere eliminar está información?");
    indice_selecionado = $(this).attr("id"); // "this" contiene el elemento clikeado en el contexto actual
    console.log(indice_selecionado);
    console.log(this);
    Eliminar(indice_selecionado); // Eliminamos el elemento llamando la funcion de eliminar
    ListarVacas();
});

$(".btnEditar").bind("click", function() {
    alert("¿Seguro que quiere editar la información?");
    // Cambiamos el modo
    $(".modo").html("<span class='glyphicon glyphicon-pencil'> </span> Modo edición");
    operacion = "E";
    indice_selecionado = $(this).attr("id");
    console.log(indice_selecionado);
    console.log(this);
    // Llemanos el formulario con los datos actuales de la vaca a editar
    var vacItem = JSON.parse(dbV[indice_selecionado]);
    $("#nombre").val(vacItem.Nombre);
    $("#correo").val(vacItem.Raza);
    $("#peso").val(vacItem.Peso);
    $("#fecha_nacimiento").val(vacaItem.Fecha_nacimiento);

    $("#nombre").focus();
});


contar();
// Esperar el evento de envio del formulario !!
$("#vacas-form").bind("submit", function() {
    debugger;
    if (operacion == "A")
        return Agregar();
    else {
        return Editar();
    }
});