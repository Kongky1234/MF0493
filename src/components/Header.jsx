import React, {useState} from 'react';
import { Route, Routes, Link} from "react-router-dom"; 
import Home from "./Home";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import Cursos from "./Cursos";

const Header = ({ token }) => {
    let loggingFunction= !token ? <p><Link to="/login">Login</Link></p> : <p><Link to="/logout">Logout</Link></p>
    let registerFunction= !token ? <p><Link to="/register">Register</Link></p> : ""
    let cursosLink= !token ? "" : <p><Link to="/cursos">Cursos</Link></p>

    
    

    const [state,setState]=useState([loggingFunction, registerFunction, cursosLink]);

    function changeUser(newToken){
        setState ([
            !newToken ? <p><Link to="/login">Login</Link></p> : <p><Link to="/logout">Logout</Link></p>,
            !newToken ? <p><Link to="/register">Register</Link></p> : "",
            !newToken ? "" : <p><Link to="/cursos">Cursos</Link></p>
        ])   
    }
    return (
        <>
        <nav className="Header">
            <p><Link to="/">Index</Link></p>
            {state[0]}
            {state[1]}
            {state[2]}
        </nav>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<Register changeUser={changeUser}/>}/>
                <Route path="/login" element={<Login changeUser={changeUser}/> }/>
                <Route path="/logout" element={<Logout changeUser={changeUser}/>}/>
                <Route path="/cursos" element={<Cursos/>}/>
            </Routes>
        </>
    )
}

export default Header;