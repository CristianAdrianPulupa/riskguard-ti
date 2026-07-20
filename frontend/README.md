# RiskGuard TI

## Plataforma de Gestión de Riesgos Tecnológicos

RiskGuard TI es una aplicación web desarrollada como proyecto académico para la gestión de riesgos tecnológicos, basada en el marco **Enterprise Risk Management (ERM)** y las buenas prácticas del proceso **APO12 – Gestionar Riesgos** de **COBIT 2019**.

La plataforma permite registrar riesgos tecnológicos, evaluar su impacto y probabilidad, visualizar un mapa de riesgos TI y gestionar planes de mitigación.

---

## Tecnologías utilizadas

### Backend
- Python 3.12
- Django
- Django REST Framework

### Frontend
- React
- Vite
- Axios

### Base de datos
- PostgreSQL

---

## Funcionalidades

- Registro de riesgos tecnológicos.
- Clasificación por impacto y probabilidad.
- Cálculo automático del nivel de riesgo.
- Dashboard con indicadores.
- Mapa de Riesgos TI.
- Gestión de planes de mitigación.
- API REST para integración entre frontend y backend.

---

## Arquitectura

```
React
   │
Axios
   │
Django REST Framework
   │
PostgreSQL
```

---

## Estructura del proyecto

```
riskguard-ti/
│
├── config/
├── riesgos/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── manage.py
├── requirements.txt
└── README.md
```

---

## Instalación

### Clonar el proyecto

```bash
git clone https://github.com/CristianAdrianPulupa/riskguard-ti.git
```

Entrar al proyecto

```bash
cd riskguard-ti
```

---

### Backend

Crear entorno virtual

```bash
python -m venv venv
```

Activarlo

Windows

```bash
venv\Scripts\activate
```

Instalar dependencias

```bash
pip install -r requirements.txt
```

Ejecutar migraciones

```bash
python manage.py migrate
```

Iniciar servidor

```bash
python manage.py runserver
```

---

### Frontend

Entrar al frontend

```bash
cd frontend
```

Instalar dependencias

```bash
npm install
```

Ejecutar

```bash
npm run dev
```

---

## Objetivo del proyecto

Desarrollar una plataforma que permita identificar, evaluar y gestionar riesgos tecnológicos mediante una matriz de impacto y probabilidad, facilitando la toma de decisiones y el seguimiento de planes de mitigación.

---

## Entregable principal

Mapa de Riesgos TI.

---

## Autor

Cristian Pulupa

Universidad Central del Ecuador

Ingeniería en Sistemas

2026