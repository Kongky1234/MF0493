const axios = require('axios').default;
const URL="http://localhost:3000/api/"


// -- METODOS DOCENTES -- \\

const getDocentes = async() => {
    await axios.get(URL+"docente/").then(
        (response) => {console.log(response.data)
    }).catch((error)=>{
        console.log(error.message);
    })
}

const getDocentesById = async(ID) => {
    await axios.get(URL+"docente/"+ID).then(
        (response) => {console.log(response.data)
    }).catch((error)=>{
        console.log(error.message);
    })
}

const buscarDocentes = async(token) => {
    await axios.get(URL+"docente/"+token).then(
        (response) => {console.log(response.data)
    }).catch((error)=>{
        console.log(error.message);
    })
}


const crearDocente = async(name, mail, constraseña, active) => {
    await axios.post(URL+"docente/", {
        nombre: name,
		email: mail,
		password: constraseña,
		activo: active,
		cursos: []
    }).then(
        (response) => {console.log(response.data)
    }).catch((error)=>{
        console.log(error.message);
    })
}

const loginDocente = async(mail, contraseña) => {
    await axios.post(URL+"docente/login/", {
		email: mail,
		password: contraseña
    }).then(
        (response) => {console.log(response.data)
    }).catch((error)=>{
        console.log(error.message);
    })
}


// -- METODOS CURSOS -- \\

const getCursos = async() => {
    await axios.get(URL+"curso/").then(
        (response) => {console.log(response.data)
    }).catch((error)=>{
        console.log(error.message);
    })
}

const getCursoById = async(ID) => {
    await axios.get(URL+"curso/"+ID).then(
        (response) => {console.log(response.data)
    }).catch((error)=>{
        console.log(error.message);
    })
}

const getCursosById = async(ID) => {
    await axios.get(URL+"curso/"+ID).then(
        (response) => {console.log(response.data)
    }).catch((error)=>{
        console.log(error.message);
    })
}

const crearCursos = async(name, prof, modo, lugar, cost) => {
    await axios.post(URL+"curso/", {
        curso: name,
		docente: prof,
		opcion: modo,
		aula: lugar,
		precio: cost
    }).then(
        (response) => {console.log(response.data)
    }).catch((error)=>{
        console.log(error.message);
    })
}

const editarCurso = async(ID, name, prof, modo, lugar, cost) => {
    const userObject = {
        curso: name,
		docente: prof,
		opcion: modo,
		aula: lugar,
		precio: cost
    };
    await axios.patch(URL+"curso/"+ID, userObject).then(
        (response) => {console.log(response.data)
    }).catch((error)=>{
        console.log(error.message);
    })
}


const borrarCurso = async(ID) => {
    await axios.delete(URL+"curso/"+ID).then(
        (response) => {console.log(response.data)
    }).catch((error)=>{
        console.log(error.message);
    })
}


// -- METODOS DOCENTES -- \\

//getDocentes();
//getDocentesById('630dd290de3f650967c7587e');
//crearDocente('Natividad', 'nati@nati.com', 'exdeeeeeeeeee', true);
//crearDocente('Hocus Pocus', 'bugsbunny@warner.com', 'quehaydenuevoviejo', false);
//loginDocente('nati@nati.com', 'exdeeeeeeeeee');
//buscarDocentes('a')

// -- METODOS CURSOS -- \\

//getCursos()
//getCursoById('630de167b9f7eba55dea61f3');
//crearCursos('Curso de prueba','630dd2b5de3f650967c75884','Presencial','Virtual',1500);
//editarCurso('630de167b9f7eba55dea61f3', '','630dd2b5de3f650967c75884','','',5000);
//borrarCurso('630df475daa1986cb5146bd6');

