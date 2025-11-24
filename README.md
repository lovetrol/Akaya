| *Nuevo diseño de 2 columnas con formato vertical* | *Overlay ajustado* |
|:---:|:---:|
| <img width="1080" height="2424" alt="Screenshot_20251122_160917" src="https://github.com/user-attachments/assets/870ac3a9-c1a0-423f-9a81-c7752b79fbe3" /> | <img width="1080" height="2424" alt="Screenshot_20251122_160928" src="https://github.com/user-attachments/assets/34e74cb4-5d61-47e5-9525-ba8250b3fc77" /> |


| *bottomsheet "El Secreto de Tuan'O"* | *bottomsheet "El Archivador: Archivos del vacío"* |
|:---:|:---:|
| <img width="1080" height="2424" alt="Screenshot_20251122_161059" src="https://github.com/user-attachments/assets/49a6b825-add3-4ada-872d-14ae48a519dc" /> | <img width="1080" height="2424" alt="Screenshot_20251122_160949" src="https://github.com/user-attachments/assets/7df89165-7fd7-46a6-8d2e-b3b5a8d1c6c9" /> |





# 📱 Akaya Media - Mobile App Challenge

Aplicación móvil híbrida desarrollada como prueba técnica para **Akaya Media**. El proyecto consume una API REST para mostrar un catálogo de series con scroll infinito, filtrado de contenido y vistas detalladas, siguiendo estrictamente los lineamientos de diseño y funcionalidad solicitados.

## 🚀 Características Principales

* **Listado de Series (Home):**
    * Implementación de **Scroll Infinito** para carga eficiente de datos.
    * Diseño minimalista con tarjetas (Cards) verticales tipo póster.
    * **Filtrado inteligente:** Solo muestra series con estado "Published", que contengan imágenes válidas y capítulos disponibles.
* **Interacción UI/UX:**
    * Animaciones nativas en CSS: Efecto "Pop" y elevación al seleccionar una tarjeta.
    * Overlay oscuro con botón "VER MÁS" al activar una tarjeta.
* **Detalle de Serie (Modal):**
    * Modal inferior (Bottom Sheet) animado.
    * Visualización completa de metadatos: Portada, Título, Status, Total de Capítulos y Sinopsis.
    * Manejo de errores 400/500 y validación de datos nulos.
* **Seguridad & Configuración:**
    * Splash Screen e Icono personalizados con branding de Akaya.
    * Ofuscación básica de Endpoints (Base64) para no exponer URLs en texto plano.
    * Configuración de `Content-Security-Policy` (CSP) para Android 12+.

## 📸 Capturas de Pantalla

| Home & Listado | Interacción (Active State) |
|:---:|:---:|
| <img width="1080" height="2424" alt="Screenshot_20251120_153616" src="https://github.com/user-attachments/assets/4a551f38-db15-4eac-ab64-e11fe24e3564" /> | <img width="1080" height="2424" alt="Screenshot_20251120_153627" src="https://github.com/user-attachments/assets/a485fa8b-6c73-432d-a8bb-55e1e6662fd8" /> |
| *Vista principal con Scroll Infinito* | *Tarjeta seleccionada con opción 'Ver Más'* |

| Detalle (Modal) | Detalle (Sinopsis) |
|:---:|:---:|
| <img width="1080" height="2424" alt="Screenshot_20251120_153636" src="https://github.com/user-attachments/assets/dc498217-f149-4c66-a63b-de564d814823" /> | <img width="1080" height="2424" alt="Screenshot_20251120_153653" src="https://github.com/user-attachments/assets/c949d5b0-6d06-4422-8365-1e1c438ce90f" /> |
| *Ficha técnica de la serie* | *Visualización de descripción larga* |

## 🛠 Stack Tecnológico

* **Core:** Apache Cordova 12.x
* **Plataforma:** Android (Target SDK 34 / Android 14)
* **Lenguajes:** HTML5, CSS3 (Sin frameworks pesados), JavaScript (ES6+, Vanilla).
* **Red:** Fetch API nativo (POST Requests).
* **IDE:** Visual Studio Code & Android Studio (Gradle Build).

## 📂 Estructura del Proyecto

El proyecto sigue una arquitectura **MVC simplificada** para mantener el código limpio y modular:

```text
www/
├── css/
│   └── styles.css       # Estilos, animaciones y responsive design
├── img/                 # Assets, logos y placeholders
├── js/
│   ├── api.js           # Servicio de conexión a la API (Manejo de POST/Fetch)
│   ├── config.js        # Variables de entorno ofuscadas (Base64)
│   ├── ui.js            # Renderizado de HTML dinámico (Cards, Modals)
│   └── index.js         # Controlador principal (Lógica de Scroll, Filtros)
└── index.html           # Punto de entrada único (SPA feel)
