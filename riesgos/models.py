from django.db import models


class Riesgo(models.Model):
    NIVEL_CHOICES = [
        ("BAJO", "Bajo"),
        ("MEDIO", "Medio"),
        ("ALTO", "Alto"),
        ("CRITICO", "Crítico"),
    ]

    ESTADO_CHOICES = [
        ("IDENTIFICADO", "Identificado"),
        ("EN_TRATAMIENTO", "En tratamiento"),
        ("MITIGADO", "Mitigado"),
        ("ACEPTADO", "Aceptado"),
    ]

    nombre = models.CharField(max_length=200)
    descripcion = models.TextField()
    categoria = models.CharField(max_length=100)
    activo_afectado = models.CharField(max_length=200)

    impacto = models.PositiveSmallIntegerField()
    probabilidad = models.PositiveSmallIntegerField()

    nivel = models.CharField(
        max_length=10,
        choices=NIVEL_CHOICES,
        editable=False,
    )

    estado = models.CharField(
        max_length=20,
        choices=ESTADO_CHOICES,
        default="IDENTIFICADO",
    )

    responsable = models.CharField(max_length=150)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    def calcular_nivel(self):
        resultado = self.impacto * self.probabilidad

        if resultado <= 5:
            return "BAJO"
        if resultado <= 10:
            return "MEDIO"
        if resultado <= 15:
            return "ALTO"
        return "CRITICO"

    def clean(self):
        from django.core.exceptions import ValidationError

        if not 1 <= self.impacto <= 5:
            raise ValidationError(
                {"impacto": "El impacto debe estar entre 1 y 5."}
            )

        if not 1 <= self.probabilidad <= 5:
            raise ValidationError(
                {"probabilidad": "La probabilidad debe estar entre 1 y 5."}
            )

    def save(self, *args, **kwargs):
        self.full_clean()
        self.nivel = self.calcular_nivel()
        super().save(*args, **kwargs)

    @property
    def puntaje(self):
        return self.impacto * self.probabilidad

    def __str__(self):
        return self.nombre


class PlanMitigacion(models.Model):
    ESTADO_CHOICES = [
        ("PENDIENTE", "Pendiente"),
        ("EN_PROGRESO", "En progreso"),
        ("COMPLETADO", "Completado"),
    ]

    riesgo = models.ForeignKey(
        Riesgo,
        on_delete=models.CASCADE,
        related_name="planes_mitigacion",
    )

    descripcion = models.TextField()
    responsable = models.CharField(max_length=150)
    fecha_limite = models.DateField()
    estado = models.CharField(
        max_length=20,
        choices=ESTADO_CHOICES,
        default="PENDIENTE",
    )

    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Plan para {self.riesgo.nombre}"