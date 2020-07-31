"use strict";
// export default router;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pg_1 = require("pg");
const router = express_1.Router();
const configuracionBd = { user: 'postgres', host: '0.0.0.0', database: 'tautodb', password: '1234', port: 5432, };
const conexionP = new pg_1.Client(configuracionBd);
conexionP.connect();
console.log('ttttttttttt');
router.get('/autobuses', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Access-Control-Allow-Methods', 'GET,PUT, OPTIONS')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    console.log('GETTT autobuseses');
    conexionP.query('SELECT * FROM autobuses', (error, result) => {
        console.log('entrpoo iiifffff');
        if (error)
            throw error;
        res.json({
            //ok:true,
            Mensajes: result.rows
        });
    });
});


router.get('/autobuses/:id', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Access-Control-Allow-Methods', 'GET,PUT, OPTIONS')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    console.log('GETTT autobuseses');
    conexionP.query('SELECT asientos.id, autobuses.ciudadi, autobuses.ciudadf, asientos.disponible FROM asientos inner join autobuses on asientos.idautobus = autobuses.id', (error, result) => {
        console.log('entrpoo asientos');
        if (error)
            throw error;
        res.json({
            //ok:true,
            Mensajes: result.rows
        });
    });
});


router.post('/usuario', (req, res) => {
    console.log(req.body + 'POSTTT USUARIO');
    const query = "INSERT INTO usuarios (username, password, correo, apellido) VALUES ('" + req.body.username + "','" + req.body.password + "','" + req.body.correo + "','" + req.body.apellido + "');";
    //const cuerpo = req.body.cuerpo;
    //const de = req.body.de;
    conexionP.query(query, (error, result) => {
        if (error)
            throw error;
        res.status(200).json({
            mensajeN: true,
            Mensaje: req.body
        });
    });
    // cuerpo:cuerpo
});
router.put('/asiento/:id', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Access-Control-Allow-Methods', 'PUT, OPTIONS')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    const id = req.params.id;
    const query = "UPDATE asientos set disponible = 0 where id=" + id;
    console.log("puttt asientossssssssss");
    conexionP.query(query, (error, result) => {
        if (error)
            throw error;
        res.status(200).json({
            mensajeA: true,
            Mensaje: req.body
        });
    });
});
router.get('/registros', (req, res) => {
    console.log('eentroooooo');
    conexionP.query('SELECT * FROM registros', (error, result) => {
        console.log('entrpoo iiifffff');
        if (error)
            throw error;
        res.json({
            //ok:true,
            Mensajes: result.rows
        });
    });
});
router.post('/registro', (req, res) => {
    console.log(req.body + '8888888888888888888888888888888888888');
    const query = "INSERT INTO registros (idusuario, idcurso) VALUES (" + req.body.idusuario + "," + req.body.idcurso + ");";
    //const cuerpo = req.body.cuerpo;
    //const de = req.body.de;
    conexionP.query(query, (error, result) => {
        if (error)
            throw error;
        res.status(200).json({
            mensajeN: true,
            Mensaje: req.body
        });
    });
    // cuerpo:cuerpo
});
router.get('/registros/:id', (req, res) => {
    const id = req.params.id;
    conexionP.query('select * from registros where id=' + id, (error, result) => {
        if (error)
            throw error;
        res.json({
            ok: true,
            Mensajes: result.rows
        });
    });
});
router.get('/cursos', (req, res) => {
    console.log('eentroooooo GET CURSOS');
    conexionP.query('SELECT * FROM cursos', (error, result) => {
        console.log('entrpoo iiifffff');
        if (error)
            throw error;
        res.json({
            //ok:true,
            Mensajes: result.rows
        });
    });
});
router.post('/cursoP', (req, res) => {
    console.log(req.body + 'POOST CURSOS');
    const query = "INSERT INTO public.cursos ( idpropietario , nombre, fecha, cupo, descripcion, costo) VALUES ('" + req.body.idpropietario + "','" + req.body.nombre + "','" + req.body.fecha + "', " + req.body.cupo + " ,'" + req.body.descripcion + "', " + req.body.costo + " );";
    //const cuerpo = req.body.cuerpo;
    //const de = req.body.de;
    conexionP.query(query, (error, result) => {
        if (error)
            throw error;
        res.status(200).json({
            mensajeN: true,
            Mensaje: req.body
        });
    });
    // cuerpo:cuerpo
});
router.put('/cursos/:id', (req, res) => {
    const id = req.params.id;
    const query = "udapte cursos set idPropietario='" + req.body.idPropietario + "', nombre='" + req.body.nombre + "', fecha='" + req.body.fecha + "', cupo= " + req.body.cupo + ", descripcion='" + req.body.descripcion + "',  costo= " + req.body.costo + " where id=" + id;
    conexionP.query(query, (error, result) => {
        if (error)
            throw error;
        res.status(200).json({
            mensajeA: true,
            Mensaje: req.body
        });
    });
});
router.put('/cursoscupo/:id', (req, res) => {
    const id = req.params.id;
    console.log("udappppppteeee cuuupooo");
    const query = "UPDATE public.cursos SET cupo = " + req.body.cupo + " WHERE id = " + id;
    conexionP.query(query, (error, result) => {
        if (error)
            throw error;
        res.status(200).json({
            mensajeA: true,
            Mensaje: req.body
        });
    });
});
router.put('/cursoseliminar/:id', (req, res) => {
    const id = req.params.id;
    console.log("eliminar cursoooo " + id);
    const query = "UPDATE public.cursos SET eliminado= " + req.body.eliminado + " where id=" + id;
    conexionP.query(query, (error, result) => {
        if (error)
            throw error;
        res.status(200).json({
            mensajeA: true,
            Mensaje: req.body
        });
    });
});
///////////////////////////////////////////////////////////////////////////////////////////////
router.get('/profesor/:id', (req, res) => {
    const id = req.params.id;
    console.log('GETTT profesooor');
    conexionP.query("SELECT public.profesor.nombre as nombre_profesor, public.asignaturas.nombre, asignaturas.horario FROM profesor inner join  asignaturas on profesor.id = asignaturas.idprof where profesor.id =" + id, (error, result) => {
        console.log('entrpoo iiifffff');
        if (error)
            throw error;
        res.json({
            //ok:true,
            Mensajes: result.rows
        });
    });
});
router.get('/profesorA/:id', (req, res) => {
    const id = req.params.id;
    console.log('GETTT profesooor');
    conexionP.query("SELECT public.profesor.nombre as nombre_profesor, public.alumnos.nombre FROM profesor inner join asignaturas on profesor.id = asignaturas.idprof inner join asigadasa on asignaturas.id = asigadasa.idasig inner join alumnos on asigadasa.idalumno = alumnos.id where profesor.id =" + id, (error, result) => {
        console.log('entrpoo iiifffff');
        if (error)
            throw error;
        res.json({
            //ok:true,
            Mensajes: result.rows
        });
    });
});
router.get('/alumnoP/:id', (req, res) => {
    const id = req.params.id;
    console.log('GETTT profesooor');
    conexionP.query("SELECT public.alumnos.nombre as nombre_alumno, public.profesor.nombre FROM alumnos inner join asigadasa on alumnos.id = asigadasa.idalumno inner join asignaturas on asignaturas.id = asigadasa.idasig inner join profesor on asignaturas.idprof = profesor.id where alumnos.id =" + id, (error, result) => {
        console.log('entrpoo iiifffff');
        if (error)
            throw error;
        res.json({
            //ok:true,
            Mensajes: result.rows
        });
    });
});
router.put('/profesor/:id', (req, res) => {
    const id = req.params.id;
    console.log("puuut professoorrr " + id);
    const query = "UPDATE public.asignadas SET idprof= " + req.body.eliminado + " where id=" + id;
    conexionP.query(query, (error, result) => {
        if (error)
            throw error;
        res.status(200).json({
            mensajeA: true,
            Mensaje: req.body
        });
    });
});
router.put('/alumno/:id', (req, res) => {
    const id = req.params.id;
    console.log("eliminar cursoooo " + id);
    const query = "UPDATE public.alumnos SET nombre= '" + req.body.nombre + "', apellidop = '" + req.body.apellidop + "', apellidom ='" + req.body.apellidom + "', edad =" + req.body.edad + ", direccion ='" + req.body.direccion + "', correo ='" + req.body.correo + "', genero ='" + req.body.genero + "', elimnado =" + req.body.eliminado + " where id=" + id;
    conexionP.query(query, (error, result) => {
        if (error)
            throw error;
        res.status(200).json({
            mensajeA: true,
            Mensaje: req.body
        });
    });
});
router.post('/alumno', (req, res) => {
    const id = req.params.id;
    console.log("eliminar cursoooo " + id);
    const query = "INSERT INTO public.alumnos ( nombre, apellidop, apellidom, edad, direccion, correo, genero, eliminado) VALUES ('" + req.body.nombre + "', '" + req.body.apellidop + "', '" + req.body.apellidom + "', " + req.body.edad + ", '" + req.body.direccion + "', '" + req.body.correo + "', '" + req.body.genero + "', " + req.body.eliminado + " );";
    conexionP.query(query, (error, result) => {
        if (error)
            throw error;
        res.status(200).json({
            mensajeA: true,
            Mensaje: req.body
        });
    });
});
router.put('/alumnoeliminar/:id', (req, res) => {
    const id = req.params.id;
    console.log("eliminar cursoooo " + id);
    const query = "UPDATE public.alumnos SET  elimnado =" + req.body.eliminado + " where id=" + id;
    conexionP.query(query, (error, result) => {
        if (error)
            throw error;
        res.status(200).json({
            mensajeA: true,
            Mensaje: req.body
        });
    });
});
router.get('/alumnos', (req, res) => {
    const id = req.params.id;
    console.log('GETTT profesooor');
    conexionP.query("SELECT * FROM alumnos ", (error, result) => {
        console.log('entrpoo iiifffff');
        if (error)
            throw error;
        res.json({
            //ok:true,
            Mensajes: result.rows
        });
    });
});
exports.default = router;
