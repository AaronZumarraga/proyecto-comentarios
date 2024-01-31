**Proyecto: Microservicio de Comentarios**

### Descripción

Este proyecto implementa un microservicio de comentarios que permite a los usuarios realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre comentarios almacenados en una base de datos MySQL. El sistema incluye una interfaz de usuario construida con Vue.js y un servidor backend desarrollado con Express.js.

### Funcionalidades Principales

1. **Crear Comentario:**
   - Permite a los usuarios agregar nuevos comentarios.

2. **Editar Comentario:**
   - Permite a los usuarios editar el contenido de los comentarios existentes.

3. **Eliminar Comentario:**
   - Permite a los usuarios eliminar uno o varios comentarios seleccionados.

4. **Obtener Lista de Comentarios:**
   - Proporciona una lista de todos los comentarios almacenados en la base de datos.

5. **Estadísticas de Comentarios:**
   - Exponer un endpoint `/api/comentarios/estadisticas` para obtener estadísticas sobre la cantidad total de comentarios y la longitud promedio de los comentarios.

### Estructura del Proyecto

- **Frontend (Vue.js):**
  - `AboutView.vue`: Interfaz de usuario para realizar operaciones CRUD y obtener estadísticas de comentarios.

- **Backend (Express.js):**
  - `server.js`: Implementa la lógica del servidor, gestiona las solicitudes HTTP y se conecta a la base de datos.

- **Base de Datos (MySQL):**
  - Estructura: Una tabla llamada `comentarios` con columnas `id` (clave primaria, autoincremental) y `contenido` (contenido del comentario).