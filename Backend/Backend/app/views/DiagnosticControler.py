
from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.serializers.khalil_serializers import DiagnosticSerializer, OrdonnanceSerializer, Examen_ComplementaireSerializer, MedicamentSerializer
from app.models import Diagnostic, Ordonnance, Examen_Complementaire, Medicament
from app.models import dpi
from rest_framework.generics import ListAPIView
from rest_framework.exceptions import ValidationError, PermissionDenied
from app.permissions import *
from django.shortcuts import get_object_or_404
from rest_framework import status




@api_view(['POST'])
def crea_Diagnostic(request):
    #request must have all diagnostic attributes except diagnostic text field and ordananace and consultations
    if request.user.role != 'medecin':
            return Response({"detail": "Only medecins can create consultations"}, status=403)
    diagnostic = request.data
    serializer = DiagnosticSerializer(data=diagnostic)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

class DiagnosticListView(ListAPIView):
    serializer_class = DiagnosticSerializer
    def check_permissions(self, request, is_patient=False, is_medecin=False):
        if is_patient and request.user.role != "patient":
            if is_medecin and request.user.role != "medecin":
               raise PermissionDenied("You must be a patient/medcin to access this.")
    def post(self, request, *args, **kwargs):
        self.check_permissions(request, isPatient, isMedecin)
        id_dpi = request.data.get('id_dpi')
        if not id_dpi:
            raise ValidationError({"error": "id_dpi is required"})
        
        diagnostics = Diagnostic.objects.filter(dpi=id_dpi)
        if not diagnostics.exists():
            return Response({"message": "No diagnostics found for the given dpi_id"}, status=404)

        serializer = self.get_serializer(diagnostics, many=True)
        return Response(serializer.data)
    
    def put(self, request, *args, **kwargs):
        self.check_permissions(request, isMedecin)
        diagnostic_id = request.data.get('id_diagnostic')
        if not diagnostic_id:
            raise ValidationError({"error": "id_diagnostic is required"})
        
        diagnostic = get_object_or_404(Diagnostic, id_diagnostic=diagnostic_id)
        serializer = DiagnosticSerializer(diagnostic, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
    def delete(self, request, *args, **kwargs):
        self.check_permissions(request, isMedecin)
        diagnostic_id = request.data.get('id_diagnostic')
        if not diagnostic_id:
            raise ValidationError({"error": "id_diagnostic is required"})
        
        diagnostic = get_object_or_404(Diagnostic, id_diagnostic=diagnostic_id)
        diagnostic.delete()
        return Response({"message": "Diagnostic deleted successfully"})


@api_view(['POST'])
def ajout_diagnostic(request):
    #request must have the id of the current diagnostic and the diagnostic text field
    if request.user.role != 'medecin':
            return Response({"detail": "Only medecins can create consultations"}, status=403)
    diagnostic_id = request.data['id_diagnostic']
    if not diagnostic_id:
        return Response("id_diagnostic is required", status=400)
    
    try:
        diagnostic = Diagnostic.objects.get(id_diagnostic=diagnostic_id)
    except Diagnostic.DoesNotExist:
        return Response(f"Diagnostic with id {diagnostic_id} does not exist", status=404)
    
    diagnostic_text = request.data.get('diagnostic')
    if not diagnostic_text:
        return Response("diagnostic is required", status=400)
    
    diagnostic.diagnostic = diagnostic_text
    serializer = DiagnosticSerializer(diagnostic, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

