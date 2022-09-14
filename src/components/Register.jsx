import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
const axios = require('axios').default;

const Register = ({ changeUser }) => {
    var user;
    const navegar = useNavigate();
	const {register, handleSubmit, formState: { errors },} = useForm();

	const gestorFormulario = async(data) => {
		console.log(data);
        await crearDocente(data.nombre, data.email, data.password);
	};

    const crearDocente = async(name, mail, constraseña, active) => {
        await axios.post(process.env.REACT_APP_BACKEND_URL+"/api/docente/", {
            nombre: name,
            email: mail,
            password: constraseña,
            activo: active,
            cursos: []
        }).then(
            (response) => {user = response.data; registroLogin(user)
        }).catch((error)=>{
            console.log(error.message);
        })
    }

    const loginDocente = async(mail, contraseña) => {
        await axios.post(process.env.REACT_APP_BACKEND_URL+"/api/docente/", {
            email: mail,
            password: contraseña
        }).then(
            (response) => {user = response.data
        }).catch((error)=>{
            console.log(error.message);
        })
    }

    const registroLogin = async(data) => {
        console.log("uno")
        await loginDocente(data.email, data.password);
		localStorage.setItem(
			'datosUsuario',
			JSON.stringify({ userId: user.userId, token: user.token })
		);
        changeUser(true);
        navegar('/');
    };

	return (
		<div className='Form'>
			<div className='title'>Crea tu cuenta</div>
			<div className='inputs'>
				<form onSubmit={handleSubmit(gestorFormulario)}>
					<input type='text' name='nombre' placeholder='Nombre'
						{...register( 'nombre', { minLength: 5 }, { required: true, message: 'Campo requerido' })}/>
					{errors.nombre && errors.nombre.type === 'required' && 'Campo nombre requerido'}
					{errors.nombre && errors.nombre.type === 'minLength' && 'Longitud mínima de 5 caracteres'}
					<input type='text' name='email' placeholder='email@email.com' {...register('email',
                    {pattern:/^(?![_.-])((?![_.-][_.-])[a-zA-Z\d_.-]){0,63}[a-zA-Z\d]@((?!-)((?!--)[a-zA-Z\d-]){0,63}[a-zA-Z\d]\.){1,2}([a-zA-Z]{2,14}\.)?[a-zA-Z]{2,14}$/,},
					{ required: true, message: 'Campo requerido' }
					)}/>
					{errors.email && errors.email.type === 'required' && 'Campo email requerido'}
					{errors.email && errors.email.type === 'pattern' && 'Formato email incorrecto'}
					<input type='password' name='password' placeholder='Contraseña'
                    {...register('password', { minLength: 6 }, { required: true, message: 'Campo requerido' })}/>
					{errors.password && errors.password.type === 'required' && 'Campo contraseña requerido'}
					{errors.password && errors.password.type === 'minLength' && 'Longitud mínima de 6 caracteres'}
					<input type='submit' value='Crear Cuenta' id='submit' />
				</form>
			</div>
		</div>
	);
};


export default Register;