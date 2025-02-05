const sqlite3 = require('sqlite3').verbose();

// Connexion à la base de données SQLite
const db = new sqlite3.Database('./maBaseDeDonnees.sqlite', sqlite3.OPEN_READWRITE |
sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connecté à la base de données SQLite.');
        
        // Création de la table avec la nouvelle structure
        db.run(`CREATE TABLE IF NOT EXISTS personnes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nom TEXT NOT NULL,
            adresse TEXT
        )`, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Table personnes prête.');
                
                // Insertion de données initiales avec adresses
                const personnes = [
                    { nom: 'Bob', adresse: '123 Rue Principale' },
                    { nom: 'Alice', adresse: '456 Avenue des Champs' },
                    { nom: 'Charlie', adresse: '789 Boulevard Central' }
                ];
                
                personnes.forEach(({ nom, adresse }) => {
                    db.run(`INSERT INTO personnes (nom, adresse) VALUES (?, ?)`, [nom, adresse], (err) => {
                        if (err) {
                            console.error(err.message);
                        }
                    });
                });
            }
        });
    }
});

// Fonction pour mettre à jour une personne
const updatePerson = (id, nom, adresse) => {
    db.run(`UPDATE personnes SET nom = ?, adresse = ? WHERE id = ?`, [nom, adresse, id], (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log(`Personne avec l'ID ${id} mise à jour.`);
        }
    });
};

// Fonction pour supprimer une personne
const deletePerson = (id) => {
    db.run(`DELETE FROM personnes WHERE id = ?`, [id], (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log(`Personne avec l'ID ${id} supprimée.`);
        }
    });
};

module.exports = { db, updatePerson, deletePerson };
