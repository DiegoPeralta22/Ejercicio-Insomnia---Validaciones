Arquitectura MVC en API REST con Node.js
Este proyecto implementa una API RESTful escalable utilizando Node.js y Express. El núcleo del diseño es la estricta separación de responsabilidades mediante el patrón Modelo-Vista-Controlador (MVC), lo que permite un código modular, comprobable y fácil de mantener.
A continuación se detalla la responsabilidad técnica de cada capa:

1. El Modelo (Model)
  Responsabilidad: Abstracción y Persistencia de Datos
    El modelo actúa como la única fuente de la verdad para la estructura de datos. En esta implementación, simulamos una base de datos utilizando persistencia en memoria (arrays).
   Gestión de Estado: Define la estructura del objeto Usuario (id, nombre, email, edad, activo).
     Identidad Única: Implementa la generación de claves primarias UUID v4 mediante la librería nativa crypto (randomUUID), garantizando la atomicidad de los identificadores sin colisiones.
     Agnosticismo: El modelo es "tonto" intencionalmente; no valida reglas de negocio ni conoce el protocolo HTTP. Solo se encarga de las operaciones CRUD (crear, leer, actualizar) directas sobre el arreglo de datos.
2. El Controlador (Controller)
   Responsabilidad: Lógica de Negocio y Guardianía de Datos
   El controlador es el cerebro de la aplicación. Intercepta las solicitudes, procesa la lógica y decide qué respuesta enviar. Su función principal es proteger la integridad del modelo mediante validaciones estrictas antes de permitir cualquier escritura.
   Funciones clave implementadas:

   Orquestación: Recibe la petición del cliente (req), consulta al Modelo y formatea la respuesta (res) en estricto JSON.

   Manejo de Errores: Controla los flujos de excepción, retornando códigos HTTP adecuados (404 si no se encuentra un recurso, 400 si la petición es incorrecta).

   Validación de Datos (Data Sanitization):
   Nombre: Se rechaza cualquier cadena que contenga caracteres numéricos.Edad: Se fuerza un rango lógico (1 - 100 años).
   Email: Verificación de formato mediante chequeo de sintaxis (presencia de @ y .).
   Si cualquiera de estas reglas falla, el controlador corta la ejecución inmediatamente y retorna un error descriptivo, evitando "ensuciar" el modelo.

   3. Las Rutas (Routes)

Responsabilidad: Interfaz de Red y Puntos de Entrada

La capa de enrutamiento define la API pública y actúa como el despachador de tráfico. Mapea las URLs y los verbos HTTP específicos hacia las funciones del controlador correspondientes.
Endpoints definidos:
GET /api/users $\rightarrow$ Invoca findAll (Recuperación total).
GET /api/users/:id $\rightarrow$ Invoca findById (Búsqueda granular).
POST /api/users $\rightarrow$ Invoca addUser (Creación segura).
PUT /api/users/:id $\rightarrow$ Invoca updateUser (Mutación controlada).
Esta separación permite que, si en el futuro cambia la URL base, no sea necesario tocar la lógica del controlador ni del modelo.

Inicialización (App)
El punto de entrada (app.js) ensambla los componentes:
  Inicializa el servidor Express.
  Configura el middleware para el parseo de application/json.
  Monta el enrutador de usuarios bajo el prefijo /api/users.
  Expone el servicio en el puerto 3000, listo para ser consumido por clientes HTTP como Insomnia o Postman.
