from django.db import models
from .users import Utilisateur, Medecin
from .khalil_models import Diagnostic, Compte_Rendu, CertificatMedical, Hospitalisation
from .soins import Soin
from datetime import datetime


class DPI(models.Model):
    id_dpi = models.AutoField(primary_key=True)
    date_creation = models.DateTimeField(default=datetime.now)
    nss = models.CharField(max_length=30)
    mutuelle = models.CharField(max_length=100)
    contact_info = models.CharField(max_length=100)
    #chemin_QR_code = models.CharField(max_length=255) # to be updated

    # relations with users
    user = models.OneToOneField(Utilisateur, on_delete=models.SET_NULL, null=True)
    medecin_traitant = models.ForeignKey(Medecin, on_delete=models.SET_NULL, null=True, related_name='dpis')
    
    
        
    
    