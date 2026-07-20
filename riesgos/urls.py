from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    RiesgoViewSet,
    PlanMitigacionViewSet,
)

router = DefaultRouter()

router.register("riesgos", RiesgoViewSet)
router.register("mitigaciones", PlanMitigacionViewSet)

urlpatterns = [
    path("", include(router.urls)),
]