const express = require('express');
const bodyparser = require('body-parser')

const jsonParser = bodyparser.json();


let usuario = {
    nombre :'',
    apellido:''
};

let respuesta = {
    error : false,
    codigo: 200,
    mensaje: ''
}

const app = express();

app.get('/',function(req, res){
    respuesta = {
        error : true,
        codigo: 200,
        mensaje: 'Inicio'
    };
    res.send(respuesta);
})

app.get('/usuario', function (req, res){
    respuesta = {
        error : false,
        codigo: 200,
        mensaje: ''
    };
    if(usuario.nombre === '' || usuario.apellido === ''){
        respuesta = {
            error : true,
            codigo: 500,
            mensaje: 'El usuario no existe'
        }; 
    }else{
        respuesta = {
            error : false,
            codigo: 200,
            mensaje: usuario
        }; 
    }
    res.send(respuesta);

})

app.post('/usuario',jsonParser, function (req, res) {    
    //    console.log(req.body)   
    if(!req.body.nombre || !req.body.apellido) {
     respuesta = {
      error: true,
      codigo: 502,
      mensaje: 'El campo nombre y apellido son requeridos'
     };
    } else {
     if(usuario.nombre !== '' || usuario.apellido !== '') {
      respuesta = {
       error: true,
       codigo: 503,
       mensaje: 'El usuario ya fue creado previamente'
      };
     } else {
      usuario = {
       nombre: req.body.nombre,
       apellido: req.body.apellido
      };
      respuesta = {
       error: false,
       codigo: 200,
       mensaje: 'Usuario creado',
       respuesta: usuario
      };
     }
    }
    res.send(respuesta);
   });

app.put('/usuario', jsonParser , function(req, res){
    if(!req.body.nombre || !req.body.apellido ){
        respuesta = {
            error: true,
            codigo: 502,
            mensaje: 'El campo nombre y apellido son requeridos'     
           };
    }else{
        if(usuario.nombre === '' || usuario.apellido === ''){
            respuesta = {
                error: true,
                codigo: 502,
                mensaje: 'El usuario no ha sido creado'     
               };
        }else{
            usuario = {
                nombre: req.body.nombre,
                apellido: req.body.apellido
               };
               respuesta = {
                error: false,
                codigo: 200,
                mensaje: 'Usuario actualizado',
                respuesta: usuario
               };
        }
        res.send(respuesta);
    }
})

app.delete('/usuario',jsonParser, function (req, res) {
    if(usuario.nombre === '' || usuario.apellido === '') {
     respuesta = {
      error: true,
      codigo: 501,
      mensaje: 'El usuario no ha sido creado'
     };
    } else {
     respuesta = {
      error: false,
      codigo: 200,
      mensaje: 'Usuario eliminado'
     };
     usuario = { 
      nombre: '', 
      apellido: '' 
     };
    }
    res.send(respuesta);
   });


app.listen(3001, ()=> {
    console.log("api up")
})