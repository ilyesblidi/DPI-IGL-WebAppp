from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.serializers.khalil_serializers import ConsultationSerializer, ResumeSerializer, Examen_ConsultationSerializer
from app.models import *
from rest_framework.generics import ListAPIView
from rest_framework.exceptions import ValidationError, PermissionDenied
from django.shortcuts import get_object_or_404
from rest_framework import status
from app.permissions import *


@api_view(['POST'])
def crea_Consultation(request):
    #request must have the id of the current diagnostic and the consultation attributes
    if request.user.role != 'medecin':
            return Response({"detail": "Only medecins can create consultations"}, status=403)
    diagnostic_id = request.data['diagnostic']
    if not diagnostic_id:
        return Response("id_diagnostic is required", status=400)
    
    try:
        diagnostic = Diagnostic.objects.get(id_diagnostic=diagnostic_id)
    except Diagnostic.DoesNotExist:
        return Response(f"Diagnostic with id {diagnostic_id} does not exist", status=404)
    
    diagnostic_text = request.data.get('diagnostic')
    if not diagnostic_text:
        return Response("diagnostic is required", status=400)
    
    try:
        medecin = Medecin.objects.get(user=request.user)
    except Medecin.DoesNotExist:
        return Response({"detail": "Logged-in user is not associated with a Medecin profile"}, status=403)
    
    consultation = request.data
    consultation['medecin'] = medecin.id
    serializer = ConsultationSerializer(data=consultation)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

class ConsultationListView(ListAPIView):
    serializer_class = ConsultationSerializer
    def check_permissions(self, request, is_patient=False, is_medecin=False):
        if is_patient and request.user.role != "patient":
            if is_medecin and request.user.role != "medecin":
               raise PermissionDenied("You must be a patient/medcin to access this.")

    def get_queryset(self):
        diagnostic_id = self.request.query_params.get('diagnostic')
        if diagnostic_id:
            return Consultation.objects.filter(diagnostic=diagnostic_id)
    def post(self, request, *args, **kwargs):
        self.check_permissions(request, isPatient, isMedecin)
        id_diagnostic = request.data.get('diagnostic')
        if not id_diagnostic:
            raise ValidationError({"error": "id_diagnostic is required"})
        
        consultations = Consultation.objects.filter(diagnostic=id_diagnostic)
        if not consultations.exists():
            return Response({"message": "No consultations found for the given diagnostic_id"}, status=404)

        serializer = self.get_serializer(consultations, many=True)
        return Response(serializer.data)
    def put(self, request, *args, **kwargs):
        self.check_permissions(request, isMedecin)
        consultation_id = request.data.get('id_consultation')
        if not consultation_id:
            raise ValidationError({"error": "id_consultation is required"})

        consultation = get_object_or_404(Consultation, id_consultation=consultation_id)
        serializer = self.get_serializer(consultation, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        self.check_permissions(request, isMedecin)
        consultation_id = request.data.get('id_consultation')
        if not consultation_id:
            raise ValidationError({"error": "id_consultation is required"})

        consultation = get_object_or_404(Consultation, id_consultation=consultation_id)
        consultation.delete()
        return Response({"message": "Consultation deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    


@api_view(['POST'])
def ajout_resume(request):
    #request must have the id of the current consultation and the resume attributes
    if request.user.role != 'medecin':
            return Response({"detail": "Only medecins can create consultations"}, status=403)

    consultation_id = request.data['consultation']
    if not consultation_id:
        return Response("id_consultation is required", status=400)
    try:
        consultation = Consultation.objects.get(id_consultation=consultation_id)
    except Consultation.DoesNotExist:
        return Response(f"Consultation with id {consultation_id} does not exist", status=404)
    
    resume = request.data
    serializer = ResumeSerializer(data=resume)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

class ResumeListView(ListAPIView):
    serializer_class = ResumeSerializer
    def check_permissions(self, request, is_patient=False, is_medecin=False):
        if is_patient and request.user.role != "patient":
            if is_medecin and request.user.role != "medecin":
               raise PermissionDenied("You must be a patient/medcin to access this.")
    def post(self, request, *args, **kwargs):
        self.check_permissions(request, isPatient, isMedecin)
        id_consultation = request.data.get('consultation')
        if not id_consultation:
            raise ValidationError({"error": "id_consultation is required"})
        
        resumes = Resume.objects.filter(consultation=id_consultation)
        if not resumes.exists():
            return Response({"message": "No resumes found for the given consultation_id"}, status=404)

        serializer = self.get_serializer(resumes, many=True)
        return Response(serializer.data)
    
    def put(self, request, *args, **kwargs):
        self.check_permissions(request, isMedecin)
        resume_id = request.data.get('id_resume')
        if not resume_id:
            raise ValidationError({"error": "id_resume is required"})

        resume = get_object_or_404(Resume, id_resume=resume_id)
        serializer = self.get_serializer(resume, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, *args, **kwargs):
        self.check_permissions(request, isMedecin)
        resume_id = request.data.get('id_resume')
        if not resume_id:
            raise ValidationError({"error": "id_resume is required"})

        resume = get_object_or_404(Resume, id_resume=resume_id)
        resume.delete()
        return Response({"message": "Resume deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    


@api_view(['POST'])
def ajout_examen_consultation(request):
    #request must have the id of the current consultation and the examen attributes
    if request.user.role != 'medecin':
            return Response({"detail": "Only medecins can create consultations"}, status=403)
    consultation_id = request.data['consultation']
    if not consultation_id:
        return Response("id_consultation is required", status=400)
    try:
        consultation = Consultation.objects.get(id_consultation=consultation_id)
    except Consultation.DoesNotExist:
        return Response(f"Consultation with id {consultation_id} does not exist", status=404)
    
    examen = request.data
    serializer = Examen_ConsultationSerializer(data=examen)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

class ExamenConsultationListView(ListAPIView):
    serializer_class = Examen_ConsultationSerializer
    def check_permissions(self, request, is_patient=False, is_medecin=False):
        if is_patient and request.user.role != "patient":
            if is_medecin and request.user.role != "medecin":
               raise PermissionDenied("You must be a patient/medcin to access this.")
    def post(self, request, *args, **kwargs):
        self.check_permissions(request, isPatient, isMedecin)
        id_consultation = request.data.get('consultation')
        if not id_consultation:
            raise ValidationError({"error": "id_consultation is required"})
        
        examens = Examen_Consultation.objects.filter(consultation=id_consultation)
        if not examens.exists():
            return Response({"message": "No examens found for the given consultation_id"}, status=404)

        serializer = self.get_serializer(examens, many=True)
        return Response(serializer.data)
    
    def put(self, request, *args, **kwargs):
        self.check_permissions(request, isMedecin)
        examen_id = request.data.get('id_examen_consultation')
        if not examen_id:
            raise ValidationError({"error": "id_examen_consultation is required"})

        examen = get_object_or_404(Examen_Consultation, id_examen_consultation=examen_id)
        serializer = self.get_serializer(examen, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, *args, **kwargs):
        self.check_permissions(request, isMedecin)
        examen_id = request.data.get('id_examen_consultation')
        if not examen_id:
            raise ValidationError({"error": "id_examen_consultation is required"})

        examen = get_object_or_404(Examen_Consultation, id_examen_consultation=examen_id)
        examen.delete()
        return Response({"message": "Examen deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    