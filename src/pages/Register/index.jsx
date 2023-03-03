import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import arrowImg from "../../assets/arrow.svg";
import logoImg from "../../assets/logo.svg";
import { auth } from "../../services/firebaseConfig";
import { Alert, CircularProgress, AlertTitle } from '@mui/material';
import "./styles.css";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  function handleSignOut(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(email, password);
    setAlert(true);
/*     navigate("/login");
 */  }

  if (loading) {
    return <CircularProgress style={{ margin: "50%" }} color="success" />
  }

  return (
    <div className="container">
      <div>
        {alert ? <Alert severity="success">
          <AlertTitle>Successo</AlertTitle>
            Sua conta foi criada — <strong>Faça login!</strong>
          </Alert> : <></>}
      </div>
      <header className="header">
        <img style={{ width: "100px", height: "100px" }} src={logoImg} alt="Workflow" className="logoImg" />
        <span>Basta se cadastrar para começar suas tarefas</span>
      </header>

      <form>
        <div className="inputContainer">
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="johndoe@gmail.com"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="inputContainer">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="********************"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={handleSignOut} className="button">
          Cadastrar
        </button>
        <div className="footer">
          <Link to="/">Acesse sua conta aqui</Link>
        </div>
      </form>
    </div>
  );
}
