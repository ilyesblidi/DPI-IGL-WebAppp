from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.serializers.khalil_serializers import *
from app.models import *
from rest_framework.generics import ListAPIView
from rest_framework.exceptions import ValidationError, PermissionDenied
from django.shortcuts import get_object_or_404
from rest_framework import status
from app.permissions import *


@api_view(['POST'])
def ajout_ExamenComplementaire(request):
    #request must have the id of the current diagnostic and the examen complementaire attributes
    if request.user.role != 'medecin' and request.user.role != 'radiologue' and request.user.role != 'laborantin':
            return Response({"detail": "Only medecins/radiologues/laborantins can create examen complementaire"}, status=403)
    diagnostic_id = request.data['diagnostic']
    if not diagnostic_id:
        return Response("id_diagnostic is required", status=400)
    
    try:
        diagnostic = Diagnostic.objects.get(id_diagnostic=diagnostic_id)
    except Diagnostic.DoesNotExist:
        return Response(f"Diagnostic with id {diagnostic_id} does not exist", status=404)
    
    examen_complementaire = request.data
    serializer = Examen_ComplementaireSerializer(data=examen_complementaire)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

class ExamenComplementaireListView(ListAPIView):
    serializer_class = Examen_ComplementaireSerializer
    def check_permissions(self, request, is_patient=False, islaborantin=False, is_medecin=False, isradioloque=False):
        if is_patient and request.user.role != "patient":
            if is_medecin and request.user.role != "medecin":
               if isradioloque and request.user.role != "radiologue":
                     if islaborantin and request.user.role != "laborantin":
                         raise PermissionDenied("You must be a patient/medcin/radiologue/laboratoire to access this.")
    def post(self, request, *args, **kwargs):
        self.check_permissions(request, isPatient, isLaborantin, isMedecin, isRadioloque)
        id_diagnostic = request.data.get('diagnostic')
        if not id_diagnostic:
            raise ValidationError({"error": "id_diagnostic is required"})
        
        examens_complementaires = Examen_Complementaire.objects.filter(diagnostic=id_diagnostic)
        if not examens_complementaires.exists():
            return Response({"message": "No examens complementaires found for the given diagnostic_id"}, status=404)

        serializer = self.get_serializer(examens_complementaires, many=True)
        return Response(serializer.data)
    
    def put(self, request, *args, **kwargs):
        self.check_permissions(request, isLaborantin, isMedecin, isRadioloque)
        id_examen_complementaire = request.data.get('id_examen_complementaire')
        if not id_examen_complementaire:
            raise ValidationError({"error": "id_examen_complementaire is required"})
        
        examen_complementaire = get_object_or_404(Examen_Complementaire, id_examen_complementaire=id_examen_complementaire)
        serializer = self.get_serializer(examen_complementaire, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
    def delete(self, request, *args, **kwargs):
        self.check_permissions(request, isLaborantin, isMedecin, isRadioloque)
        id_examen_complementaire = request.data.get('id_examen_complementaire')
        if not id_examen_complementaire:
            raise ValidationError({"error": "id_examen_complementaire is required"})
        
        examen_complementaire = get_object_or_404(Examen_Complementaire, id_examen_complementaire=id_examen_complementaire)
        examen_complementaire.delete()
        return Response({"message": "Examen complementaire deleted successfully"}, status=204)

    


@api_view(['POST'])
def ajout_Bilan_Biologique(request):
    #request must have the id of the current examen complementaire and the bilan biologique attributes
    if request.user.role != 'laborantin':
            return Response({"detail": "Only laborantins can create bilan biologique"}, status=403)
    examen_comp_id = request.data['examen_complementaire']
    if not examen_comp_id:
        return Response("id_examen_complementaire is required", status=400)
    try:
        examen_complementaire = Examen_Complementaire.objects.get(id_examen_complementaire=examen_comp_id)
    except Examen_Complementaire.DoesNotExist:
        return Response(f"Examen complementaire with id {examen_comp_id} does not exist", status=404)
    
    try:
        laborantin = Laboratoire.objects.get(user=request.user)
    except laborantin.DoesNotExist:
        return Response({"detail": "Logged-in user is not associated with a laboratoire profile"}, status=403)
    
    bilan_biologique = request.data
    bilan_biologique['laboratoire'] = laborantin.id
    serializer = Bilan_BiologiqueSerializer(data=bilan_biologique)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['POST'])
def ajout_Resultat_Biologique(request):
    #request must have the id of the current bilan biologique and the resultat biologique attributes
    if request.user.role != 'laborantin':
            return Response({"detail": "Only laborantins can create resultat biologique"}, status=403)
    
    bilan_biologique_id = request.data['bilan_biologique']
    if not bilan_biologique_id:
        return Response("id_bilan_biologique is required", status=400)
    try:
        bilan_biologique = Bilan_Biologique.objects.get(id_bilan_biologique=bilan_biologique_id)
    except Bilan_Biologique.DoesNotExist:
        return Response(f"Bilan biologique with id {bilan_biologique_id} does not exist", status=404)
    
    resultat_biologique = request.data
    serializer = Resultat_BiologiqueSerializer(data=resultat_biologique)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

class BilanBiologiqueListView(ListAPIView):
    serializer_class = Bilan_BiologiqueSerializer
    def check_permissions(self, request, is_patient=False, islaborantin=False, is_medecin=False):
        if is_patient and request.user.role != "patient":
            if is_medecin and request.user.role != "medecin":
                if islaborantin and request.user.role != "laborantin":
                     raise PermissionDenied("You must be a patient/medcin/radiologue/laboratoire to access this.")
    def post(self, request, *args, **kwargs):
        self.check_permissions(request, isPatient, isLaborantin, isMedecin)
        id_examen_complementaire = request.data.get('examen_complementaire')
        if not id_examen_complementaire:
            raise ValidationError({"error": "id_examen_complementaire is required"})
        
        bilans_biologiques = Bilan_Biologique.objects.filter(examen_complementaire=id_examen_complementaire)
        if not bilans_biologiques.exists():
            return Response({"message": "No bilans biologiques found for the given examen_complementaire_id"}, status=404)

        serializer = self.get_serializer(bilans_biologiques, many=True)
        return Response(serializer.data)
    
    def put(self, request, *args, **kwargs):
        self.check_permissions(request, isLaborantin)
        id_bilan_biologique = request.data.get('id_bilan_biologique')
        if not id_bilan_biologique:
            raise ValidationError({"error": "id_bilan_biologique is required"})
        
        bilan_biologique = get_object_or_404(Bilan_Biologique, id_bilan_biologique=id_bilan_biologique)
        serializer = self.get_serializer(bilan_biologique, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
    def delete(self, request, *args, **kwargs):
        self.check_permissions(request, isLaborantin)
        id_bilan_biologique = request.data.get('id_bilan_biologique')
        if not id_bilan_biologique:
            raise ValidationError({"error": "id_bilan_biologique is required"})
        
        bilan_biologique = get_object_or_404(Bilan_Biologique, id_bilan_biologique=id_bilan_biologique)
        bilan_biologique.delete()
        return Response({"message": "Bilan biologique deleted successfully"}, status=204)
    
class ResultatBiologiqueListView(ListAPIView):
    serializer_class = Resultat_BiologiqueSerializer
    def check_permissions(self, request, is_patient=False, islaborantin=False, is_medecin=False):
        if is_patient and request.user.role != "patient":
            if is_medecin and request.user.role != "medecin":
                if islaborantin and request.user.role != "laborantin":
                     raise PermissionDenied("You must be a patient/medcin/radiologue/laboratoire to access this.")
    def post(self, request, *args, **kwargs):
        self.check_permissions(request, isPatient, isLaborantin, isMedecin)
        id_bilan_biologique = request.data.get('bilan_biologique')
        if not id_bilan_biologique:
            raise ValidationError({"error": "id_bilan_biologique is required"})
        
        resultats_biologiques = Resultat_Biologique.objects.filter(bilan_biologique=id_bilan_biologique)
        if not resultats_biologiques.exists():
            return Response({"message": "No resultats biologiques found for the given bilan_biologique_id"}, status=404)

        serializer = self.get_serializer(resultats_biologiques, many=True)
        return Response(serializer.data)
    
    def put(self, request, *args, **kwargs):
        self.check_permissions(request, isLaborantin)
        id_resultat = request.data.get('id_resultat')
        if not id_resultat:
            raise ValidationError({"error": "id_resultat is required"})
        
        resultat = get_object_or_404(Resultat_Biologique, id_resultat=id_resultat)
        serializer = self.get_serializer(resultat, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
    def delete(self, request, *args, **kwargs):
        self.check_permissions(request, isLaborantin)
        id_resultat = request.data.get('id_resultat')
        if not id_resultat:
            raise ValidationError({"error": "id_resultat is required"})
        
        resultat = get_object_or_404(Resultat_Biologique, id_resultat=id_resultat)
        resultat.delete()
        return Response({"message": "Resultat biologique deleted successfully"}, status=204)
    



@api_view(['POST'])
def ajout_bilan_radiologique(request):
    #request must have the id of the current examen complementaire and the bilan radiologique attributes
    if request.user.role != 'radiologue':
            return Response({"detail": "Only radiologue can create bilan radiologique"}, status=403)
    
    examen_comp_id = request.data['examen_complementaire']
    if not examen_comp_id:
        return Response("id_examen_complementaire is required", status=400)
    try:
        examen_complementaire = Examen_Complementaire.objects.get(id_examen_complementaire=examen_comp_id)
    except Examen_Complementaire.DoesNotExist:
        return Response(f"Examen complementaire with id {examen_comp_id} does not exist", status=404)
    
    bilan_radiologique = request.data
    serializer = Bilan_RadiologiqueSerializer(data=bilan_radiologique)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['POST'])
def ajout_examen_radiologique(request):
    #request must have the id of the current bilan radiologique and the examen radiologique attributes
    if request.user.role != 'radiologue':
            return Response({"detail": "Only radiologue can create examen radiologique"}, status=403)
    
    bilan_radiologique_id = request.data['bilan_radiologique']
    if not bilan_radiologique_id:
        return Response("id_bilan_radiologique is required", status=400)
    try:
        bilan_radiologique = Bilan_Radiologique.objects.get(id_bilan_radiologique=bilan_radiologique_id)
    except Bilan_Radiologique.DoesNotExist:
        return Response(f"Bilan radiologique with id {bilan_radiologique_id} does not exist", status=404)
    
    try:
        radiologue = Radiologue.objects.get(user=request.user)
    except Radiologue.DoesNotExist:
        return Response({"detail": "Logged-in user is not associated with a Radiologues profile"}, status=403)
    
    examen_radiologique = request.data
    examen_radiologique['Radiologue'] = radiologue.id
    serializer = Examen_RadiologiqueSerializer(data=examen_radiologique)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(["POST"])
def ajout_resultat_radiologique(request):
    #request must have the id of the current examen radiologique and the resultat radiologique attributes
    if request.user.role != 'radiologue':
            return Response({"detail": "Only radiologue can create examen radiologique"}, status=403)
    
    examen_radiologique_id = request.data['examen_radiologique']
    if not examen_radiologique_id:
        return Response("id_examen_radiologique is required", status=400)
    try:
        examen_radiologique = Examen_Radiologique.objects.get(id_examen=examen_radiologique_id)
    except Examen_Radiologique.DoesNotExist:
        return Response(f"Examen radiologique with id {examen_radiologique_id} does not exist", status=404)
    
    resultat_radiologique = request.data
    serializer = ImageMedicaleSerializer(data=resultat_radiologique)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


class BilanRadiologiqueListView(ListAPIView):
    serializer_class = Bilan_RadiologiqueSerializer
    def check_permissions(self, request, is_patient=False, islaborantin=False, is_medecin=False, isradiologue=False):
        if is_patient and request.user.role != "patient":
            if is_medecin and request.user.role != "medecin":
                if isradiologue and request.user.role != "radiologue":
                     raise PermissionDenied("You must be a patient/medcin/radiologue to access this.")
    def post(self, request, *args, **kwargs):
        self.check_permissions(request, isPatient, isRadioloque, isMedecin)
        id_examen_complementaire = request.data.get('examen_complementaire')
        if not id_examen_complementaire:
            raise ValidationError({"error": "id_examen_complementaire is required"})
        
        bilans_radiologiques = Bilan_Radiologique.objects.filter(examen_complementaire=id_examen_complementaire)
        if not bilans_radiologiques.exists():
            return Response({"message": "No bilans radiologiques found for the given examen_complementaire_id"}, status=404)

        serializer = self.get_serializer(bilans_radiologiques, many=True)
        return Response(serializer.data)
    
    def put(self, request, *args, **kwargs):
        self.check_permissions(request, isRadioloque)
        id_bilan_radiologique = request.data.get('id_bilan_radiologique')
        if not id_bilan_radiologique:
            raise ValidationError({"error": "id_bilan_radiologique is required"})
        
        bilan_radiologique = get_object_or_404(Bilan_Radiologique, id_bilan_radiologique=id_bilan_radiologique)
        serializer = self.get_serializer(bilan_radiologique, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
    def delete(self, request, *args, **kwargs):
        self.check_permissions(request, isRadioloque)
        id_bilan_radiologique = request.data.get('id_bilan_radiologique')
        if not id_bilan_radiologique:
            raise ValidationError({"error": "id_bilan_radiologique is required"})
        
        bilan_radiologique = get_object_or_404(Bilan_Radiologique, id_bilan_radiologique=id_bilan_radiologique)
        bilan_radiologique.delete()
        return Response({"message": "Bilan radiologique deleted successfully"}, status=204)

class ExamenRadiologiqueListView(ListAPIView):
    serializer_class = Examen_RadiologiqueSerializer
    def check_permissions(self, request, is_patient=False, islaborantin=False, is_medecin=False, isradiologue=False):
        if is_patient and request.user.role != "patient":
            if is_medecin and request.user.role != "medecin":
                if isradiologue and request.user.role != "radiologue":
                     raise PermissionDenied("You must be a patient/medcin/radiologue to access this.")
    def post(self, request, *args, **kwargs):
        self.check_permissions(request, isPatient, isRadioloque, isMedecin)
        id_bilan_radiologique = request.data.get('bilan_radiologique')
        if not id_bilan_radiologique:
            raise ValidationError({"error": "id_bilan_radiologique is required"})
        
        examens_radiologiques = Examen_Radiologique.objects.filter(bilan_radiologique=id_bilan_radiologique)
        if not examens_radiologiques.exists():
            return Response({"message": "No examens radiologiques found for the given bilan_radiologique_id"}, status=404)

        serializer = self.get_serializer(examens_radiologiques, many=True)
        return Response(serializer.data)
    
    def put(self, request, *args, **kwargs):
        self.check_permissions(request, isRadioloque)
        id_examen_radiologique = request.data.get('id_examen_radiologique')
        if not id_examen_radiologique:
            raise ValidationError({"error": "id_examen_radiologique is required"})
        
        examen_radiologique = get_object_or_404(Examen_Radiologique, id_examen=id_examen_radiologique)
        serializer = self.get_serializer(examen_radiologique, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
    def delete(self, request, *args, **kwargs):
        self.check_permissions(request, isRadioloque)
        id_examen_radiologique = request.data.get('id_examen_radiologique')
        if not id_examen_radiologique:
            raise ValidationError({"error": "id_examen_radiologique is required"})
        
        examen_radiologique = get_object_or_404(Examen_Radiologique, id_examen=id_examen_radiologique)
        examen_radiologique.delete()
        return Response({"message": "Examen radiologique deleted successfully"}, status=204)
    
class ResultatRadiologiqueListView(ListAPIView):
    serializer_class = ImageMedicaleSerializer
    def check_permissions(self, request, is_patient=False, islaborantin=False, is_medecin=False, isradiologue=False):
        if is_patient and request.user.role != "patient":
            if is_medecin and request.user.role != "medecin":
                if isradiologue and request.user.role != "radiologue":
                     raise PermissionDenied("You must be a patient/medcin/radiologue to access this.")
    def post(self, request, *args, **kwargs):
        self.check_permissions(request, isPatient, isRadioloque, isMedecin)
        id_examen_radiologique = request.data.get('examen_radiologique')
        if not id_examen_radiologique:
            raise ValidationError({"error": "id_examen_radiologique is required"})
        
        resultats_radiologiques = ImageMedicale.objects.filter(examen_radiologique=id_examen_radiologique)
        if not resultats_radiologiques.exists():
            return Response({"message": "No resultats radiologiques found for the given examen_radiologique_id"}, status=404)

        serializer = self.get_serializer(resultats_radiologiques, many=True)
        return Response(serializer.data)
    
    def put(self, request, *args, **kwargs):
        self.check_permissions(request, isRadioloque)
        id_resultat = request.data.get('id_image')
        if not id_resultat:
            raise ValidationError({"error": "id_image is required"})
        
        resultat = get_object_or_404(ImageMedicale, id_image=id_resultat)
        serializer = self.get_serializer(resultat, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
    def delete(self, request, *args, **kwargs):
        self.check_permissions(request, isRadioloque)
        id_resultat = request.data.get('id_image')
        if not id_resultat:
            raise ValidationError({"error": "id_image is required"})
        
        resultat = get_object_or_404(ImageMedicale, id_image=id_resultat)
        resultat.delete()
        return Response({"message": "Resultat radiologique deleted successfully"}, status=204)
