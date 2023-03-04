import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import arrowImg from "../../assets/arrow.svg";
import logoImg from "../../assets/logo.svg";
import { auth } from "../../services/firebaseConfig";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Alert, CircularProgress, AlertTitle } from '@mui/material';
import "./styles.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated") || false));
  const [alert, setAlert] = useState(false);

  signOut(auth).then(() => {
    localStorage.setItem("authenticated", false);
  }).catch((error) => {
    // An error happened.
  });

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  function handleSignIn(e) {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("authenticated", true);
        navigate("/home");
      }
      if (error) {
        console.log(error)
        setAlert(true);
        setauthenticated(false);
        localStorage.setItem("authenticated", false);
      }
    });
  }

  return (
    <div className="container">
      <div>
        {alert ? <Alert severity="error">
          <AlertTitle>Erro</AlertTitle>
          E-mail ou senha incorreta
        </Alert> : <></>}
      </div>
      <header className="header">
        <img style={{ width: "100px", height: "100px" }} src={logoImg} alt="Workflow" className="logoImg" />
        <span>Entre e faça suas tarefas</span>
      </header>

      <form>
        <div className="inputContainer">
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="ana@gmail.com"
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
            placeholder="***********"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <a href="#">Esqueceu sua senha ?</a>

        <button className="button" onClick={handleSignIn} >
          Entrar
        </button>
        <div className="footer">
          <Link to="/register">Criar uma conta</Link>
        </div>
      </form>
    </div>
  );
}
export default Login
