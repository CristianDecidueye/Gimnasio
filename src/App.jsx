import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "./components/common/Footer";
import Menu from "./components/common/Menu";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inicio from "./components/pages/Inicio";
import Administrador from "./components/pages/Administrador";
import Login from "./components/pages/Login";
import Registro from "./components/pages/Registro";
import { useState } from "react";
import RutasProtegidas from "./components/routes/RutasProtegidas";
import ListaRutasAdministrador from "./components/routes/ListaRutasAdministrador";
import Error404 from "./components/pages/Error404";
function App() {
  const usuario = JSON.parse(localStorage.getItem("usuarioGym")) || {};
  const [usuarioLogueado, setUsuarioLogueado] = useState(usuario);

  return (
    <BrowserRouter>
      <Menu
        usuarioLogueado={usuarioLogueado}
        setUsuarioLogueado={setUsuarioLogueado}
      ></Menu>
      <Routes>
        <Route exact path="/" element={<Inicio></Inicio>}></Route>
        <Route
          exact
          path="/administrador/*"
          element={
            <RutasProtegidas>
              <ListaRutasAdministrador></ListaRutasAdministrador>
            </RutasProtegidas>
          }
        ></Route>
        <Route
          exact
          path="/Login/"
          element={<Login setUsuarioLogueado={setUsuarioLogueado}></Login>}
        ></Route>
        <Route
          exact
          path="*"
          element={<Error404></Error404>}
        ></Route>
        <Route exact path="/Registro/" element={<Registro></Registro>}></Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
