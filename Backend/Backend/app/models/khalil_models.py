from django.db import models
from datetime import datetime


class TypeRadio(models.TextChoices):
    IRM = 'IRM'
    ECHOGRAPHIE = 'ECHOGRAPHIE'
    RADIOGRAPHIE = 'RADIOGRAPHIE'
    SCANNER = 'SCANNER'
    AUTRES = 'AUTRES'

class StatutValidationOrdonnance(models.TextChoices):
    EN_ATTENTE = 'EN_ATTENTE'
    VALIDEE = 'VALIDEE'
    REJETEE = 'REJETEE'



class SpecialiteMedicale(models.TextChoices):
    MEDECINE_GENERALE = 'MEDECINE_GENERALE'
    CARDIOLOGIE = 'CARDIOLOGIE'
    PNEUMOLOGIE = 'PNEUMOLOGIE'
    NEUROLOGIE = 'NEUROLOGIE'
    PEDIATRIE = 'PEDIATRIE'
    ONCOLOGIE = 'ONCOLOGIE'
    RADIOLOGIE = 'RADIOLOGIE'
    AUTRE = 'AUTRE'


class TypeCertificat(models.TextChoices):
    ARRET_TRAVAIL = 'ARRET_TRAVAIL'
    APTITUDE = 'APTITUDE'
    INCAPACITE_TEMPORAIRE = 'INCAPACITE_TEMPORAIRE'
    INAPTITUDE = 'INAPTITUDE'
    SUIVI_MEDICAL = 'SUIVI_MEDICAL'
    AUTRE = 'AUTRE'

class Outils(models.TextChoices):
    STETHOSCOPE = 'STETHOSCOPE'
    OTOSCOPE = 'OTOSCOPE'
    THERMOMETRE = 'THERMOMETRE'
    OXYMETRE = 'OXYMETRE'
    AUTRES = 'AUTRES'

class Parametre_biologique(models.TextChoices):
    HEMOGLOBINE = 'HEMOGLOBINE'
    GLYCEMIE = 'GLYCEMIE'
    CHOLESTEROL = 'CHOLESTEROL'
    TRIGLYCERIDES = 'TRIGLYCERIDES'
    ACIDE_URIQUE = 'ACIDE_URIQUE'
    CREATININE = 'CREATININE'
    UREE = 'UREE'
    TSH = 'TSH'
    T4 = 'T4'
    T3 = 'T3'
    PSA = 'PSA'
    CRP = 'CRP'
    FERRITINE = 'FERRITINE'


#---------------------------------------------------------------------------------------------------------------
# MODELES

class Medicament(models.Model):
    id_medicament = models.AutoField(primary_key=True)
    nom_medicament = models.CharField(max_length=100)
    dose = models.CharField(max_length=50)
    duree_traitement = models.CharField(max_length=50)
    ordannance = models.ForeignKey("app.Ordonnance", on_delete=models.SET_NULL, null=True, related_name="medicaments")

class Ordonnance(models.Model):
    id_ordonnance = models.AutoField(primary_key=True)
    date_creation = models.DateTimeField(default=datetime.now)
    validated = models.TextField(choices=StatutValidationOrdonnance.choices)
    diagnostic = models.OneToOneField("app.Diagnostic", on_delete=models.SET_NULL, null=True, related_name="ordonnance")

class Resume(models.Model):
    id_resume = models.AutoField(primary_key=True)
    text = models.TextField()
    antecedents = models.JSONField(default=list)
    consultation = models.OneToOneField("app.Consultation", on_delete=models.SET_NULL, null=True, related_name="resume")

class Diagnostic(models.Model):
    id_diagnostic = models.AutoField(primary_key=True)
    dpi = models.ForeignKey("app.dpi", on_delete=models.SET_NULL, null=True, related_name="diagnostics")
    diagnostic = models.TextField()
    date_creation = models.DateTimeField(default=datetime.now)
    #medecin = models.OneToOneField("app.Medecin", on_delete=models.SET_NULL, null=True)

class Consultation(models.Model):
    id_consultation = models.AutoField(primary_key=True)
    diagnostic = models.ForeignKey(Diagnostic, on_delete=models.SET_NULL, null=True, related_name="consultations")
    date_consultation = models.DateTimeField(default=datetime.now)
    medecin = models.ForeignKey("app.Medecin", on_delete=models.SET_NULL, null=True, related_name="consultations")

class Examen_Consultation(models.Model):
    id_examen_consultation = models.AutoField(primary_key=True)
    outils = models.CharField(max_length=20, choices=Outils.choices)
    description = models.TextField()
    consultation = models.ForeignKey(Consultation, on_delete=models.SET_NULL, null=True, related_name="examens_consultations")

class Bilan_Biologique(models.Model):
    id_bilan_biologique = models.AutoField(primary_key=True)
    date_bilan = models.DateTimeField(default=datetime.now)
    examen_complementaire = models.OneToOneField("app.Examen_Complementaire", on_delete=models.SET_NULL, null=True, related_name="bilan_biologique")
    laboratoire = models.ForeignKey("app.Laboratoire", on_delete=models.SET_NULL, null=True, related_name="bilans_biologiques")

class Resultat_Biologique(models.Model):
    id_resultat = models.AutoField(primary_key=True)
    bilan_biologique = models.ForeignKey(Bilan_Biologique, on_delete=models.SET_NULL, null=True, related_name="resultats_biologiques")
    parametre = models.TextField(choices=Parametre_biologique.choices)
    valeur = models.FloatField()
    unite = models.CharField(max_length=20)

class ImageMedicale(models.Model):
    id_image = models.AutoField(primary_key=True)
    chemin_fichier = models.CharField(max_length=255)
    examen_radiologique = models.OneToOneField("app.Examen_Radiologique", on_delete=models.SET_NULL, null=True, related_name="resultat")

class Bilan_Radiologique(models.Model):
    id_bilan_radiologique = models.AutoField(primary_key=True)
    date_bilan = models.DateTimeField(default=datetime.now)
    examen_complementaire = models.OneToOneField("app.Examen_Complementaire", on_delete=models.SET_NULL, null=True, related_name="bilan_radiologique")

class Examen_Radiologique(models.Model):
    id_examen = models.AutoField(primary_key=True)
    date_examen = models.DateTimeField(default=datetime.now)
    Radiologue = models.ForeignKey("app.Radiologue", on_delete=models.SET_NULL, null=True,related_name="examens_radiologiques")
    TypeRadio = models.TextField(choices=TypeRadio.choices)
    bilan_radiologique = models.ForeignKey(Bilan_Radiologique, on_delete=models.SET_NULL, null=True, related_name="examen_radiologiques")
    compte_rendu = models.ForeignKey("app.Compte_Rendu", on_delete=models.SET_NULL, null=True, related_name="examen_radiologiques")

class Examen_Complementaire(models.Model):
    id_examen_complementaire = models.AutoField(primary_key=True)
    diagnostic = models.ForeignKey(Diagnostic, on_delete=models.SET_NULL, null=True, related_name="examen_Complementaires")
    description = models.TextField()
    
class Compte_Rendu(models.Model):
    id_compte_rendu = models.AutoField(primary_key=True)
    dpi = models.ForeignKey("app.dpi", on_delete=models.SET_NULL, null=True, related_name="compte_rendus")
    date_creation = models.DateTimeField(default=datetime.now)
    radiologue = models.ForeignKey("app.Radiologue", on_delete=models.SET_NULL, null=True, related_name="compte_rendus")
    texte = models.TextField()

class CertificatMedical(models.Model):
    id_certificat = models.AutoField(primary_key=True)
    dpi = models.ForeignKey("app.dpi", on_delete=models.SET_NULL, null=True, related_name="certificats")
    medecin = models.ForeignKey("app.Medecin", on_delete=models.SET_NULL, null=True, related_name="certificats")
    date_emission = models.DateTimeField()
    date_debut_validite = models.DateField()
    date_fin_validite = models.DateField()
    type_certificat = models.CharField(max_length=21, choices=TypeCertificat.choices)
    duree_arret_travail = models.IntegerField()
    recommandations = models.TextField()
    etablissement = models.CharField(max_length=100)
    signature_numerique = models.CharField(max_length=255)
    chemin_fichier = models.CharField(max_length=255)

class Decompte_des_frais(models.Model):
    id_decompte = models.AutoField(primary_key=True)
    date_decompte = models.DateField()
    montant_total = models.FloatField()
    montant_rembourse = models.FloatField()
    montant_a_payer = models.FloatField()
    admin = models.ForeignKey("app.admin", on_delete=models.SET_NULL, null=True, related_name="decomptes")
    hospitalisation = models.ForeignKey("app.Hospitalisation", on_delete=models.SET_NULL, null=True, related_name="decompte")

class Hospitalisation(models.Model):
    id_hospitalisation = models.AutoField(primary_key=True)
    dpi = models.ForeignKey("app.dpi", on_delete=models.SET_NULL, null=True, related_name="hospitalisations")
    date_entree = models.DateField()
    date_sortie = models.DateField()
    nbr_chamisation = models.IntegerField()
    etablissement_hospitalier = models.CharField(max_length=100)


