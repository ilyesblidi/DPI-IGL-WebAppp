from django.contrib import admin
from .models import Utilisateur, Infirmier, DPI, Soin

# Register your models here.
admin.site.register(Utilisateur)
admin.site.register(DPI)
admin.site.register(Soin)
admin.site.register(Infirmier)