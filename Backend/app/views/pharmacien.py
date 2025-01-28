from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from app.models import Ordonnance
from app.serializers.khalil_serializers import OrdonnanceSerializer
from app.permissions import isPharmacien

class OrdonnanceValidationView(APIView):
    permission_classes = [isPharmacien]

    def post(self, request):
        try:
            ordonnance = Ordonnance.objects.get(pk=request.data["ordonnance_id"])
        except Ordonnance.DoesNotExist:
            return Response({"error": "Ordonnance not found"}, status=status.HTTP_404_NOT_FOUND)
        ordonnance.validated = "VALIDEE"
        ordonnance.save()

        # return the data
        serializer = OrdonnanceSerializer(ordonnance)
        return Response(serializer.data, status=status.HTTP_200_OK)