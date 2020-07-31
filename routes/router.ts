



// export default router;

import { Router, Request, Response } from 'express';
import {Client} from 'pg';
const router = Router();
const configuracionBd = {user: 'postgres', host: '0.0.0.0', database: 'cST', password:'1234', port: 5432,};
const conexionP = new Client(configuracionBd);
conexionP.connect();
console.log('ttttttttttt');
router.get('/usuarios',(req: Request, res: Response)=>{
    console.log('GETTT USUARIOSS');
    conexionP.query('SELECT * FROM usuarios', (error, result)=>{
        console.log('entrpoo iiifffff');
        if(error) throw error;
        res.json({
            //ok:true,
            Mensajes:result.rows
            
        });
    })   
});



router.post('/usuario', (req: Request, res: Response)=>{
    console.log(req.body+'POSTTT USUARIO')
    const query = "INSERT INTO usuarios (username, password, correo, apellido) VALUES ('"+ req.body.username+"','"+req.body.password+"','"+req.body.correo+"','"+req.body.apellido+"');"
    //const cuerpo = req.body.cuerpo;
    //const de = req.body.de;
    conexionP.query(query,(error, result)=>{
        if(error) throw error;
        res.status(200).json({
            mensajeN:true,
            Mensaje:req.body
        });
    })

    
    // cuerpo:cuerpo
});

router.put('/usuario/:id', (req: Request, res: Response)=>{
    const id = req.params.id;
    const query = "udapte usuarios set username='"+req.body.username+"', password='"+req.body.idCurso+"' where id="+id
    conexionP.query(query,(error, result)=>{
        if(error) throw error;
        res.status(200).json({
            mensajeA:true,
            Mensaje:req.body
        });
    })
});

router.get('/registros',(req: Request, res: Response)=>{
    console.log('eentroooooo');
    conexionP.query('SELECT * FROM registros', (error, result)=>{
        console.log('entrpoo iiifffff');
        if(error) throw error;
        res.json({
            //ok:true,
            Mensajes:result.rows
            
        });
    })
});

router.post('/registro', (req: Request, res: Response)=>{
    console.log(req.body+'8888888888888888888888888888888888888')
    const query = "INSERT INTO registros (idusuario, idcurso) VALUES ("+ req.body.idusuario+","+req.body.idcurso+");"
    //const cuerpo = req.body.cuerpo;
    //const de = req.body.de;
    conexionP.query(query,(error, result)=>{
        if(error) throw error;
        res.status(200).json({
            mensajeN:true,
            Mensaje:req.body
        });
    })

    
    // cuerpo:cuerpo
});


router.get('/registros/:id',(req: Request, res: Response)=>{
    const id = req.params.id;
    conexionP.query('select * from registros where id='+id, (error, result)=>{
        if(error) throw error;
        res.json({
            ok:true,
            Mensajes:result.rows
            
        });
    })   
});

router.get('/cursos',(req: Request, res: Response)=>{
    console.log('eentroooooo GET CURSOS');
    conexionP.query('SELECT * FROM cursos', (error, result)=>{
        console.log('entrpoo iiifffff');
        if(error) throw error;
        res.json({
            //ok:true,
            Mensajes:result.rows
            
        });
    })
});

router.post('/cursoP', (req: Request, res: Response)=>{
    console.log(req.body+'POOST CURSOS')
    const query = "INSERT INTO public.cursos ( idpropietario , nombre, fecha, cupo, descripcion, costo) VALUES ('"+ req.body.idpropietario+"','"+req.body.nombre+"','"+req.body.fecha+"', "+req.body.cupo+" ,'"+req.body.descripcion+"', "+req.body.costo+" );"
    //const cuerpo = req.body.cuerpo;
    //const de = req.body.de;
    conexionP.query(query,(error, result)=>{
        if(error) throw error;
        res.status(200).json({
            mensajeN:true,
            Mensaje:req.body
        });
    })

    
    // cuerpo:cuerpo
});

router.put('/cursos/:id', (req: Request, res: Response)=>{
    const id = req.params.id;
    const query = "udapte cursos set idPropietario='"+req.body.idPropietario+"', nombre='"+req.body.nombre+"', fecha='"+req.body.fecha+"', cupo= "+req.body.cupo+", descripcion='"+req.body.descripcion+"',  costo= "+req.body.costo+" where id="+id
    conexionP.query(query,(error, result)=>{
        if(error) throw error;
        res.status(200).json({
            mensajeA:true,
            Mensaje:req.body
        });
    })
});

router.put('/cursoscupo/:id', (req: Request, res: Response)=>{
    const id = req.params.id;
    console.log("udappppppteeee cuuupooo");
    const query = "UPDATE public.cursos SET cupo = "+req.body.cupo+ " WHERE id = "+id
    conexionP.query(query,(error, result)=>{
        if(error) throw error;
        res.status(200).json({
            mensajeA:true,
            Mensaje:req.body
        });
    })
});

router.put('/cursoseliminar/:id', (req: Request, res: Response)=>{
    const id = req.params.id;
    console.log("eliminar cursoooo "+id);
    const query = "UPDATE public.cursos SET eliminado= "+req.body.eliminado+" where id="+id
    conexionP.query(query,(error, result)=>{
        if(error) throw error;
        res.status(200).json({
            mensajeA:true,
            Mensaje:req.body
        });
    })
});
///////////////////////////////////////////////////////////////////////////////////////////////

router.get('/profesor/:id',(req: Request, res: Response)=>{
    const id = req.params.id;
    console.log('GETTT profesooor');
    conexionP.query("SELECT public.profesor.nombre as nombre_profesor, public.asignaturas.nombre, asignaturas.horario FROM profesor inner join  asignaturas on profesor.id = asignaturas.idprof where profesor.id ="+id, (error, result)=>{
        console.log('entrpoo iiifffff');
        if(error) throw error;
        res.json({
            //ok:true,
            Mensajes:result.rows
            
        });
    })   
});

router.get('/profesorA/:id',(req: Request, res: Response)=>{
    const id = req.params.id;
    console.log('GETTT profesooor');
    conexionP.query("SELECT public.profesor.nombre as nombre_profesor, public.alumnos.nombre FROM profesor inner join asignaturas on profesor.id = asignaturas.idprof inner join asigadasa on asignaturas.id = asigadasa.idasig inner join alumnos on asigadasa.idalumno = alumnos.id where profesor.id ="+id, (error, result)=>{
        console.log('entrpoo iiifffff');
        if(error) throw error;
        res.json({
            //ok:true,
            Mensajes:result.rows
            
        });
    })   
});

router.get('/alumnoP/:id',(req: Request, res: Response)=>{
    const id = req.params.id;
    console.log('GETTT profesooor');
    conexionP.query("SELECT public.alumnos.nombre as nombre_alumno, public.profesor.nombre FROM alumnos inner join asigadasa on alumnos.id = asigadasa.idalumno inner join asignaturas on asignaturas.id = asigadasa.idasig inner join profesor on asignaturas.idprof = profesor.id where alumnos.id ="+id, (error, result)=>{
        console.log('entrpoo iiifffff');
        if(error) throw error;
        res.json({
            //ok:true,
            Mensajes:result.rows
            
        });
    })
});

router.put('/profesor/:id', (req: Request, res: Response)=>{
    const id = req.params.id;
    console.log("puuut professoorrr "+id);
    const query = "UPDATE public.asignadas SET idprof= "+req.body.eliminado+" where id="+id
    conexionP.query(query,(error, result)=>{
        if(error) throw error;
        res.status(200).json({
            mensajeA:true,
            Mensaje:req.body
        });
    })
});

router.put('/alumno/:id', (req: Request, res: Response)=>{
    const id = req.params.id;
    console.log("eliminar cursoooo "+id);
    const query = "UPDATE public.alumnos SET nombre= '"+req.body.nombre+"', apellidop = '"+req.body.apellidop+"', apellidom ='"+req.body.apellidom+"', edad ="+req.body.edad+", direccion ='"+req.body.direccion+"', correo ='"+req.body.correo+"', genero ='"+req.body.genero+"', elimnado ="+req.body.eliminado+" where id="+id
    conexionP.query(query,(error, result)=>{
        if(error) throw error;
        res.status(200).json({
            mensajeA:true,
            Mensaje:req.body
        });
    })
});

router.post('/alumno', (req: Request, res: Response)=>{
    const id = req.params.id;
    console.log("eliminar cursoooo "+id);
    const query = "INSERT INTO public.alumnos ( nombre, apellidop, apellidom, edad, direccion, correo, genero, eliminado) VALUES ('"+req.body.nombre+"', '"+req.body.apellidop+"', '"+req.body.apellidom+"', "+req.body.edad+", '"+req.body.direccion+"', '"+req.body.correo+"', '"+req.body.genero+"', "+req.body.eliminado+" );"
    conexionP.query(query,(error, result)=>{
        if(error) throw error;
        res.status(200).json({
            mensajeA:true,
            Mensaje:req.body
        });
    })
});

router.put('/alumnoeliminar/:id', (req: Request, res: Response)=>{
    const id = req.params.id;
    console.log("eliminar cursoooo "+id);
    const query = "UPDATE public.alumnos SET  elimnado ="+req.body.eliminado+" where id="+id
    conexionP.query(query,(error, result)=>{
        if(error) throw error;
        res.status(200).json({
            mensajeA:true,
            Mensaje:req.body
        });
    })
});

router.get('/alumnos',(req: Request, res: Response)=>{
    const id = req.params.id;
    console.log('GETTT profesooor');
    conexionP.query("SELECT * FROM alumnos where eliminado= false", (error, result)=>{
        console.log('entrpoo iiifffff');
        if(error) throw error;
        res.json({
            //ok:true,
            Mensajes:result.rows
            
        });
    })
});

router.post('/profesorP', (req: Request, res: Response)=>{
    const id = req.params.id;
    console.log("eliminar cursoooo "+id);
    const query = "INSERT INTO public.profesor ( nombre) VALUES ('"+req.body.nombre+"');"
    conexionP.query(query,(error, result)=>{
        if(error) throw error;
        res.status(200).json({
            mensajeA:true,
            Mensaje:req.body
        });
    })
});

export default router;