from rest_framework import viewsets

from .models import Riesgo, PlanMitigacion
from .serializers import (
    RiesgoSerializer,
    PlanMitigacionSerializer,
)


class RiesgoViewSet(viewsets.ModelViewSet):

    queryset = Riesgo.objects.all().order_by("-fecha_creacion")
    serializer_class = RiesgoSerializer


class PlanMitigacionViewSet(viewsets.ModelViewSet):

    queryset = PlanMitigacion.objects.all()
    serializer_class = PlanMitigacionSerializer