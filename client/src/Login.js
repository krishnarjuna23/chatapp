import React, { useState,useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {store} from './App'
import './Login.css'; 

const Login = () => {

 const [token,setToken] =useContext(store)
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/login', data).then((res) => {
      setToken(res.data.token);
    });
  };

  if (token) {
    navigate('/myprofile');
  }

  return (
    <div>
      <center>
        <form onSubmit={submitHandler} autoComplete="off" className="login-container">
          <h3>Login</h3>
          <input type="email" onChange={changeHandler} name="email" placeholder="Email" />
          <br />
          <input type="password" onChange={changeHandler} name="password" placeholder="Password" />
          <br />
          <input type="submit" value="Login" />
        </form>
      </center>
    </div>
  );
};

export default Login;
