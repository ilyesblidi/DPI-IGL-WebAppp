from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.serializers.khalil_serializers import OrdonnanceSerializer, MedicamentSerializer
from app.models import Ordonnance, Medicament, Diagnostic
from rest_framework.generics import ListAPIView
from rest_framework.exceptions import ValidationError, PermissionDenied
from app.permissions import *
from django.shortcuts import get_object_or_404


@api_view(['POST'])
def crea_ordanance(request):
    #request must have the id of the current diagnostic and the ordanance attributes
    if request.user.role != 'medecin':
            return Response({"detail": "Only medecins can create ordannance"}, status=403)
    
    diagnostic_id = request.data['diagnostic']
    if not diagnostic_id:
        return Response("id_diagnostic is required", status=400)
    
    try:
        diagnostic = Diagnostic.objects.get(id_diagnostic=diagnostic_id)
    except Diagnostic.DoesNotExist:
        return Response(f"Diagnostic with id {diagnostic_id} does not exist", status=404)
    
    ordanance = request.data
    serializer = OrdonnanceSerializer(data=ordanance)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

class OrdananceListView(ListAPIView):
    serializer_class = OrdonnanceSerializer
    def check_permissions(self, request, is_patient=False, is_medecin=False):
        if is_patient and request.user.role != "patient":
            if is_medecin and request.user.role != "medecin":
               raise PermissionDenied("You must be a patient/medcin to access this.")
    def post(self, request, *args, **kwargs):
        self.check_permissions(request, isPatient, isMedecin)
        id_diagnostic = request.data.get('diagnostic')
        if not id_diagnostic:
            raise ValidationError({"error": "id_diagnostic is required"})
        
        ordanances = Ordonnance.objects.filter(diagnostic=id_diagnostic)
        if not ordanances.exists():
            return Response({"message": "No ordanances found for the given diagnostic_id"}, status=404)

        serializer = self.get_serializer(ordanances, many=True)
        return Response(serializer.data)
    
    def put(self, request, *args, **kwargs):
        self.check_permissions(request, isMedecin)
        id_ordanance = request.data.get('id_ordonnance')
        if not id_ordanance:
            raise ValidationError({"error": "id_ordonnance is required"})
        
        ordanance = get_object_or_404(Ordonnance, id_ordonnance=id_ordanance)
        serializer = self.get_serializer(ordanance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
    def delete(self, request, *args, **kwargs):
        self.check_permissions(request, isMedecin)
        id_ordanance = request.data.get('id_ordonnance')
        if not id_ordanance:
            raise ValidationError({"error": "id_ordonnance is required"})
        
        ordanance = get_object_or_404(Ordonnance, id_ordonnance=id_ordanance)
        ordanance.delete()
        return Response({"message": "Ordonnance deleted successfully"}, status=204)



@api_view(['POST'])
def ajout_medicament(request):
    #request must have the id of the current ordanance and the medicament attributes
    if request.user.role != 'medecin':
            return Response({"detail": "Only medecins can create consultations"}, status=403)
    
    ordanance_id = request.data['ordannance']
    if not ordanance_id:
        return Response("id_ordanance is required", status=400)
    try:
        ordanance = Ordonnance.objects.get(id_ordonnance=ordanance_id)
    except Ordonnance.DoesNotExist:
        return Response(f"Ordonnance with id {ordanance_id} does not exist", status=404)
    
    medicament = request.data
    serializer = MedicamentSerializer(data=medicament)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

class MedicamentListView(ListAPIView):
    serializer_class = MedicamentSerializer
    def check_permissions(self, request, is_patient=False, is_medecin=False):
        if is_patient and request.user.role != "patient":
            if is_medecin and request.user.role != "medecin":
               raise PermissionDenied("You must be a patient/medcin to access this.")
    def post(self, request, *args, **kwargs):
        self.check_permissions(request, isPatient, isMedecin)
        id_ordanance = request.data.get('id_ordonnance')
        if not id_ordanance:
            raise ValidationError({"error": "id_ordanance is required"})
        
        medicaments = Medicament.objects.filter(ordannance=id_ordanance)
        if not medicaments.exists():
            return Response({"message": "No medicaments found for the given ordanance_id"}, status=404)

        serializer = self.get_serializer(medicaments, many=True)
        return Response(serializer.data)
    
    def put(self, request, *args, **kwargs):
        self.check_permissions(request, isMedecin)
        id_medicament = request.data.get('id_medicament')
        if not id_medicament:
            raise ValidationError({"error": "id_medicament is required"})
        
        medicament = get_object_or_404(Medicament, id_medicament=id_medicament)
        serializer = self.get_serializer(medicament, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
    def delete(self, request, *args, **kwargs):
        self.check_permissions(request, isMedecin)
        id_medicament = request.data.get('id_medicament')
        if not id_medicament:
            raise ValidationError({"error": "id_medicament is required"})
        
        medicament = get_object_or_404(Medicament, id_medicament=id_medicament)
        medicament.delete()
        return Response({"message": "Medicament deleted successfully"}, status=204)
    
