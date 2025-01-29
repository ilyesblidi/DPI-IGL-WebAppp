from rest_framework import generics
from rest_framework.exceptions import NotFound, bad_request
from app.serializers.dpi import AddDPISerializer, ListDPIsSerializer, GetDPISerializer
from app.models import Utilisateur, DPI
from app.permissions import *

class AddDPIView(generics.CreateAPIView):
    permission_classes = [IsAdminOrMedecin]
    queryset = Utilisateur.objects.all()
    serializer_class = AddDPISerializer

class ListDPIsView(generics.ListAPIView):
    queryset = DPI.objects.all()
    serializer_class = ListDPIsSerializer

class GetDPIView(generics.RetrieveAPIView):
    permission_classes = [IsAdminOrMedecinOrPatient]
    queryset = DPI.objects.all()
    serializer_class = GetDPISerializer

class SearchDPIView(generics.ListAPIView):
    permission_classes = [IsAdminOrMedecinOrPatient]
    serializer_class = ListDPIsSerializer

    def get_queryset(self):
        
        nss = self.request.query_params.get('nss', None)
        if not nss:
            raise NotFound(detail="No nss is specified in the request")
        
        query_set = DPI.objects.filter(nss=nss)
        if not query_set.exists():
            raise NotFound(detail="No DPI with the provided nss")
        
        return query_set
