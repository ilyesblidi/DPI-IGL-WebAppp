from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.models import *
from app.serializers.khalil_serializers import *
from rest_framework.generics import ListAPIView
from rest_framework.exceptions import ValidationError, PermissionDenied
from django.shortcuts import get_object_or_404
from app.permissions import *


@api_view(['POST'])

def crea_compte_rendu(request):
    if request.user.role != 'radiologue':
            return Response({"detail": "Only radiologues can create compte rendu"}, status=403)
    
    try:
        radiologue = Radiologue.objects.get(user=request.user)
    except Radiologue.DoesNotExist:
        return Response({"detail": "Logged-in user is not associated with a radiologue profile"}, status=403)
    
    dpi = DPI.objects.get(id_dpi=request.data['dpi'])
    compte_rendu = request.data
    compte_rendu['radiologue'] = Radiologue.id
    
    serializer = Compte_RenduSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

class Compte_RenduListView(ListAPIView):
    serializer_class = Compte_RenduSerializer

    def check_permissions(self, request, is_patient=False, is_medecin=False, isradiologue=False):
        if is_patient and request.user.role != "patient":
            if is_medecin and request.user.role != "medecin":
                if isradiologue and request.user.role != "radiologue":
                     raise PermissionDenied("You must be a patient/medcin/radiologue to access this.")

    def post(self, request, *args, **kwargs):
        self.check_permissions(request, isPatient, isMedecin, isRadioloque)
        id_dpi = request.data.get('dpi')
        if not id_dpi:
            raise ValidationError({"error": "id_dpi is required"})
        
        compte_rendus = Compte_Rendu.objects.filter(dpi=id_dpi)
        if not compte_rendus.exists():
            return Response({"message": "No compte rendus found for the given dpi_id"}, status=404)

        serializer = self.get_serializer(compte_rendus, many=True)
        return Response(serializer.data)
    
    def put(self, request, *args, **kwargs):
        self.check_permissions(request, isRadioloque)
        id_compte_rendu = request.data.get('id_compte_rendu')
        if not id_compte_rendu:
            raise ValidationError({"error": "id_compte_rendu is required"})
        
        compte_rendu = get_object_or_404(Compte_Rendu, id_compte_rendu=id_compte_rendu)
        serializer = self.get_serializer(compte_rendu, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, *args, **kwargs):
        self.check_permissions(request, isRadioloque)
        id_compte_rendu = request.data.get('id_compte_rendu')
        if not id_compte_rendu:
            raise ValidationError({"error": "id_compte_rendu is required"})
        
        compte_rendu = get_object_or_404(Compte_Rendu, id_compte_rendu=id_compte_rendu)
        compte_rendu.delete()
        return Response({"message": "Compte rendu deleted successfully"}, status=204)