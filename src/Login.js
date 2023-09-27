import React, { useState } from 'react';

function Login({ onLogin, redirectToSignUp }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = () => {
    // Check if the user exists
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = existingUsers.find((user) => user.username === username && user.password === password);

    if (user) {
      setMessage('');
      // Load user's to-do list if available
      const savedTodos = JSON.parse(localStorage.getItem(`todos-${user.id}`)) || [];
      user.todos = savedTodos;
      onLogin(user); // Call the onLogin function passed as a prop to Login
    } else {
      setMessage('Invalid username or password. Please try again.');
    }
  };

  return (
    <div>
      {/* Login form */}
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
      <p>
        Don't have an account?{' '}
        <span onClick={redirectToSignUp}><u>Sign Up</u></span>
      </p>
    </div>
  );
}

export default Login;
