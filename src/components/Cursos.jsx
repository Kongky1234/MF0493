import React, {useEffect, useState} from 'react'
import NuevoCurso from "./NuevoCurso";
import { useForm } from "react-hook-form";
const axios = require('axios').default;

const Cursos = () => {


    const [isLoading, setLoading] = useState(true);
    const [cursos, setCursos] = useState();
    const {register, handleSubmit, formState: { errors },} = useForm();

    const gestorFormulario = async(data) => {
        await editarCurso(data.id, data.nombre, data.opcion, data.aula, data.coste);
	};

    const editarCurso = async(id, name, modo, lugar, cost) => {
        await axios.patch(process.env.REACT_APP_BACKEND_URL+"curso/" + id, {
            curso: name,
            opcion: modo,
            aula: lugar,
            precio: cost
        },{
			headers:{
				authorization: "Beared "+ JSON.parse(localStorage.datosUsuario).token,
			}
		}).then(
            (response) => {console.log(response.data);
        }).catch((error)=>{
            console.log(error.message);
        })
    }

    useEffect(() => {
        axios.post(process.env.REACT_APP_BACKEND_URL+"docente/cursos/", {
            id: JSON.parse(localStorage.datosUsuario).userId
        },{
			headers:{
				authorization: "Beared "+ JSON.parse(localStorage.datosUsuario).token,
			}
		}).then(response => {
          setCursos(response.data.cursos);
          setLoading(false);
        });
      }, []);

    if (isLoading) {
        return <div className="App">Cargando...</div>;
    } else {

    }
  
  
    return (
    <>
        <div>Cursos</div>
        <NuevoCurso/>
        <div className="listado">
        {cursos.map((curso) =>{return(
        <div key={curso._id}>
            <form onSubmit={handleSubmit(gestorFormulario) }>
            <div className="Curso">
            <input value={curso._id}  {...register("id")} type="hidden"/>
            <input type='text' name='nombre' defaultValue={curso.curso}
						{...register( 'nombre', { minLength: 15 }, { required: true, message: 'Campo requerido' })}/>
					{errors.nombre && errors.nombre.type === 'required' && 'Campo nombre requerido'}
					{errors.nombre && errors.nombre.type === 'minLength' && 'Longitud mínima de 15 caracteres'}
                <select {...register("opcion", { required: true })} defaultValue={curso.opcion}>
                    <option value="Presencial">Presencial</option>
                    <option value="On-line">On-line</option>
                </select>
                    <select {...register("aula")} defaultValue={curso.aula}>
						<option value="Aula-1" >Aula-1</option>
						<option value="Aula-2">Aula-2</option>
						<option value="Aula-3">Aula-3</option>
						<option value="Aula-4">Aula-4</option>
						<option value="Aula-5">Aula-5</option>
						<option value="Virtual">Virtual</option>
					</select>git 
                    <input type='text' name='coste' defaultValue={curso.precio}
						{...register( 'coste', { pattern:/[0-9]+/, max: 11000, min:1000,  required: true, message: 'Campo requerido' })}/>
					{errors.coste && errors.coste.type === 'required' && 'Campo coste requerido'}
					{errors.coste && errors.coste.type === 'pattern' && 'Solo se permite numeros'}
					{errors.coste && errors.coste.type === 'max' && 'Precio maximo 11000'}
					{errors.coste && errors.coste.type === 'min' && 'Precio minimo 1000'}
					<input type='submit' value='Editar Curso' id='submit' />
                </div>
            </form>
        </div>)
        
        })}
        </div>

    </>
  )
}

export default Cursos