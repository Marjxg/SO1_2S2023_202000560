# Manual de Usuario

## 1. Introducción
Este manual te guiará a través del proceso de usar la aplicación para almacenar calificaciones. Esta aplicación está alojada en un cluster de Kubernetes que contiene pods de Python, Node JS y Redis, Python se comunica con Locust para recibir JSONs de calificaciones. La información es luego desplegada en una aplicación de React alojada en Cloud Run.

## 2. Requisitos Previos
Para utilizar esta aplicación, necesitarás:
    - Un navegador web moderno (como Chrome, Firefox, Safari, etc.).
    - Acceso a Internet.
    - El servicio de locust corriendo.

## 3. Acceso a la Aplicación
Abre tu navegador web y ve a la URL https://so1-2s2023-202000560-5nw76nzltq-uc.a.run.app
![Captura de pantalla de 2023-10-31 18-21-30](https://github.com/Marjxg/SO1_2S2023_202000560/assets/78390305/307c4e82-39bc-4cca-8e27-7c7473819f0f)


## 4. Enviar Calificaciones con Locust
Para enviar calificaciones a la aplicación, sigue estos pasos:
- Asegúrate de tener Locust instalado en tu sistema.
- Ejecuta Locust con el comando locust -f traffic.py.
- Abre tu navegador y ve a http://localhost:8089.
- Ingresa el número de usuarios que simularán el envío de calificaciones y la tasa de llegada.
- Haz clic en "Start swarming".
- Locust empezará a enviar JSONs de calificaciones a la aplicación.
![Captura de pantalla de 2023-10-31 18-22-29](https://github.com/Marjxg/SO1_2S2023_202000560/assets/78390305/0e3ee157-ca47-4b1c-bfbc-60ee80770c71)


## 5. Visualizar Calificaciones en la App de React

Después de que Locust haya enviado las calificaciones, ve a la URL de la aplicación de React (https://so1-2s2023-202000560-5nw76nzltq-uc.a.run.app).
La aplicación cargará automáticamente las calificaciones recibidas y las mostrará en una interfaz amigable con gráficas.
![Captura de pantalla de 2023-10-31 18-22-48](https://github.com/Marjxg/SO1_2S2023_202000560/assets/78390305/aae2c5b1-4e7b-4dff-813e-d5482a1d82ac)


## 6. Cierre de Sesión
Para terminar la sesión en locust presionar el botón rojo de stop.
![Captura de pantalla de 2023-10-31 18-24-44](https://github.com/Marjxg/SO1_2S2023_202000560/assets/78390305/e437b049-e36f-4954-b6a6-d28381e6554e)

