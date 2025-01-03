from rest_framework.views import APIView
from rest_framework.response import Response
from app.permissions import isAdmin

class AdminView(APIView):
    permission_classes = [isAdmin]

    def get(self, request):
        return Response({"Message":"Hello admin"})