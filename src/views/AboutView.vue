<template>
  <div>
    <h1>Microservicio de Comentarios</h1>
    <button @click="mostrarCuadro('crear')">Crear Comentario</button>
    <button @click="mostrarCuadro('editar')">Editar Comentario</button>
    <button @click="mostrarCuadro('eliminar')">Eliminar Comentario</button>

    <!-- Cuadro de Crear/Editar Comentario -->
    <div v-if="mostrarCrear || mostrarEditar">
      <textarea v-if="mostrarCrear" v-model="nuevoComentario" placeholder="Ingresa tu comentario"></textarea>
      <div v-if="mostrarEditar">
        <select v-model="comentarioSeleccionado">
          <option v-for="comentario in comentarios" :key="comentario.id" :value="comentario.id">{{ comentario.contenido }}</option>
        </select>
        <div v-if="comentarioSeleccionado">
          <input type="text" v-model="nuevoContenido" placeholder="Nuevo contenido" />
          <button @click="editarComentario">Cargar</button>
        </div>
      </div>
      <button @click="mostrarCrear ? agregarComentario() : editarComentario()">
        {{ mostrarCrear ? 'Agregar' : 'Editar' }}
      </button>
    </div>

    <!-- Lista de Eliminar Comentario -->
    <div v-if="mostrarEliminar">
      <div v-if="comentarios.length === 0">
        <p>No hay comentarios para eliminar.</p>
      </div>
      <div v-else>
        <div v-for="comentario in comentarios" :key="comentario.id">
          <input type="checkbox" v-model="comentario.selected" :id="'checkbox_' + comentario.id" />
          <label :for="'checkbox_' + comentario.id">{{ comentario.contenido }}</label>
        </div>
        <button @click="eliminarComentariosSeleccionados">Eliminar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mostrarCrear: false,
      mostrarEditar: false,
      mostrarEliminar: false,
      nuevoComentario: '',
      nuevoContenido: '',
      comentarioSeleccionado: null,
      comentarios: [],
    };
  },
  methods: {
    mostrarCuadro(opcion) {
      // Limpiar datos antes de mostrar el cuadro
      this.nuevoComentario = '';
      this.comentarioSeleccionado = null;

      // Mostrar el cuadro correspondiente
      this.mostrarCrear = opcion === 'crear';
      this.mostrarEditar = opcion === 'editar';
      this.mostrarEliminar = opcion === 'eliminar';

      if (opcion === 'eliminar') {
        // Obtener la lista de comentarios desde el servidor al mostrar el cuadro de eliminación
        this.cargarComentarios();
      }
    },
    agregarComentario() {
      if (this.nuevoComentario.trim() !== '') {
        fetch('http://localhost:3000/api/comentarios', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contenido: this.nuevoComentario }),
        })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              console.log('Comentario agregado con éxito');
              this.mostrarCrear = false;
            } else {
              console.error('Error al agregar comentario:', data.error);
            }
          })
          .catch(error => console.error('Error de red al agregar comentario:', error));
      }
    },
    editarComentario() {
      const idComentario = this.comentarioSeleccionado;

      if (!idComentario || this.nuevoContenido.trim() === '') {
        console.log('Por favor, selecciona un comentario y proporciona un nuevo contenido.');
        return;
      }

      fetch(`http://localhost:3000/api/comentarios/${idComentario}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nuevoContenido: this.nuevoContenido }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            console.log('Comentario editado con éxito');
            this.mostrarEditar = false;
            // Actualizar la lista de comentarios después de la edición
            this.cargarComentarios();
          } else {
            console.error('Error al editar comentario:', data.error);
          }
        })
        .catch(error => console.error('Error de red al editar comentario:', error));
    },
    cargarComentarios() {
      fetch('http://localhost:3000/api/comentarios')
        .then(response => response.json())
        .then(data => (this.comentarios = data))
        .catch(error => console.error('Error al cargar comentarios:', error));
    },
    eliminarComentariosSeleccionados() {
      const comentariosAEliminar = this.comentarios.filter(comentario => comentario.selected);

      if (comentariosAEliminar.length === 0) {
        console.log('No hay comentarios seleccionados para eliminar.');
        return;
      }

      const idsAEliminar = comentariosAEliminar.map(comentario => comentario.id);

      // Hacer la solicitud al servidor para eliminar los comentarios seleccionados
      fetch('http://localhost:3000/api/comentarios', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ids: idsAEliminar,
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            console.log('Comentarios eliminados con éxito');
            // Actualizar la lista de comentarios después de la eliminación
            this.mostrarListaEliminar();
          } else {
            console.error('Error al eliminar comentarios:', data.error);
          }
        })
        .catch(error => {
          console.error('Error de red al eliminar comentarios:', error);
        });
    },
  },
};
</script>

<style scoped>
  body {
    font-family: Arial, sans-serif;
    text-align: center;
    margin: 20px;
  }

  button {
    padding: 10px;
    margin: 5px;
    font-size: 16px;
  }

  textarea {
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
  }
</style>
