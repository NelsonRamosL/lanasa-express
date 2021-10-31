const express = require('express');
const app = express();
const { nuevoUsuario, getUsuario, editarUsuario, getAuthUsuario } = require('./bd/coneccion.js');
const exphbs = require("express-handlebars");
const expressFileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const secretKey = 'shhhh';


app.listen(3000, () => console.log('Servidor encendido en el puerto 3000'))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(expressFileUpload({
    limits: { fileSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit: "El peso del archivo que intentas subir supera el limite permitido",
})
);

app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'))

app.engine(
    "handlebars",
    exphbs({
        layoutsDir: __dirname + "/views",
        partialsDir: __dirname + "/views/componentes/",

    })
);
app.set("view engine", "handlebars");



app.get("/", (req, res) => {
    res.render("Home");
});




app.post('/usuarios', async (req, res) => {
    const values = req.body;
    //const cursoJson = JSON.parse(values);
    // console.log(values);
    try {
        const result = await nuevoUsuario(values);
        res.statusCode = 201;
        res.end(JSON.stringify(result));
    } catch (e) {
        console.log("error" + e)
        res.statusCode = 500;
        res.end("ocurrio un error" + e);
    }


})


app.get('/Admin', async (req, res) => {
    try {
        const usuarios = await getUsuario();
        res.render('Admin', { usuarios });
    } catch (e) {
        res.statusCode = 500;
        res.end("ocurrio un error en el servidor" + e);
    }
})



app.put('/usuarios', async (req, res) => {
    const values = req.body;
    console.log(values);
    try {
        const result = await editarUsuario(values);
        res.statusCode = 200;
        res.end(JSON.stringify(result));
    } catch (e) {
        res.statusCode = 500;
        res.end("ocurrio un error" + e);
    }
})



app.get("/login", function (req, res) {
    res.render("Login");
});







app.post('/verify', async (req, res) => {
    const values = req.body;
    console.log(values);

    const result = await getAuthUsuario(values);

    if (result) {
        if (result.auth) {
            const token = jwt.sign(
                {
                    exp: Math.floor(Date.now() / 1000) + 300,
                    data: result,
                },
                secretKey
            );

            //res.statusCode = 201;
            res.send(token);
        } else {
            res.status(401).send({
                error: " este usuario no tiene autorizacion para subir archivos",
                code: 401,
            });
        }



    } else {
        res.status(401).send({
            error: "este usuario no esta registrado",
            code: 401,
        });


    }


})