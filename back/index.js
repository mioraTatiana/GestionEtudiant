import express from "express";
import mysql from "mysql";
import cors from "cors";
import multer from "multer";
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

//  ----------------------

const storage = multer.diskStorage({
  designation: (req, file, cb) => {
    db(null, "public/image")
  },

  filename: (req, file, cb) =>{
    db(null, file.fieldname + "_" + Date.now() + path.extname(fileorginalname));
  } 
})

const upload = multer({ 
  Storage: storage 
});

// 1-const storage = multer.diskStorage({
//   destination: './uploads/', // Change this to your desired upload directory
//   filename: (req, file, cb) => {
//       const uniqueFileName = `${Date.now()}-${file.originalname}`;
//       cb(null, uniqueFileName);
//   }
// });

// const upload = multer({ 
//   storage 
// });

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mlr3",

  // queryFormat: function(query, values){
  //   if (!values) return query;
  //   return query.replace(\/:(w+)/g, function(txt, key){
  //     if (values.hasOwnProperty(key)) {
  //       return this.escape(values.[key]);
  //     }
  //     return txt;
  //   }.bind(this));
  // }
});

 
app.post('/etudiant/create1', upload.single('image')  , (req, res) => {
  console.log(req.file)
  const image = req.file.filename;
  const sql = "INSERT INTO etudiant (photo) VALUES (?)"
  db.query(sql, [image], (err, data) =>{
    if (err) return res.json(err);
    return res.json(data);
  })
})


// 1-Route pour l'insertion d'un étudiant avec une photo
// app.post('/etudiant/create1', upload.single('photo2'), async (req, res) => {
//   try {
//       const { photo2 } = req.file.filename; // Extract the filename from the uploaded file

//       const sql = `INSERT INTO etudiant (photo2) VALUES (?)`;
//       const values = [photo2];

//       await connection.query(sql, values, (err, result) => {
//           if (err) {
//               console.error('Error inserting student:', err);
//               // return res.status(500).json({ message: 'Error creating student' });
//           }

//           res.status(201).json({ message: 'Student created successfully' });
//       });
//   } catch (error) {
//       console.error('Error processing image or creating student:', error);
//       res.status(500).json({ message: 'Error creating student' });
//   }
// });

//   -----------------


// ETUDIANT

app.get("/etudiant", (req, res) => {
  const sql = "SELECT * FROM etudiant";

  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/etudiant/create", (req, res) => {
  const etudiant = {
    matricule: req.body.MATRICULE,
    parcours: req.body.ID_PARCOURS,
    niveau: req.body.ID_NIVEAU,
    nomEtudiant: req.body.NOM_ETUDIANT,
    prenomEtudiant: req.body.PRENOM_ETUDIANT,
    dateNaissance: req.body.DATENAISSANCE,
    lieuNaissance: req.body.LIEUNAISSANCE,
    situationMatri: req.body.SITUATION_MATRI,
    cin: req.body.CIN,
    adresse: req.body.ADRESSE,
    contact: req.body.CONTACT,
    email: req.body.EMAIL,
    status: req.body.STATUS,
    nomPere: req.body.NOMETPRENOM_PERE,
    nomMere: req.body.NOMETPRENOM_MERE,
    nomTuteur: req.body.NOMETPRENOM_TUTEUR,
    adressePere: req.body.ADRESSE_PERE,
    adresseMere: req.body.ADRESSE_MERE,
    adresseTuteur: req.body.ADRESSE_TUTEUR,
    professionPere: req.body.PROFESSION_PERE,
    professionMere: req.body.PROFESSION_MERE,
    professionTuteur: req.body.PROFESSION_TUTEUR,
    contactPere: req.body.CONTACT_PERE,
    contactMere: req.body.CONTACT_MERE,
    contactTuteur: req.body.CONTACT_TUTEUR,
  };

  const valeur = Object.values(etudiant);

  const sql =
    "INSERT INTO `etudiant`(`MATRICULE`, `ID_PARCOURS`, `ID_NIVEAU`, `NOM_ETUDIANT`, `PRENOM_ETUDIANT`, `DATENAISSANCE`, `LIEUNAISSANCE`, `SITUATION_MATRI`, `CIN`, `ADRESSE`, `CONTACT`, `EMAIL`, `STATUS`, `NOMETPRENOM_PERE`, `NOMETPRENOM_MERE`, `NOMETPRENOM_TUTEUR`, `ADRESSE_PERE`, `ADRESSE_MERE`, `ADRESSE_TUTEUR`, `PROFESSION_PERE`, `PROFESSION_MERE`, `PROFESSION_TUTEUR`, `CONTACT_PERE`, `CONTACT_MERE`, `CONTACT_TUTEUR`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

  db.query(sql, valeur, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.put("/etudiant/update", (req, res) => {
  const etudiant = {
    parcours: req.body.ID_PARCOURS,
    niveau: req.body.ID_NIVEAU,
    nomEtudiant: req.body.NOM_ETUDIANT,
    prenomEtudiant: req.body.PRENOM_ETUDIANT,
    dateNaissance: req.body.DATENAISSANCE,
    lieuNaissance: req.body.LIEUNAISSANCE,
    situationMatri: req.body.SITUATION_MATRI,
    cin: req.body.CIN,
    adresse: req.body.ADRESSE,
    contact: req.body.CONTACT,
    email: req.body.EMAIL,
    status: req.body.STATUS,
    nomPere: req.body.NOMETPRENOM_PERE,
    nomMere: req.body.NOMETPRENOM_MERE,
    nomTuteur: req.body.NOMETPRENOM_TUTEUR,
    adressePere: req.body.ADRESSE_PERE,
    adresseMere: req.body.ADRESSE_MERE,
    adresseTuteur: req.body.ADRESSE_TUTEUR,
    professionPere: req.body.PROFESSION_PERE,
    professionMere: req.body.PROFESSION_MERE,
    professionTuteur: req.body.PROFESSION_TUTEUR,
    contactPere: req.body.CONTACT_PERE,
    contactMere: req.body.CONTACT_MERE,
    contactTuteur: req.body.CONTACT_TUTEUR,
    matricule: req.body.MATRICULE,
  };

  const valeur = Object.values(etudiant);

  const sql =
    "UPDATE `etudiant` SET `ID_PARCOURS`=?,`ID_NIVEAU`=?,`NOM_ETUDIANT`=?,`PRENOM_ETUDIANT`=?,`DATENAISSANCE`=?,`LIEUNAISSANCE`=?,`SITUATION_MATRI`=?,`CIN`=?,`ADRESSE`=?,`CONTACT`=?,`EMAIL`=?,`STATUS`=?,`NOMETPRENOM_PERE`=?,`NOMETPRENOM_MERE`=?,`NOMETPRENOM_TUTEUR`=?,`ADRESSE_PERE`=?,`ADRESSE_MERE`=?,`ADRESSE_TUTEUR`=?,`PROFESSION_PERE`=?,`PROFESSION_MERE`=?,`PROFESSION_TUTEUR`=?,`CONTACT_PERE`=?,`CONTACT_MERE`=?,`CONTACT_TUTEUR`=? WHERE `MATRICULE`=?";

  db.query(sql, valeur, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//INSCRIPTION

app.get("/inscription", (req, res) => {
  const sql =
    "SELECT `ID_INSCRIPTION`, `DATE_INSCRIPTION`, etudiant.MATRICULE,NOM_ETUDIANT, PRENOM_ETUDIANT, inscription.ID_NIVEAU, inscription.ID_PARCOURS, `ANNEEUNIV`, `BORDEREAU`, `DATEPAIMENT` FROM `inscription` , etudiant WHERE etudiant.MATRICULE= inscription.MATRICULE;";

  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/inscription/create", (req, res) => {
  const inscription = {
    matricule: req.body.MATRICULE,
    dateInscription: req.body.DATE_INSCRIPTION,
    parcours: req.body.ID_PARCOURS,
    niveau: req.body.ID_NIVEAU,
    anneeUniv: req.body.ANNEEUNIV,
    bordereau: req.body.BORDEREAU,
    datePaiement: req.body.DATEPAIMENT,
  };

  const valeurs = Object.values(inscription);
  const sql = `INSERT INTO inscription (
      MATRICULE, DATE_INSCRIPTION, ID_PARCOURS, ID_NIVEAU, ANNEEUNIV, BORDEREAU, DATEPAIMENT) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, valeurs, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(8080, () => {
  console.log("Your server is ready");
});
