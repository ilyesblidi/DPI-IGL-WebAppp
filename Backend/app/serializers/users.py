from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from app.models import *
from django.contrib.auth.password_validation import validate_password
from app.serializers.soins import ListSoinsSerializer
from app.serializers.dpi import ListDPIsSerializer

class RegisterSerializer(serializers.ModelSerializer):
    # ensuring email is unique
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

    class Meta:
        model = Utilisateur
        fields = ('first_name', 'last_name', 'email', 'password', 'password2','phone', 'adresse', 'role')
        extra_kwargs = {
            'first_name':{'required':True},
            'last_name':{'required':True},
            'role':{'required':True},
            
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        if attrs['role'] == 'patient':
            raise serializers.ValidationError({"DPI can be created at /dpi/add"})
        return attrs
    
    def create(self, validated_data):
        user = Utilisateur.objects.create(
            first_name = validated_data["first_name"],
            last_name = validated_data["last_name"],
            email = validated_data["email"],
            #birth_date = validated_data["birth_date"],
            phone = validated_data["phone"],
            adresse = validated_data["adresse"],
            role = validated_data["role"],
        )
        # the password is saved this way to be hashed
        user.set_password(validated_data["password"])
        user.save()

        # create associated user object
        role = validated_data['role']
        if role == 'medecin':
            Medecin.objects.create(user=user)
        elif role == "infirmier":
            Infirmier.objects.create(user=user)
        elif role == "radiologue":
            Radiologue.objects.create(user=user)
        elif role == "laborantin":
            Laboratoire.objects.create(user=user)
        elif role == "pharmacien":
            Pharmacien.objects.create(user=user)
        elif role == "admin":
            admin.objects.create(user=user)

        return user
    
class ListUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Utilisateur
        fields = '__all__'


# get user profile
class GetUserSerializer(serializers.ModelSerializer):
    soins = serializers.SerializerMethodField()
    dpis = serializers.SerializerMethodField()
    class Meta:
        model = Utilisateur
        fields = '__all__'
        
    def get_soins(self, obj):
        if obj.role == 'infirmier':
            return ListSoinsSerializer(obj.infirmier_profile.soins.all(), many=True).data
        else:
            return None
    def get_dpis(self, obj):
        if obj.role == 'medecin':
            return ListDPIsSerializer(obj.medecin_profile.dpis.all(), many=True).data
        else:
            return None