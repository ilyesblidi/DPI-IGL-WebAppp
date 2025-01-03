from rest_framework import generics
from rest_framework.exceptions import NotFound, bad_request
from app.serializers.dpi import AddDPISerializer, ListDPIsSerializer, GetDPISerializer
from app.models import Utilisateur, DPI
from app.permissions import isAdmin

class AddDPIView(generics.CreateAPIView):
    #permission_classes = [isAdmin]
    queryset = Utilisateur.objects.all()
    serializer_class = AddDPISerializer

class ListDPIsView(generics.ListAPIView):
    queryset = DPI.objects.all()
    serializer_class = ListDPIsSerializer

class GetDPIView(generics.RetrieveAPIView):
    queryset = DPI.objects.all()
    serializer_class = GetDPISerializer

class SearchDPIView(generics.ListAPIView):
    serializer_class = ListDPIsSerializer

    def get_queryset(self):
        
        nss = self.request.query_params.get('nss', None)
        if not nss:
            raise NotFound(detail="No nss is specified in the request")
        
        query_set = DPI.objects.filter(nss=nss)
        if not query_set.exists():
            raise NotFound(detail="No DPI with the provided nss")
        
        return query_set
