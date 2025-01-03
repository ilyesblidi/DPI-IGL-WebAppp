from rest_framework import serializers
from app.models import *

class UtilisateurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Utilisateur
        fields = '__all__'
        extra_kwargs = {'username': {'required': False}}

class MedecinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medecin
        fields = '__all__'

class InfirmierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Infirmier
        fields = '__all__'

class LaboratoireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Laboratoire
        fields = '__all__'

class RadiologueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Radiologue
        fields = '__all__'

class adminSerializer(serializers.ModelSerializer):
    class Meta:
        model = admin
        fields = '__all__'

class MedicamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicament
        fields = '__all__'

class OrdonnanceSerializer(serializers.ModelSerializer):
    medicaments = MedicamentSerializer(many=True, read_only=True)
    class Meta:
        model = Ordonnance
        fields = '__all__'

class Examen_ConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Examen_Consultation
        fields = '__all__'

class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = '__all__'

class ConsultationSerializer(serializers.ModelSerializer):
    resume = ResumeSerializer(read_only=True)  # Nested one-to-one relationship
    examens_consultations = Examen_ConsultationSerializer(many=True, read_only=True)
    class Meta:
        model = Consultation
        fields = '__all__'
        extra_kwargs = {
            'medecin': {'required': False}
            }


class Resultat_BiologiqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resultat_Biologique
        fields = '__all__'

class Bilan_BiologiqueSerializer(serializers.ModelSerializer):
    resultats_biologiques = Resultat_BiologiqueSerializer(many=True, read_only=True)
    class Meta:
        model = Bilan_Biologique
        fields = '__all__'

class ImageMedicaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageMedicale
        fields = '__all__'

class Examen_RadiologiqueSerializer(serializers.ModelSerializer):
    resultat = ImageMedicaleSerializer(read_only=True)
    class Meta:
        model = Examen_Radiologique
        fields = '__all__'

class Bilan_RadiologiqueSerializer(serializers.ModelSerializer):
    examen_radiologiques = Examen_RadiologiqueSerializer(many=True, read_only=True)
    class Meta:
        model = Bilan_Radiologique
        fields = '__all__'

class Examen_ComplementaireSerializer(serializers.ModelSerializer):
    bilan_biologique = Bilan_BiologiqueSerializer(read_only=True)
    bilan_radiologique = Bilan_RadiologiqueSerializer(read_only=True)
    class Meta:
        model = Examen_Complementaire
        fields = '__all__'

class DiagnosticSerializer(serializers.ModelSerializer):
    ordanance = OrdonnanceSerializer(read_only=True)
    consultation = ConsultationSerializer(read_only=True)
    Examen_Complementaire = Examen_ComplementaireSerializer(read_only=True)
    class Meta:
        model = Diagnostic
        fields = '__all__'
        extra_kwargs = {
            'Diagnostic': {'required': False},
            'ordanance': {'required': False},
            }

class Compte_RenduSerializer(serializers.ModelSerializer):
    examen_radiologiques = Examen_RadiologiqueSerializer(many=True, read_only=True)
    class Meta:
        model = Compte_Rendu
        fields = '__all__'

class CertificatMedicalSerializer(serializers.ModelSerializer):
    class Meta:
        model = CertificatMedical
        fields = '__all__'

class Decompte_des_fraisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Decompte_des_frais
        fields = '__all__'

class HospitalisationSerializer(serializers.ModelSerializer):
    decompte = Decompte_des_fraisSerializer(read_only=True)
    class Meta:
        model = Hospitalisation
        fields = '__all__'

class SoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Soin
        fields = '__all__'

class DPISerializer(serializers.ModelSerializer):
    class Meta:
        model = DPI
        fields = '__all__'


