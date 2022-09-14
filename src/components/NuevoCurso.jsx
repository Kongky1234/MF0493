import React from 'react';
import { useForm } from "react-hook-form";
const axios = require('axios').default;

const NuevoCurso = ({ token }) => {
	const {register, handleSubmit, formState: { errors },} = useForm();
	
	const gestorFormulario = async(data) => {
		console.log(data);
        await crearCurso(data.nombre, JSON.parse(localStorage.datosUsuario).userId, data.opcion, data.aula, data.coste);
	};
    const crearCurso = async(name, prof, modo, lugar, cost) => {
        await axios.post(process.env.REACT_APP_BACKEND_URL+"curso/", {
            curso: name,
            docente: prof,
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


	return (
		<div className='Form'>
			<div className='title'>Crea un nuevo Curso</div>
			<div className='inputs'>
				<form onSubmit={handleSubmit(gestorFormulario)}>
					<input type='text' name='nombre' placeholder='Nombre del Curso'
						{...register( 'nombre', { minLength: 15 }, { required: true, message: 'Campo requerido' })}/>
					{errors.nombre && errors.nombre.type === 'required' && 'Campo nombre requerido'}
					{errors.nombre && errors.nombre.type === 'minLength' && 'Longitud mínima de 15 caracteres'}
					
					
					<label><input type='radio' name="opcion" value='Presencial' {...register("opcion", { required: true })}/>Presencial</label>
					<label><input type='radio' name="opcion" value='On-line' {...register("opcion", { required: true })}/>On-line</label>
					{errors.opcion && errors.opcion.type === 'required' && 'Campo opcion requerido'}
                    <select  {...register("aula")}>
						<option value="Aula-1">Aula-1</option>
						<option value="Aula-2">Aula-2</option>
						<option value="Aula-3">Aula-3</option>
						<option value="Aula-4">Aula-4</option>
						<option value="Aula-5">Aula-5</option>
						<option value="Virtual">Virtual</option>
					</select>
                    <input type='text' name='coste' placeholder='Coste'
						{...register( 'coste', { pattern:/[0-9]+/, max: 11000, min:1000,  required: true, message: 'Campo requerido' })}/>
					{errors.coste && errors.coste.type === 'required' && 'Campo coste requerido'}
					{errors.coste && errors.coste.type === 'pattern' && 'Solo se permite numeros'}
					{errors.coste && errors.coste.type === 'max' && 'Precio maximo 11000'}
					{errors.coste && errors.coste.type === 'min' && 'Precio minimo 1000'}
					<input type='submit' value='Crear Curso' id='submit' />
				</form>
			</div>
		</div>
	);
};


export default NuevoCurso;