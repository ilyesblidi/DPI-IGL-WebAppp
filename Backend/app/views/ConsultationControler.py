from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.serializers.khalil_serializers import ConsultationSerializer, ResumeSerializer, Examen_ConsultationSerializer
from app.models import Consultation, Diagnostic,Resume, Examen_Consultation
from rest_framework.generics import ListAPIView
from rest_framework.exceptions import ValidationError


@api_view(['POST'])
def crea_Consultation(request):
    #request must have the id of the current diagnostic and the consultation attributes
    
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
    
    consultation = request.data
    serializer = ConsultationSerializer(data=consultation)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

class ConsultationListView(ListAPIView):
    serializer_class = ConsultationSerializer
    def post(self, request, *args, **kwargs):
        id_diagnostic = request.data.get('diagnostic')
        if not id_diagnostic:
            raise ValidationError({"error": "id_diagnostic is required"})
        
        consultations = Consultation.objects.filter(diagnostic=id_diagnostic)
        if not consultations.exists():
            return Response({"message": "No consultations found for the given diagnostic_id"}, status=404)

        serializer = self.get_serializer(consultations, many=True)
        return Response(serializer.data)
    


@api_view(['POST'])
def ajout_resume(request):
    #request must have the id of the current consultation and the resume attributes
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
    def post(self, request, *args, **kwargs):
        id_consultation = request.data.get('consultation')
        if not id_consultation:
            raise ValidationError({"error": "id_consultation is required"})
        
        resumes = Resume.objects.filter(consultation=id_consultation)
        if not resumes.exists():
            return Response({"message": "No resumes found for the given consultation_id"}, status=404)

        serializer = self.get_serializer(resumes, many=True)
        return Response(serializer.data)
    


@api_view(['POST'])
def ajout_examen_consultation(request):
    #request must have the id of the current consultation and the examen attributes
    
    examen = request.data
    serializer = Examen_ConsultationSerializer(data=examen)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

class ExamenConsultationListView(ListAPIView):
    serializer_class = Examen_ConsultationSerializer
    def post(self, request, *args, **kwargs):
        id_consultation = request.data.get('id_consultation')
        if not id_consultation:
            raise ValidationError({"error": "id_consultation is required"})
        
        examens = Examen_Consultation.objects.filter(consultation=id_consultation)
        if not examens.exists():
            return Response({"message": "No examens found for the given consultation_id"}, status=404)

        serializer = self.get_serializer(examens, many=True)
        return Response(serializer.data)