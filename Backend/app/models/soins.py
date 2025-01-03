from django.db import models
from datetime import datetime


class Soin(models.Model):
    id_soin = models.AutoField(primary_key=True)
    date_soin = models.DateTimeField(default=datetime.now)
    SOIN_INFIRMIER_TYPE = (
        ('i', 'injection'),
        ('p', 'pansement'),
        ('s', 'prelevement_sanguin'),
        ('f', 'perfusion'),
    )
    soin_infirmier = models.CharField(
        max_length=1,
        choices=SOIN_INFIRMIER_TYPE,
        blank=True,
        default='i',
    )
    observation_patient = models.TextField(max_length=200)
    # assiciation
    infirmier = models.ForeignKey("app.Infirmier", on_delete=models.SET_NULL, null=True, related_name="soins")
    dpi = models.ForeignKey("app.DPI", on_delete=models.SET_NULL, null=True, related_name="soins")
    

class AdminMedicament(models.Model): # instructions about usage of medicament
    id_admin_medicament = models.AutoField(primary_key=True)
    advice = models.TextField(max_length=1000)
    # relations
    #medicament = models.ForeignKey("app.Medicament", on_delete=models.SET_NULL, null=True)
    soin = models.ForeignKey("app.Soin", on_delete=models.SET_NULL, null=True, related_name="admin_medicament")