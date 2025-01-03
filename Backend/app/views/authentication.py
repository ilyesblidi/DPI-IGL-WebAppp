from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from app.serializers.khalil_serializers import UtilisateurSerializer, MedicamentSerializer, DPISerializer
from app.models import Utilisateur
from rest_framework import status
from rest_framework.parsers import JSONParser
from app.models import Medicament
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password
from django.db import models
import secrets
from django.shortcuts import get_object_or_404
from django.contrib.auth.hashers import check_password
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes, permission_classes



#creating custom token for the user because authtoken uses the default settings of the user model
class CustomToken(models.Model):
    key = models.CharField(max_length=40, primary_key=True)
    user = models.OneToOneField(Utilisateur, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)



@api_view(['POST'])
#function that allows the user to login
def Login(request):
        email = request.data.get('email')
        mot_de_passe = request.data.get('mot_de_passe')
        user = get_object_or_404(Utilisateur, email=email)
        if not check_password(mot_de_passe, user.mot_de_passe):
            return Response({'message': 'Login failed'}, status=400)
        
        token, created = CustomToken.objects.get_or_create(user=user)
        if created:
            token.key = secrets.token_hex(20)
            token.save()

        return Response({'token': token.key, 'user': UtilisateurSerializer(user).data})
            



@api_view(['POST'])
#function that allows the admin to register a user for the first time.
def SignUp(request):
    serializer = UtilisateurSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = Utilisateur.objects.get(id_utilisateur=serializer.data['id_utilisateur'])
        #hashing the password of the user for more security
        user.mot_de_passe = make_password(serializer.data['mot_de_passe'])
        user.save()
        #adding a token to the user after registration
        token = CustomToken.objects.create(user=user, key=secrets.token_hex(20))
        return Response({'token': token.key , 'user': serializer.data})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def token_test(request):
    return Response("Passed for {}".format(request.user.email))



@api_view(['POST'])
def index_POST(request):
    if request.method == 'POST':
        #medicament_data = JSONParser().parse(request)
        medicament_data = request.data
        medicament_serializer = UtilisateurSerializer(data=medicament_data)
        if medicament_serializer.is_valid():
            medicament_serializer.save()
            return Response(medicament_serializer.data, status=201)
        return Response(medicament_serializer.errors, status=400)

    
    
@api_view(['GET'])
def index_GET(request):
    if request.method == 'GET':
        medicaments = Utilisateur.objects.all()
        medicaments_serializer = UtilisateurSerializer(medicaments, many=True)
        return JsonResponse(medicaments_serializer.data, safe=False)

        