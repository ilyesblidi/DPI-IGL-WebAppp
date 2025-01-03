from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from app.models import Utilisateur, DPI, Soin
from app.serializers.khalil_serializers import DiagnosticSerializer
from django.contrib.auth.password_validation import validate_password
from django.db import transaction

# Nested serializer for DPI
class DPISerializer(serializers.ModelSerializer):
    nss = serializers.CharField(
        max_length=30,
        required=True,
        validators=[UniqueValidator(queryset=DPI.objects.all())]
    )
    mutuelle = serializers.CharField(max_length=100, required=True)
    contact_info = serializers.CharField(max_length=100, required=True)

    # get medecin traitant by email address
    medecin_traitant_email = serializers.EmailField()

    class Meta:
        model = DPI
        fields = ('nss', 'mutuelle', 'contact_info', 'medecin_traitant_email')
    


class AddDPISerializer(serializers.ModelSerializer):
    # Utilisateur
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=Utilisateur.objects.all())]
    )
    password = serializers.CharField(
        required=True,
        write_only=True,
        validators=[validate_password]
    )
    password2 = serializers.CharField(
        required=True,
        write_only=True,
    )
    dpi_input = DPISerializer(write_only=True)

    class Meta:
        model = Utilisateur
        fields = ['first_name', 'last_name', 'email', 'password', 'password2', 'phone', 'adresse', 'role', 'dpi_input']
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'role': {'required': True},
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        if attrs['role'] != 'patient':
            raise serializers.ValidationError({"other user can be created at /users/add"})
        return attrs

    def create(self, validated_data):
        
        dpi_data = validated_data.pop('dpi_input')
        with transaction.atomic():
            user = Utilisateur.objects.create(
                first_name=validated_data["first_name"],
                last_name=validated_data["last_name"],
                email=validated_data["email"],
                phone=validated_data["phone"],
                adresse=validated_data["adresse"],
                role=validated_data["role"],
            )
            user.set_password(validated_data["password"])
            

            # getting the medecin by email
            try:
                medecin = Utilisateur.objects.get(email=dpi_data['medecin_traitant_email']).medecin_profile
            except Utilisateur.DoesNotExist:
                raise serializers.ValidationError("Medecin with this email doesn't exist")


            dpi = DPI.objects.create(
                nss=dpi_data['nss'],
                mutuelle=dpi_data['mutuelle'],
                contact_info=dpi_data['contact_info'],
                medecin_traitant = medecin,
                user=user
            )
            user.save()
            dpi.save()

        return user
    
class ListUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Utilisateur
        fields = ('first_name', 'last_name', 'email', 'phone', 'adresse', 'role')

class ListSoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Soin
        fields = '__all__'

class ListDPIsSerializer(serializers.ModelSerializer):
    user = ListUserSerializer(read_only=True)
    class Meta:
        model = DPI
        fields = '__all__'

class GetDPISerializer(serializers.ModelSerializer):
    user = ListUserSerializer(read_only=True)
    soins = ListSoinSerializer(many=True, read_only=True)
    diagnostics = DiagnosticSerializer(many=True)
    class Meta:
        model = DPI
        fields = '__all__'