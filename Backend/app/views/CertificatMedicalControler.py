from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.models import *
from app.serializers.khalil_serializers import *
from rest_framework.generics import ListAPIView
from rest_framework.exceptions import ValidationError, PermissionDenied
from django.shortcuts import get_object_or_404
from app.permissions import *

@api_view(['POST'])
def crea_certificat(request):
    if request.user.role != 'medecin':
            return Response({"detail": "Only medecins can create certificat"}, status=403)
    
    try:
        medecin = Medecin.objects.get(user=request.user)
    except Medecin.DoesNotExist:
        return Response({"detail": "Logged-in user is not associated with a medecin profile"}, status=403)
    
    certificat = request.data
    certificat['medecin'] = Medecin.id
    
    serializer = CertificatMedicalSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

class CertificatMedicalListView(ListAPIView):
    serializer_class = CertificatMedicalSerializer

    def check_permissions(self, request, is_patient=False, is_medecin=False):
        if is_patient and request.user.role != "patient":
            if is_medecin and request.user.role != "medecin":
                     raise PermissionDenied("You must be a patient/medcin to access this.")

    def post(self, request, *args, **kwargs):
        self.check_permissions(request, isPatient, isMedecin)
        id_dpi = request.data.get('dpi')
        if not id_dpi:
            raise ValidationError({"error": "id_dpi is required"})
        
        certificats = CertificatMedical.objects.filter(dpi=id_dpi)
        if not certificats.exists():
            return Response({"message": "No certificats found for the given dpi_id"}, status=404)

        serializer = self.get_serializer(certificats, many=True)
        return Response(serializer.data)
    
    def put(self, request, *args, **kwargs):
        self.check_permissions(request, isMedecin)
        id_certificat = request.data.get('id_certificat')
        if not id_certificat:
            raise ValidationError({"error": "id_certificat is required"})
        
        certificat = get_object_or_404(CertificatMedical, id_certificat=id_certificat)
        serializer = self.get_serializer(certificat, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    
    def delete(self, request, *args, **kwargs):
        self.check_permissions(request, isMedecin)
        id_certificat = request.data.get('id_certificat')
        if not id_certificat:
            raise ValidationError({"error": "id_certificat is required"})
        
        certificat = get_object_or_404(CertificatMedical, id_certificat=id_certificat)
        certificat.delete()
        return Response({"message": "Certificat deleted successfully"})