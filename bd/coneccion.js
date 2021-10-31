///   ejemplo coneccion cambiar datos
const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "1234",
    database: "nasa",
    port: 5432
});

const nuevoUsuario = async (usuario) => {
    const values = Object.values(usuario);
    console.log(values);
    const consulta = {
        text: "INSERT INTO usuarios (email, nombre, password, auth) values ($1,$2,$3,false) RETURNING *",
        values
    };
    const result = await pool.query(consulta);
    return result;
}

const getUsuario = async () => {
    const result = await pool.query("SELECT * FROM usuarios");
    console.log(result)
    return result.rows;
}


const editarUsuario = async (usuario) => {
    const values = Object.values(usuario);
 console.log(values);
    const consulta = {
        text: "UPDATE usuarios SET auth=$2 WHERE id=$1 RETURNING *",
        values
    };
    const result = await pool.query(consulta);
    return result;
}




const getAuthUsuario = async (usuario) => {
    const values = Object.values(usuario);
    console.log(values);
       const consulta = {
           text: "SELECT * FROM usuarios WHERE email = $1 AND password = $2",
           values
       };
       const result = await pool.query(consulta);
    console.log(result)
    return result.rows[0];
}



const eliminarCurso = async (id) => {
    const result = await pool.query(`DELETE FROM cursos WHERE id = ${id}`);
    return result.rows;
}


module.exports = { nuevoUsuario, getUsuario, editarUsuario, getAuthUsuario, eliminarCurso }