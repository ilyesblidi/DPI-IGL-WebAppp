interface DPI {
  id_dpi: number;
  date_creation: Date;
  NSS: string;
  mutuelle: string;
  contact_info: string;
  chemin_QR_code: string;
  diagnostic: Diagnostic | null;
  compte_Rendu: CompteRendu | null;
  certificatMedical: CertificatMedical | null;
  hospitalisation: Hospitalisation | null;
  user: Utilisateur | null;
  medecin_traitant: Medecin | null; 
}

interface Diagnostic {
  id_diagnostic: number;
  diagnostic: string;
  date_creation: Date;
  medecin: Medecin | null;
  consultations: Consultation | null;
  ordonnance: Ordonnance | null;
  examen_Complementaire: ExamenComplementaire | null;
}

interface CompteRendu {
  id_compte_rendu: number;
  date_creation: Date;
  radiologue: Radiologue | null;
  texte: string;
  examen_Radiologique: ExamenRadiologique | null;
}

interface CertificatMedical {
  id_certificat: number;
  medecin: Medecin | null;
  date_emission: Date;
  date_debut_validite: Date;
  date_fin_validite: Date;
  type_certificat: TypeCertificat | null;
  duree_arret_travail: number;
  recommandations: string;
  etablissement: string;
  signature_numerique: string;
  chemin_fichier: string;
}

interface Hospitalisation {
  id_hospitalisation: number;
  date_entree: Date;
  date_sortie: Date;
  nbr_chamisation: number;
  etablissement_hospitalier: string;
  decompte_des_frais: DecompteDesFrais | null;
}

interface Soin {
  id_soin: number;
  date_soin: Date;
  soin_infirmier: SoinInfirmierType | null;
  observation_patient: string;
  infirmier: Infirmier | null;
  dpi: DPI | null;
}

interface Medicament {
  id_medicament: number;
  nom_medicament: string;
  dose: string;
  duree_traitement: string;
}

interface Ordonnance {
  id_ordonnance: number;
  date_creation: Date;
  validated: StatutValidationOrdonnance | null;
  medicaments: Medicament | null;
}

interface ExamenConsultation {
  id_examen_consultation: number;
  outils: Outils;
  description: string;
}

interface Resume {
  id_resume: number;
  text: string;
  antecedents: any[];
}

interface Consultation {
  id_consultation: number;
  date_consultation: Date;
  resume_consultation: Resume | null;
  examen_consultation: ExamenConsultation | null;
}

interface ResultatBiologique {
  id_resultat: number;
  parametre: ParametreBiologique | null;
  valeur: number;
  unite: string;
}

interface BilanBiologique {
  id_bilan_biologique: number;
  date_bilan: Date;
  laboratoire: Laboratoire | null;
  resultats: ResultatBiologique | null;
}

interface ImageMedicale {
  id_image: number;
  chemin_fichier: string;
}

interface ExamenRadiologique {
  id_examen: number;
  resultat: ImageMedicale | null;
  date_examen: Date;
  radiologue: Radiologue | null;
  TypeRadio: TypeRadio | null;
}

interface BilanRadiologique {
  id_bilan_radiologique: number;
  date_bilan: Date;
  examens: ExamenRadiologique | null;
}

interface ExamenComplementaire {
  id_examen_complementaire: number;
  description: string;
  bilan_Biologique: BilanBiologique | null;
  bilan_Radiologique: BilanRadiologique | null;
}

interface DecompteDesFrais {
  id_decompte: number;
  date_decompte: Date;
  montant_total: number;
  montant_rembourse: number;
  montant_a_payer: number;
  admin: Admin | null;
}

interface Utilisateur {
  email: string;
  birth_date: Date | null;
  phone: string;
  adresse: string;
  role: Role;
  groups: string[];
  user_permissions: string[];
}

interface Medecin {
  user: Utilisateur | null;
}

interface Infirmier {
  user: Utilisateur | null;
}

interface Laboratoire {
  user: Utilisateur | null;
}

interface Radiologue {
  user: Utilisateur | null;
}

interface Admin {
  user: Utilisateur | null;
}

// Enumerations
type SoinInfirmierType = 'i' | 'p' | 's' | 'f';
type StatutValidationOrdonnance = 'EN_ATTENTE' | 'VALIDEE' | 'REJETEE';
type Outils = 'STETHOSCOPE' | 'OTOSCOPE' | 'THERMOMETRE' | 'OXYMETRE' | 'AUTRES';
type ParametreBiologique = 'HEMOGLOBINE' | 'GLYCEMIE' | 'CHOLESTEROL' | 'TRIGLYCERIDES' | 'ACIDE_URIQUE' | 'CREATININE' | 'UREE' | 'TSH' | 'T4' | 'T3' | 'PSA' | 'CRP' | 'FERRITINE';
type TypeRadio = 'IRM' | 'ECHOGRAPHIE' | 'RADIOGRAPHIE' | 'SCANNER' | 'AUTRES';
type TypeCertificat = 'ARRET_TRAVAIL' | 'APTITUDE' | 'INCAPACITE_TEMPORAIRE' | 'INAPTITUDE' | 'SUIVI_MEDICAL' | 'AUTRE';
type Role = 'admin' | 'patient' | 'medecin' | 'infirmier' | 'radiologue' | 'laborantin';
