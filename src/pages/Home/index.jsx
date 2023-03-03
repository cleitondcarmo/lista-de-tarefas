import {
  Container,
  List, Button,
  Paper,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Todo from '../../components/Todo';
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import "./styles.css";
import { db } from "../../services/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';

const Home = () => {
  const [authenticated, setauthenticated] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    localStorage.setItem("email", user.email);
  }

  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (loggedInUser) {
      setauthenticated(loggedInUser);
    }
  }, []);

  const logado = localStorage.getItem("authenticated")

  if (logado === "false") {
    return (
      <div className="facaLogin">
        <p style={{ color: "red" }}>Você não esta logado!</p>
        <p>Faça login para acessar sua lista de tarefas.</p>
        <Button>
          <Link to="/">Entrar</Link>
        </Button>
      </div>
    );
  }

  if (logado === "true") {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const emailUser = localStorage.getItem("email");

    const createTodo = async (e) => {
      e.preventDefault(e);
      if (input === '') {
        alert('Please enter a valid todo');
        return;
      }
      await addDoc(collection(db, "todos"), {
        text: input,
        completed: false,
        email: emailUser
      });
      setInput('');
    };

    useEffect(() => {
      const q = query(collection(db, 'todos'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let todosArr = [];
        let ArrFilted = [];
        let todosArrFilted = [];
        querySnapshot.forEach((doc) => {
          todosArr.push({ ...doc.data(), id: doc.id });
          const ArrFilted = todosArr.map(function (item, indice) {
            if (todosArr[indice].email == emailUser) {
              return todosArr[indice]
            }
            else{
              todosArr.splice(indice)
              return
            }
          });
        });
        setTodos(todosArr);
      });
      return () => unsubscribe();
    }, []);

    const deleteTodo = async (id) => {
      await deleteDoc(doc(db, "todos/" + id));
      var filtered = todos.filter((todo) => todo.id !== id);
      setTodos(filtered);
    };

    const toggleComplete = async (todo) => {
      await updateDoc(doc(db, 'todos', todo.id), {
        completed: !todo.completed,
      });
    };

    return (
      <Container maxWidth="xs" style={{ marginTop: "1em" }}>
        <Paper style={{ padding: "1em 0px 1em 1em" }}>
          <form onSubmit={createTodo} >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <TextField
                id="outlined-basic"
                label="Tarefa"
                variant="outlined"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                fullWidth
                type='text'
              />
              <Button type="input" startIcon={<AddIcon />} size="large" />
            </div>
          </form>
        </Paper>
        <ul>
          <List sx={{ marginTop: "1em" }}>
            {todos.map((todo, index) => (
              <div key={todo.id} style={{ marginTop: "1em" }}>
                <Todo
                  key={index}
                  todo={todo}
                  toggleComplete={toggleComplete}
                  deleteTodo={deleteTodo} />
              </div>
            ))}
          </List>
        </ul>
        {todos.length < 1 ? null : (
          <p>{`Você possui ${todos.length} tarefas`}</p>
        )}
      </Container>
    );
  }
}

export default Home;
