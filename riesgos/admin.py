from django.contrib import admin

from .models import PlanMitigacion, Riesgo


@admin.register(Riesgo)
class RiesgoAdmin(admin.ModelAdmin):
    list_display = (
        "nombre",
        "categoria",
        "impacto",
        "probabilidad",
        "puntaje",
        "nivel",
        "estado",
        "responsable",
    )

    list_filter = (
        "nivel",
        "estado",
        "categoria",
    )

    search_fields = (
        "nombre",
        "descripcion",
        "activo_afectado",
        "responsable",
    )


@admin.register(PlanMitigacion)
class PlanMitigacionAdmin(admin.ModelAdmin):
    list_display = (
        "riesgo",
        "responsable",
        "fecha_limite",
        "estado",
    )

    list_filter = (
        "estado",
        "fecha_limite",
    )

    search_fields = (
        "riesgo__nombre",
        "descripcion",
        "responsable",
    )