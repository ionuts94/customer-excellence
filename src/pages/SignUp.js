import React, { useState } from 'react';
import { register } from '../actions/auth';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  const doRegister = async () => {
    const registered = await register(userData);
    if (registered) {
      navigate(`/`);
    } else {
      alert("Failed to register");
    }
  }

  console.log(userData);

  return (
    <div className="sign-up-container">
      <label>Email</label>
      <input onChange={handleInputChange} name="email" type="text" value={userData.email} />
      <br />
      <label>Password</label>
      <input onChange={handleInputChange} name="password" type="password" value={userData.password} />
      <br />
      <button onClick={doRegister}>Register</button>
    </div>
  )
}

export default SignUp