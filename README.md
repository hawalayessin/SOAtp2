# TP2 : Création d’une API Restful avec Express JS

## Objectif(s)
- Création d'une API Rest avec Express JS
- Utilisation des bonnes pratiques pour les API Restful

## Outils Utilisés
- Node.js
- Express.js
- SQLite3

---

## Installation et Configuration

### 1. Initialisation du Projet
1. Créez un nouveau dossier pour votre projet.
2. Ouvrez un terminal et naviguez vers ce dossier.
3. Initialisez un nouveau projet Node.js avec :
   ```sh
   npm init -y
   ```
4. Installez Express.js et SQLite3 avec :
   ```sh
   npm install express sqlite3
   ```

### 2. Configuration de SQLite3
1. Créez un fichier `database.js` et ajoutez la configuration SQLite3 :
   ```js
   const sqlite3 = require('sqlite3').verbose();
   const db = new sqlite3.Database('./maBaseDeDonnees.sqlite', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
       if (err) {
           console.error(err.message);
       } else {
           console.log('Connecté à la base de données SQLite.');
           db.run(`CREATE TABLE IF NOT EXISTS personnes (
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               nom TEXT NOT NULL,
               adresse TEXT
           )`);
       }
   });
   module.exports = db;
   ```

---

## Mise en Place de l'API

### 1. Création du serveur Express
1. Créez un fichier `index.js` et ajoutez le code suivant :
   ```js
   const express = require('express');
   const db = require('./database');
   const app = express();
   app.use(express.json());
   const PORT = 3000;

   app.get('/', (req, res) => {
       res.json("Registre de personnes! Choisissez le bon routage!");
   });
   ```

### 2. Définition des Routes
- **Récupérer toutes les personnes** :
   ```js
   app.get('/personnes', (req, res) => {
       db.all("SELECT * FROM personnes", [], (err, rows) => {
           if (err) {
               res.status(400).json({ "error": err.message });
               return;
           }
           res.json({ "message": "success", "data": rows });
       });
   });
   ```

- **Récupérer une personne par ID** :
   ```js
   app.get('/personnes/:id', (req, res) => {
       const id = req.params.id;
       db.get("SELECT * FROM personnes WHERE id = ?", [id], (err, row) => {
           if (err) {
               res.status(400).json({ "error": err.message });
               return;
           }
           res.json({ "message": "success", "data": row });
       });
   });
   ```

- **Ajouter une nouvelle personne** :
   ```js
   app.post('/personnes', (req, res) => {
       const { nom, adresse } = req.body;
       db.run("INSERT INTO personnes (nom, adresse) VALUES (?, ?)", [nom, adresse], function(err) {
           if (err) {
               res.status(400).json({ "error": err.message });
               return;
           }
           res.json({ "message": "success", "data": { id: this.lastID } });
       });
   });
   ```

- **Mettre à jour une personne** :
   ```js
   app.put('/personnes/:id', (req, res) => {
       const id = req.params.id;
       const { nom, adresse } = req.body;
       db.run("UPDATE personnes SET nom = ?, adresse = ? WHERE id = ?", [nom, adresse, id], function(err) {
           if (err) {
               res.status(400).json({ "error": err.message });
               return;
           }
           res.json({ "message": "success" });
       });
   });
   ```

- **Supprimer une personne** :
   ```js
   app.delete('/personnes/:id', (req, res) => {
       const id = req.params.id;
       db.run("DELETE FROM personnes WHERE id = ?", id, function(err) {
           if (err) {
               res.status(400).json({ "error": err.message });
               return;
           }
           res.json({ "message": "success" });
       });
   });
   ```

### 3. Lancer le serveur
```sh
node index.js
```

---

## Test avec Postman

1. **Installation et Configuration**
   - Téléchargez et installez [Postman](https://www.postman.com/).
   - Créez une nouvelle collection pour votre API.

2. **Tester les Routes**
   - GET `/personnes`
   - GET `/personnes/:id`
   - POST `/personnes` (Body : `{ "nom": "John", "adresse": "Paris" }`)
   - PUT `/personnes/:id` (Body : `{ "nom": "John Doe", "adresse": "Lyon" }`)
   - DELETE `/personnes/:id`
 ![image](https://github.com/user-attachments/assets/8c78e59e-70b3-4dd3-a132-130b03878405)
![image](https://github.com/user-attachments/assets/eedd9923-b3d3-4e01-af6c-6a9d53d03565)
![image](https://github.com/user-attachments/assets/72936f4b-fee9-4ed6-bbef-52c635dc6690)
![image](https://github.com/user-attachments/assets/fa7d872d-bf33-40d6-86e6-35dc61a938ee)


3. **Validation**
   - Assurez-vous que les données sont correctement insérées, mises à jour et supprimées.
   - Testez les erreurs avec des données incorrectes.




     ```


