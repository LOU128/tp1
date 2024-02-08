const express = require('express');
const app = express();
const PORT = 3001; // Assure-toi que ce port est différent de celui de ton front-end React

app.use(express.json()); // Middleware pour parser les requêtes JSON

const users = [ // Remplace cela par une vraie base de données dans une application réelle
  { identifiant: 'user1', password: 'pass1' },
  { identifiant: 'user2', password: 'pass2' }
];

app.post('/login', (req, res) => {
  const { identifiant, password } = req.body;
  const user = users.find(u => u.identifiant === identifiant && u.password === password);
  if (user) {
    res.status(200).json({ message: "Vous êtes connecté." });
  } else {
    res.status(401).json({ message: "Identifiant ou mot de passe incorrect." });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
