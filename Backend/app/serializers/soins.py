from rest_framework import serializers
from app.models import Soin, AdminMedicament

class AddAdminMedicament(serializers.ModelSerializer):
    class Meta:
        model = AdminMedicament
        fields = [
            "advice",
        ]

class AddSoinSerializer(serializers.ModelSerializer):
    admin_medicament_input = AddAdminMedicament(write_only=True)
    class Meta:
        model = Soin
        fields = [
            "soin_infirmier",
            "observation_patient",
            "infirmier",
            "dpi",
            "admin_medicament_input"
        ]

    def create(self, validated_data):
        
        admin_medicament_input = validated_data.pop("admin_medicament_input")
        soin = Soin.objects.create(
            soin_infirmier = validated_data['soin_infirmier'],
            observation_patient= validated_data["observation_patient"],
            infirmier = self.context["request"].user.infirmier_profile,
            dpi = validated_data['dpi']
        )
        soin.save()

        AdminMedicament.objects.create(
            advice = admin_medicament_input['advice'],
            soin = soin
        )

        return soin