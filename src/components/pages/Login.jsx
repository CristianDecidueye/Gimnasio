import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { login } from "../helpers/queries";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import login1 from "../../assets/login1.jpg";
import login2 from "../../assets/login2.jpg";

const Login = ({ setUsuarioLogueado }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navegacion = useNavigate();

  const onSubmit = async (usuario) => {
    const respuesta = await login(usuario);
    try {
      if (respuesta.status === 200) {
        Swal.fire(
          "¡Bienvenido a STK GYM!",
          "Has iniciado sesión correctamente",
          "success"
        );
        const datos = await respuesta.json();
        localStorage.setItem(
          "usuarioGym",
          JSON.stringify({ email: datos.email, token: datos.token })
        );
        setUsuarioLogueado(datos);
        navegacion("/administrador");
      } else {
        Swal.fire(
          "Error al iniciar sesión",
          "Correo o contraseña incorrectos",
          "error"
        );
      }
    } catch (error) {
      Swal.fire(
        "Ocurrió un error",
        "Error procesando la respuesta del servidor",
        "error"
      );
    }
  };

  return (
    <Container className="my-5 mainSection ">
      <h1 className="textoMorado text-center">STK GYM</h1>
      <h2 className="mb-4 textoMorado text-center">Inicio de sesión</h2>
      <Row>
        <Col className="text-center d-none d-lg-block" lg={4}>
          <img
            src={login1}
            alt="persona levantando una barra con pesas"
            className="img-fluid"
            width={240}
          />
        </Col>
        <Col lg={4}>
          <Form
            className="bgMorado textoClaro p-3 text-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Correo electronico*</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ej: claudia@mail.com"
                {...register("email", {
                  required: "El correo es obligatorio",
                  minLength: {
                    value: 10,
                    message: "El correo debe contener al menos 10 caracteres",
                  },
                  maxLength: {
                    value: 30,
                    message:
                      "El correo debe contener como máximo 30 caracteres",
                  },
                  pattern: {
                    value:
                      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                    message:
                      "El correo debe ser un email valido Ej: claudia@mail.com",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.email?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña*</Form.Label>
              <Form.Control
                type="password"
                placeholder="ingrese una contraseña"
                {...register("password", {
                  required: "El password es obligatorio",
                  minLength: {
                    value: 8,
                    message: "el minimo es de 8 caracteres",
                  },
                  maxLength: {
                    value: 15,
                    message: "el maximo es de 15 caracteres",
                  },
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                    message:
                      "El password debe contener al menos una letra mayúscula, una letra minúscula y un número",
                  },
                })}
              />{" "}
              <Form.Text className="text-danger">
                {errors.password?.message}
              </Form.Text>
            </Form.Group>
            <Button variant="light" type="submit">
              Ingresar
            </Button>
          </Form>
        </Col>
        <Col className="text-center" lg={4}>
          <img
            src={login2}
            alt="mujer posando mostrando los biceps"
            className="img-fluid mt-5 mt-lg-0" 
            width={240}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
