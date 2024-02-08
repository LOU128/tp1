import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import logo from './logop8-3.jpg'; 
function App() {
  const [users, setUsers] = useState([
    { identifiant: 'user1', password: 'pass1' },
    { identifiant: 'user2', password: 'pass2' }
  ]);

  const [identifiant, setIdentifiant] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleReset = () => {
    setIdentifiant('');
    setPassword('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();

   
    if (identifiant === 'user1' && password === 'pass1') {
      setIsLoggedIn(true);
      alert('Ok: Vous êtes connecté.');
      return;
    }

   
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifiant: identifiant,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true);
        alert(data.message); 
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message); 
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleAjoutCompte = () => {
    // Vérification si l'identifiant existe déjà
    if (users.some(user => user.identifiant === identifiant)) {
      alert('Cet identifiant est déjà utilisé.');
      return;
    }

    // Vérification de la complexité du mot de passe
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    if (!hasNumber.test(password) || !hasSpecialChar.test(password)) {
      alert('Le mot de passe doit contenir au moins un chiffre et un caractère spécial.');
      return;
    }

    // Ajout d'un nouvel utilisateur directement dans le state (pour l'exemple)
    setUsers([...users, { identifiant: identifiant, password: password }]);
    alert('Utilisateur ajouté. Veuillez maintenant vous connecter.');
  };

  return (
    <Router>
      <div className="App">
        {!isLoggedIn ? (
          <form className="login-form" onSubmit={handleLogin}>
            <img src={logo} alt="Logo" className="logo" />
            <h2>Login Form</h2>
            <div className="form-group">
              <label htmlFor="identifiant">Identifiant</label>
              <input
                type="text"
                id="identifiant"
                value={identifiant}
                onChange={e => setIdentifiant(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-actions">
              <button type="button" onClick={handleReset}>Reset</button>
              <button type="submit">Ok</button>
              <button type="button" onClick={handleAjoutCompte}>Ajout Compte</button>
            </div>
          </form>
        ) : (
          <Routes>
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
