import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
const axios = require('axios').default;

const Login = ({ changeUser }) => {
    var user;
	const navegar = useNavigate();
	const {register, handleSubmit, formState: { errors },} = useForm();

	const gestorFormulario = async(data) => {
		console.log(data);
        await loginDocente(data.email, data.password);
	};

    const loginDocente = async(mail, contraseña) => {
        await axios.post("http://localhost:5000/api/"+"docente/login/", {
            email: mail,
            password: contraseña
        }).then(
            (response) => {user = response.data; gestionarLogin(user);
        }).catch((error)=>{
            console.log(error.message);
        })
    }

    const gestionarLogin = (user) => {
		console.log(user);
		localStorage.setItem(
			'datosUsuario',
			JSON.stringify({ userId: user.userId, token: user.token })
		);
		console.log(changeUser);
		changeUser(true);
		navegar('/');
    };

	return(
		<div className='Form'>
			<div className='title'>Hazte Login</div>
			<div className='inputs'>
				<form onSubmit={handleSubmit(gestorFormulario)}>
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
					<input type='submit' value='Login' id='submit' />
				</form>
			</div>
		</div>
	);
};


export default Login;