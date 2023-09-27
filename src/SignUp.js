import React, { useState } from 'react';

function SignUp({ onSignUp }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = () => {
    // Check if the user already exists
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const isUserExists = existingUsers.some((user) => user.username === username);

    if (isUserExists) {
      setMessage('Username already exists. Please choose another one.');
    } else {
      // Generate a unique user ID (you can use a better ID generation method)
      const userId = Date.now();

      // Create a new user with a unique ID
      const newUser = {
        id: userId,
        username: username,
        password: password,
      };

      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));

      // Initialize the user's to-do list if it does not exist
      if (!newUser.todos) {
        localStorage.setItem(`todos-${userId}`, JSON.stringify([]));
      }

      setMessage('User registered successfully. Please log in.');
      onSignUp(newUser); // Call the onSignUp function to set the user in the parent component
    }
  };


  return (
    <div>
      {/* Sign-up form */}
      <h2>Sign Up</h2>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleSignUp}><u>Sign Up</u></button>
      <p>{message}</p>
    </div>
  );
}

export default SignUp;
