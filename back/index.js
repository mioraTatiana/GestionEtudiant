import express from "express";
import mysql from "mysql";
import cors from "cors";
import multer from "multer";
import path from "path";
import PDFDocument from "pdfkit";
import fs from "fs";
import moment from "moment";
import nodemailer from "nodemailer"


const app = express();
app.use(cors());
app.use(express.json());

//  ----------------------

const storage = multer.diskStorage({
  designation: (req, file, cb) => {
    db(null, "public/image");
  },

  filename: (req, file, cb) => {
    db(null, file.fieldname + "_" + Date.now() + path.extname(fileorginalname));
  },
});

const upload = multer({
  Storage: storage,
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

app.post("/etudiant/create1", upload.single("image"), (req, res) => {
  console.log(req.file);
  const image = req.file.filename;
  const sql = "INSERT INTO etudiant (photo) VALUES (?)";
  db.query(sql, [image], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

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
    matricule: req.body.matricule,
    parcours: req.body.parcours,
    niveau: req.body.niveau,
    nomEtudiant: req.body.nom,
    prenomEtudiant: req.body.prenom,
    dateNaissance: req.body.dateNaissance,
    lieuNaissance: req.body.lieuNaissance,
    situationMatri: req.body.situation,
    cin: req.body.cin,
    adresse: req.body.adresse,
    contact: req.body.telephone,
    email: req.body.email,
    status: req.body.status,
    serieBac:req.body.serie,
    anneeScolaire:req.body.anneeScolaire,
    resultat:req.body.resultat,
    anneeUnivCursus:req.body.anneeUnivCursus,
    univ: req.body.univ,
    niveauCursus: req.body.niveauCursus,
    parcoursCursus:req.body.parcoursCursus,
    mentionCursus:req.body.mentionCursus,
    nomPere: req.body.nomPere,
    nomMere: req.body.nomMere,
    nomTuteur: req.body.nomTuteur,
    adressePere: req.body.adressePere,
    adresseMere: req.body.adresseMere,
    adresseTuteur: req.body.adresseTuteur,
    professionPere: req.body.professionPere,
    professionMere: req.body.professionMere,
    professionTuteur: req.body.professionTuteur,
    contactPere: req.body.contactPere,
    contactMere: req.body.contactMere,
    contactTuteur: req.body.contactTuteur,
  };

  const valeur = Object.values(etudiant);

  const sql = "INSERT INTO `etudiant`(`MATRICULE`, `ID_PARCOURS`, `ID_NIVEAU`, `NOM_ETUDIANT`, `PRENOM_ETUDIANT`, `DATENAISSANCE`, `LIEUNAISSANCE`, `SITUATION_MATRI`, `CIN`, `ADRESSE`, `CONTACT`, `EMAIL`, `PHOTO`, `STATUS`, `serieBac`, `anneeScolaire`, `resultat`, `anneeUnivCursus`, `univ`, `niveauCursus`, `parcoursCursus`, `mentionCursus`, `NOMETPRENOM_PERE`, `NOMETPRENOM_MERE`, `NOMETPRENOM_TUTEUR`, `ADRESSE_PERE`, `ADRESSE_MERE`, `ADRESSE_TUTEUR`, `PROFESSION_PERE`, `PROFESSION_MERE`, `PROFESSION_TUTEUR`, `CONTACT_PERE`, `CONTACT_MERE`, `CONTACT_TUTEUR`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

  db.query(sql, valeur, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.put("/etudiant/update", (req, res) => {
  const etudiant = {
    matricule: req.body.matricule,
    parcours: req.body.parcours,
    niveau: req.body.niveau,
    nomEtudiant: req.body.nom,
    prenomEtudiant: req.body.prenom,
    dateNaissance: req.body.dateNaissance,
    lieuNaissance: req.body.lieuNaissance,
    situationMatri: req.body.situation,
    cin: req.body.cin,
    adresse: req.body.adresse,
    contact: req.body.telephone,
    email: req.body.email,
    status: req.body.status,
    serieBac:req.body.serie,
    anneeScolaire:req.body.anneeScolaire,
    resultat:req.body.resultat,
    anneeUnivCursus:req.body.anneeUnivCursus,
    univ: req.body.univ,
    niveauCursus: req.body.niveauCursus,
    parcoursCursus:req.body.parcoursCursus,
    mentionCursus:req.body.mentionCursus,
    nomPere: req.body.nomPere,
    nomMere: req.body.nomMere,
    nomTuteur: req.body.nomTuteur,
    adressePere: req.body.adressePere,
    adresseMere: req.body.adresseMere,
    adresseTuteur: req.body.adresseTuteur,
    professionPere: req.body.professionPere,
    professionMere: req.body.professionMere,
    professionTuteur: req.body.professionTuteur,
    contactPere: req.body.contactPere,
    contactMere: req.body.contactMere,
    contactTuteur: req.body.contactTuteur,
  };

  const valeur = Object.values(etudiant);

  const sql =
    "UPDATE `etudiant` SET `ID_PARCOURS`=?,`ID_NIVEAU`=?,`NOM_ETUDIANT`=?,`PRENOM_ETUDIANT`=?,`DATENAISSANCE`=?,`LIEUNAISSANCE`=?,`SITUATION_MATRI`=?,`CIN`=?,`ADRESSE`=?,`CONTACT`=?,`EMAIL`=?,`STATUS`=?,`serieBac`=?,`anneeScolaire`=?,`resultat`=?,`anneeUnivCursus`=?,`univ`=?,`niveauCursus`=?,`parcoursCursus`=?,`mentionCursus`=?,`NOMETPRENOM_PERE`=?,`NOMETPRENOM_MERE`=?,`NOMETPRENOM_TUTEUR`=?,`ADRESSE_PERE`=?,`ADRESSE_MERE`=?,`ADRESSE_TUTEUR`=?,`PROFESSION_PERE`=?,`PROFESSION_MERE`=?,`PROFESSION_TUTEUR`=?,`CONTACT_PERE`=?,`CONTACT_MERE`=?,`CONTACT_TUTEUR`=? WHERE `MATRICULE`=?";

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
  const inscriptionDate = Date.now;
  const dateFormat = moment(inscriptionDate).format("DD/MM/YYYY");

  const inscription = {
    matricule: req.body.matricule,
    dateInscription: dateFormat,
    parcours: req.body.Parcours,
    niveau: req.body.niveau,
    anneeUniv: req.body.annee,
    bordereau: req.body.numero,
    datePaiement: req.body.datePaiement,
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
app.get("/pdf", (req, res) => {
  const sql = "SELECT * FROM etudiant WHERE MATRICULE=?";
  const Matricule = req.body.matricule;
  db.query(sql, [Matricule], (err, data) => {
    if (err) {
      return res.json({ error: err.message });
    } else if (data.length === 0) {
      return res.json({
        message: "Aucune donnée d'étudiant trouvée dans la base de données",
      });
    } else {
      const etudiant = data[0]; // Accéder aux données du premier étudiant
      const NaissanceDate = etudiant.DATENAISSANCE;
      const dateFormat = moment(NaissanceDate).format("DD/MM/YYYY");

      const personne = {
        MATRICULE: etudiant.MATRICULE,
        ID_PARCOURS: etudiant.ID_PARCOURS,
        ID_NIVEAU: etudiant.ID_NIVEAU,
        NOM_ETUDIANT: etudiant.NOM_ETUDIANT,
        PRENOM_ETUDIANT: etudiant.PRENOM_ETUDIANT,
        DATENAISSANCE: dateFormat,
        LIEUNAISSANCE: etudiant.LIEUNAISSANCE,
        CIN: etudiant.CIN,
        ADRESSE: etudiant.ADRESSE,

        CONTACT: etudiant.CONTACT,
        EMAIL: etudiant.EMAIL,
      };

      const doc = new PDFDocument({
        size: "A6",
        layout: "landscape",
      });
      doc.pipe(fs.createWriteStream(`./uploads/${personne.MATRICULE}.pdf`));
      doc.pipe(res);

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
      doc.text(`0${personne.CONTACT}`, 177, 195);

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
    }
  });
});

// --------------------------------PDF------------------------------

//-------------------------------MAIL-------------------------------
app.get("/mail", (req, res) => {
  const requette =
    "SELECT etudiant.`MATRICULE`, inscription.`ID_PARCOURS`, inscription.`ID_NIVEAU`, `NOM_ETUDIANT`, `PRENOM_ETUDIANT`, `EMAIL`, `DATE_INSCRIPTION`,`ANNEEUNIV`, NOM_NIVEAU, NOM_PARCOURS FROM `etudiant`,`inscription`, `niveau`,`parcours`WHERE etudiant.MATRICULE= inscription.MATRICULE AND inscription.ID_NIVEAU = niveau.ID_NIVEAU AND parcours.ID_PARCOURS=inscription.ID_PARCOURS AND etudiant.MATRICULE=?;";
  const matricule = req.body.matricule;
  db.query(requette, [matricule], (err, data) => {
    if (err) {
      return res.json({ error: err.message });
    } else if (data.length === 0) {
      return res.json({
        message: "Aucune donnée d'étudiant trouvée dans la base de données",
      });
    } else {
      const etudiant = data[0]; // Accéder aux données du premier étudiant
      const dateInscription = etudiant.DATE_INSCRIPTION;
      const dateFormat = moment(dateInscription).format("DD/MM/YYYY");

      const personne = {
        MATRICULE: etudiant.MATRICULE,
        ID_PARCOURS: etudiant.NOM_PARCOURS,
        ID_NIVEAU: etudiant.NOM_NIVEAU,
        NOM_ETUDIANT: etudiant.NOM_ETUDIANT,
        PRENOM_ETUDIANT: etudiant.PRENOM_ETUDIANT,
        ANNEE: etudiant.ANNEEUNIV,
        EMAIL: etudiant.EMAIL,
        INSCRIPTIONDATE: dateFormat,
      };

      const htmlMail = `<p style="text-align: center;"><b>Bonjour ${personne.NOM_ETUDIANT} ${personne.PRENOM_ETUDIANT} ! </b> </p><p>Nous tenons à vous informer que vous avez été inscrit avec succès à l\'établissement Ecole Nationale d\'Informatique en année universitaire ${personne.ANNEE} à ce jour le ${personne.INSCRIPTIONDATE} </p><ul><li><b>Mention</b> : Informatique</li><li><b>Parcours</b> : ${personne.ID_PARCOURS}</li><li><b>Niveau</b> : ${personne.ID_NIVEAU} </li></ul><p>Nous vous envoyons ci-joint votre carte d\'étudiant en format PDF à imprimer.</p><p>Nous vous communiquerons dans le plus bref délai la date de rentrée universitaire.</p><p>Si vous avez besoin de plus d\'informations, veuillez nous contacter par mail ou veuillez vous renseigner à la scolarité de l\'ENI en mentionnant votre numéro matricule ${personne.MATRICULE} .</p>`;

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "eni.inscriptions@gmail.com",
          pass: "beab rdcj exin gpjx",
        },
      });

      let mailOptions = {
        from: "eni.inscriptions@gmail.com",
        to: personne.EMAIL,
        subject: "Inscription",
        html: htmlMail,
        attachments: [
          {
            filename: `${personne.MATRICULE}.pdf`,
            path: `./uploads/${personne.MATRICULE}.pdf`,
          },
        ],
        //changer Destinataire, Sujet et Text
      };

      // Envoyer l'e-mail
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email envoyé: " + info.response);
        }
      });
    }
  });
});

//-------------------------------MAIL-------------------------------

app.listen(8080, () => {
  console.log("Your server is ready");
});
