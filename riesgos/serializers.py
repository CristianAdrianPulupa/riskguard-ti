from rest_framework import serializers
from .models import Riesgo, PlanMitigacion


class RiesgoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Riesgo
        fields = "__all__"


class PlanMitigacionSerializer(serializers.ModelSerializer):

    class Meta:
        model = PlanMitigacion
        fields = "__all__"