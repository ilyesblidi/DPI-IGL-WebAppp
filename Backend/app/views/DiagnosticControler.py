
from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.serializers import DiagnosticSerializer



@api_view(['POST'])
def crea_Diagnostic(request):
    serializer = DiagnosticSerializer(data=request.data)
    dpi = dpi.objects.get(id_dpi=request.data['id_dpi'])
    dpi.diagnostic = serializer.data
    if serializer.is_valid():
        serializer.save()
        dpi.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)