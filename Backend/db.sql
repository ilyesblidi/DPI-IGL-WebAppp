CREATE TABLE `Consultation` (
  `id_consultation` int PRIMARY KEY,
  `numero_securite_sociale` varchar(15),
  `date_consultation` datetime,
  `medecin` varchar(100),
  `resume_consultation` text,
  `antecedents` text
);


CREATE TABLE `Ordonnance` (
  `id_ordonnance` int PRIMARY KEY,
  `id_consultation` int,
  `date_prescription` date
);

CREATE TABLE `Medicament` (
  `id_medicament` int PRIMARY KEY,
  `id_ordonnance` int,
  `nom_medicament` varchar(100),
  `dose` varchar(50),
  `duree_traitement` varchar(50)
);

CREATE TABLE `Examen` (
  `id_examen` int PRIMARY KEY,
  `id_consultation` int,
  `type_examen` ENUM ('BIOLOGIQUE', 'RADIOLOGIQUE'),
  `resultat` text,
  `date_examen` date
);

CREATE TABLE `ResultatBiologique` (
  `id_resultat` int PRIMARY KEY,
  `id_examen` int,
  `parametre` varchar(50),
  `valeur` float,
  `unite` varchar(20)
);

CREATE TABLE `ImageMedicale` (
  `id_image` int PRIMARY KEY,
  `id_examen` int,
  `chemin_fichier` varchar(255),
  `type_image` ENUM ('IRM', 'ECHOGRAPHIE', 'RADIOGRAPHIE', 'SCANNER', 'AUTRES')
);

CREATE TABLE `Soin` (
  `id_soin` int PRIMARY KEY,
  `numero_securite_sociale` varchar(15),
  `date_soin` datetime,
  `infirmier` varchar(100),
  `description_soin` text,
  `observation_patient` text
);

CREATE TABLE `DistributionMedicament` (
  `id_distribution` int PRIMARY KEY,
  `id_ordonnance` int,
  `pharmacien` varchar(100),
  `date_distribution` datetime,
  `statut_validation` ENUM ('EN_ATTENTE', 'VALIDEE', 'REJETEE')
);

CREATE TABLE `Utilisateur` (
  `id_utilisateur` int PRIMARY KEY,
  `nom` varchar(50),
  `prenom` varchar(50),
  `email` varchar(100) UNIQUE,
  `mot_de_passe` varchar(255),
  `type_utilisateur` ENUM ('ADMINISTRATIF', 'MEDECIN', 'INFIRMIER', 'PHARMACIEN', 'LABORATOIRE', 'RADIOLOGUE', 'PATIENT', 'ADMINISTRATEUR'),
  `date_creation` datetime,
  `derniere_connexion` datetime,
  `actif` boolean
);

CREATE TABLE `Medecin` (
  `id_medecin` int PRIMARY KEY,
  `id_utilisateur` int UNIQUE,
  `numero_ordre` varchar(50) UNIQUE,
  `specialite` ENUM ('MEDECINE_GENERALE', 'CARDIOLOGIE', 'PNEUMOLOGIE', 'NEUROLOGIE', 'PEDIATRIE', 'ONCOLOGIE', 'RADIOLOGIE', 'AUTRE'),
  `etablissement` varchar(100),
  `telephone` varchar(20)
);

CREATE TABLE `Infirmier` (
  `id_infirmier` int PRIMARY KEY,
  `id_utilisateur` int UNIQUE,
  `service` varchar(100),
  `qualification` varchar(100)
);

CREATE TABLE `Pharmacien` (
  `id_pharmacien` int PRIMARY KEY,
  `id_utilisateur` int UNIQUE,
  `etablissement` varchar(100),
  `service` varchar(100)
);

CREATE TABLE `Laboratoire` (
  `id_laboratoire` int PRIMARY KEY,
  `id_utilisateur` int UNIQUE,
  `nom_etablissement` varchar(100),
  `specialisation` varchar(100)
);

CREATE TABLE `Radiologue` (
  `id_radiologue` int PRIMARY KEY,
  `id_utilisateur` int UNIQUE,
  `etablissement` varchar(100),
  `qualification` varchar(100)
);

CREATE TABLE `Patient` (
  `numero_securite_sociale` varchar(15) PRIMARY KEY,
  `id_utilisateur` int UNIQUE,
  `nom` varchar(50),
  `prenom` varchar(50),
  `date_naissance` date,
  `adresse` varchar(200),
  `telephone` varchar(20),
  `mutuelle` varchar(100),
  `medecin_traitant` varchar(100),
  `personne_contact_nom` varchar(100),
  `personne_contact_telephone` varchar(20)
);

CREATE TABLE `DossierPatientInformatise` (
  `id_dpi` int PRIMARY KEY,
  `numero_securite_sociale` varchar(15),
  `date_creation` datetime,
  `date_derniere_mise_a_jour` datetime,
  `statut` ENUM ('OUVERT', 'EN_COURS', 'CLOTURE', 'ARCHIVE', 'SUSPENDU'),
  `medecin_referent_id` int,
  `etablissement_hospitalier` varchar(100),
  `numero_dossier_hospitalier` varchar(50) UNIQUE,
  `commentaire_administratif` text,
  `date_derniere_consultation` date,
  `niveau_risque` varchar(20),
  `consentement_partage` boolean,
  `langue_communication` varchar(50),
  `qr_code` varchar(255),
  `chemin_qr_code` varchar(255),
  `date_generation_qr_code` datetime
);

CREATE TABLE `HistoriqueModificationDPI` (
  `id_historique` int PRIMARY KEY,
  `id_dpi` int,
  `id_utilisateur` int,
  `date_modification` datetime,
  `type_modification` varchar(50),
  `details_modification` text,
  `ip_modification` varchar(45)
);

CREATE TABLE `DocumentAdministratif` (
  `id_document` int PRIMARY KEY,
  `id_dpi` int,
  `type_document` varchar(50),
  `chemin_fichier` varchar(255),
  `date_ajout` datetime,
  `utilisateur_ajout_id` int
);

CREATE TABLE `CertificatMedical` (
  `id_certificat` int PRIMARY KEY,
  `id_dpi` int,
  `id_medecin` int,
  `numero_securite_sociale` varchar(15),
  `date_emission` datetime,
  `date_debut_validite` date,
  `date_fin_validite` date,
  `type_certificat` ENUM ('ARRET_TRAVAIL', 'APTITUDE', 'INCAPACITE_TEMPORAIRE', 'INAPTITUDE', 'SUIVI_MEDICAL', 'AUTRE'),
  `statut_certificat` ENUM ('ACTIF', 'EXPIRE', 'ANNULE', 'BROUILLON', 'VALIDE', 'SUSPENDU'),
  `motif` text,
  `duree_arret_travail` int,
  `pourcentage_incapacite` decimal(5,2),
  `recommandations` text,
  `numero_ordre_medecin` varchar(50),
  `etablissement` varchar(100),
  `signature_numerique` varchar(255),
  `chemin_fichier` varchar(255)
);

ALTER TABLE `CertificatMedical` ADD FOREIGN KEY (`id_dpi`) REFERENCES `DossierPatientInformatise` (`id_dpi`);

ALTER TABLE `CertificatMedical` ADD FOREIGN KEY (`id_medecin`) REFERENCES `Medecin` (`id_medecin`);

ALTER TABLE `CertificatMedical` ADD FOREIGN KEY (`numero_securite_sociale`) REFERENCES `Patient` (`numero_securite_sociale`);

ALTER TABLE `DossierPatientInformatise` ADD FOREIGN KEY (`numero_securite_sociale`) REFERENCES `Patient` (`numero_securite_sociale`);

ALTER TABLE `DossierPatientInformatise` ADD FOREIGN KEY (`medecin_referent_id`) REFERENCES `Medecin` (`id_medecin`);

ALTER TABLE `HistoriqueModificationDPI` ADD FOREIGN KEY (`id_dpi`) REFERENCES `DossierPatientInformatise` (`id_dpi`);

ALTER TABLE `HistoriqueModificationDPI` ADD FOREIGN KEY (`id_utilisateur`) REFERENCES `Utilisateur` (`id_utilisateur`);

ALTER TABLE `DocumentAdministratif` ADD FOREIGN KEY (`id_dpi`) REFERENCES `DossierPatientInformatise` (`id_dpi`);

ALTER TABLE `DocumentAdministratif` ADD FOREIGN KEY (`utilisateur_ajout_id`) REFERENCES `Utilisateur` (`id_utilisateur`);

ALTER TABLE `Medecin` ADD FOREIGN KEY (`id_utilisateur`) REFERENCES `Utilisateur` (`id_utilisateur`);

ALTER TABLE `Infirmier` ADD FOREIGN KEY (`id_utilisateur`) REFERENCES `Utilisateur` (`id_utilisateur`);

ALTER TABLE `Pharmacien` ADD FOREIGN KEY (`id_utilisateur`) REFERENCES `Utilisateur` (`id_utilisateur`);

ALTER TABLE `Laboratoire` ADD FOREIGN KEY (`id_utilisateur`) REFERENCES `Utilisateur` (`id_utilisateur`);

ALTER TABLE `Radiologue` ADD FOREIGN KEY (`id_utilisateur`) REFERENCES `Utilisateur` (`id_utilisateur`);

ALTER TABLE `Patient` ADD FOREIGN KEY (`id_utilisateur`) REFERENCES `Utilisateur` (`id_utilisateur`);

ALTER TABLE `Consultation` ADD FOREIGN KEY (`numero_securite_sociale`) REFERENCES `Patient` (`numero_securite_sociale`);

ALTER TABLE `Ordonnance` ADD FOREIGN KEY (`id_consultation`) REFERENCES `Consultation` (`id_consultation`);

ALTER TABLE `Medicament` ADD FOREIGN KEY (`id_ordonnance`) REFERENCES `Ordonnance` (`id_ordonnance`);

ALTER TABLE `Examen` ADD FOREIGN KEY (`id_consultation`) REFERENCES `Consultation` (`id_consultation`);

ALTER TABLE `ResultatBiologique` ADD FOREIGN KEY (`id_examen`) REFERENCES `Examen` (`id_examen`);

ALTER TABLE `ImageMedicale` ADD FOREIGN KEY (`id_examen`) REFERENCES `Examen` (`id_examen`);

ALTER TABLE `Soin` ADD FOREIGN KEY (`numero_securite_sociale`) REFERENCES `Patient` (`numero_securite_sociale`);

ALTER TABLE `DistributionMedicament` ADD FOREIGN KEY (`id_ordonnance`) REFERENCES `Ordonnance` (`id_ordonnance`);
