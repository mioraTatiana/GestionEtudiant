import express from "express";
import mysql from "mysql";
import cors from "cors";
import multer from "multer";
import path from 'path';
import PDFDocument from 'pdfkit'
import fs from 'fs'

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

// ------------------------------------PDF-----------------
app.get("/generate-pdf", (req, res) => {


  const doc = new PDFDocument({
    size: "A6",
    layout: "landscape",
  });
  doc.pipe(fs.createWriteStream("pdf.pdf"));
  doc.pipe(res);

  const personne = {
    MATRICULE: "2450",
    ID_PARCOURS: "GB",
    ID_NIVEAU: "L3",
    NOM_ETUDIANT: "RASOLONIRINA",
    PRENOM_ETUDIANT: "Fitahiana Martial",
    DATENAISSANCE: "2002-03-29",
    LIEUNAISSANCE: "Isada Fianarantsoa",
    SITUATION_MATRI: "Célibataire",
    CIN: 201012031144,
    ADRESSE: "IR 323 Ambanilalana Fianarantsoa",
    CONTACT: 346331923,
    EMAIL: "ttnmiora@gmail.com",
    STATUS: "Admis",
    CONTACT: "0346331923",
  };
  

  doc.image("./image/MIORA.png", 30, 110, {
    fit: [80, 200],
  });

  doc.image("./image/fianarantsoa.jpg", 50, 7, {
    fit: [40, 60],
    align: "right",
    valign: "bottom",
  });

  doc.fontSize(8);
  doc.font("Times-Roman");
  doc.text(
    "MINISTERE DE L ENSEIGNEMENT SUPERIEUR \n ET DE LA RECHERCHE SCIENTIFIQUE",
    70,
    20,
    {
      align: "center",
    }
  );

  doc.fontSize(9);
  doc.font("Courier-Bold");
  doc.text("UNIVERSITE DE FIANARANTSOA", 70, 40, {
    align: "center",
  });

  doc.fontSize(10);
  doc.text("ECOLE NATIONALE D'INFORMATIQUE", 70, 50, {
    align: "center",
  });

  doc.font("Courier-BoldOblique", 5);
  doc.text(
    '"Ecole ingénieuse, pépinière des élites informaticiennes"',
    70,
    60,
    {
      align: "center",
    }
  );

  doc.image("./image/eni.png", 330, 7, {
    fit: [40, 60],
    align: "right",
    valign: "bottom",
  });

  doc.fontSize(9);
  doc.font("Courier-Bold");
  doc.text(
    `Matricule: ${personne.MATRICULE}\n Niveau: ${personne.ID_NIVEAU} \n `,
    50,
    80
  );
  doc.fontSize(9);
  doc.font("Courier-Bold");
  doc.text(
    ` Parcours: ${personne.ID_PARCOURS} \n Mention: Informatique`,
    220,
    80
  );

  doc.fontSize(8);
  doc.font("Times-Italic");
  doc.text("Nom:", 120, 110);

  doc.fontSize(10);
  doc.font("Times-Bold");
  doc.text(personne.NOM_ETUDIANT, 130);

  doc.fontSize(8);
  doc.font("Times-Italic");
  doc.text("Prénoms:", 120);

  doc.font("Times-Roman", 10);
  doc.text(personne.PRENOM_ETUDIANT, 130);

  doc.image("./image/calendrier.png", 120, 150, {
    fit: [16, 16],
  });

  doc.font("Times-Italic", 8);
  doc.text(`Né le: `, 140, 155);

  doc.font("Times-Roman", 10);
  doc.text(` ${personne.DATENAISSANCE}`, 160, 155);

  doc.font("Times-Italic", 8);
  doc.text(` à : `, 215, 155);

  doc.font("Times-Roman", 10);
  doc.text(` ${personne.LIEUNAISSANCE}`, 225, 155);

  doc.image("./image/cin.png", 120, 170, {
    fit: [16, 16],
  });

  doc.font("Times-Italic", 8);
  doc.text(`CIN:`, 140, 175);

  doc.font("Times-Roman", 10);
  doc.text(`${personne.CIN}`, 160, 173);

  doc.image("./image/phone.png", 120, 190, {
    fit: [16, 16],
  });

  doc.font("Times-Italic", 8);
  doc.text(`Téléphone:`, 140, 195);

  doc.font("Times-Roman", 10);
  doc.text(`${personne.CONTACT}`, 177, 195);

  doc.font("Times-Italic", 8);
  doc.text(`Email:`, 230, 195);

  doc.font("Times-Roman", 10);
  doc.text(` ${personne.EMAIL}`, 253, 194);

  doc.image("./image/localisation.png", 120, 210, {
    fit: [16, 16],
  });

  doc.font("Times-Italic", 8);
  doc.text(`Adresse:`, 140, 215);

  doc.font("Times-Roman", 10);
  doc.text(` ${personne.ADRESSE}`, 170, 213);

  doc.image("./image/signature.PNG", 50, 240, {
    fit: [30, 50],
  });

  doc.image("./image/annee.PNG", 300, 270, {
    fit: [100, 150],
  });

  doc.end();
});

// --------------------------------PDF----------------------

app.listen(8080, () => {
  console.log("Your server is ready");
});
