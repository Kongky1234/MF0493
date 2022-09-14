import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = (props) => {
	const { gestionarLogout } = props;

	const navegar = useNavigate();

	useEffect(() => {
		localStorage.removeItem('datosUsuario');
		props.changeUser(false);
		navegar('/');
	}, []);
	return <h1>Logged out...</h1>;
};

export default Logout;