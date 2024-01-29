<template>
  <div>
    <h1>Microservicio de Comentarios</h1>
    <button @click="mostrarCuadroCrear">Crear Comentario</button>
    <button @click="mostrarListaEditar">Editar Comentario</button>
    <button @click="mostrarListaEliminar">Eliminar Comentario</button>

    <!-- Cuadro de Crear Comentario -->
    <div v-if="mostrarCrear">
      <textarea v-model="nuevoComentario" placeholder="Ingresa tu comentario"></textarea>
      <button @click="agregarComentario">Agregar</button>
    </div>

    <!-- Lista de Editar Comentario -->
    <div v-if="mostrarEditar">
      <select v-model="comentarioSeleccionado">
        <option v-for="comentario in comentarios" :key="comentario.id" :value="comentario.id">{{ comentario.contenido }}</option>
      </select>
      <button @click="editarComentario">Editar</button>
    </div>

    <!-- Lista de Eliminar Comentario -->
    <div v-if="mostrarEliminar">
      <select v-model="comentarioSeleccionadoEliminar">
        <option v-for="comentario in comentarios" :key="comentario.id" :value="comentario.id">{{ comentario.contenido }}</option>
      </select>
      <button @click="eliminarComentario">Eliminar</button>
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
      comentarioSeleccionado: null,
      comentarioSeleccionadoEliminar: null,
      comentarios: [
        { id: 1, contenido: 'Primer comentario' },
        { id: 2, contenido: 'Segundo comentario' },
        // Agrega más comentarios según sea necesario
      ],
    };
  },
  methods: {
    mostrarCuadroCrear() {
      this.mostrarCrear = true;
      this.mostrarEditar = false;
      this.mostrarEliminar = false;
    },
    mostrarListaEditar() {
      this.mostrarCrear = false;
      this.mostrarEditar = true;
      this.mostrarEliminar = false;
    },
    mostrarListaEliminar() {
      this.mostrarCrear = false;
      this.mostrarEditar = false;
      this.mostrarEliminar = true;
    },
    agregarComentario() {
      if (this.nuevoComentario.trim() !== '') {
        this.comentarios.push({ id: this.comentarios.length + 1, contenido: this.nuevoComentario });
        this.nuevoComentario = '';
        this.mostrarCrear = false;
      }
    },
    editarComentario() {
      // Implementa la lógica para editar el comentario seleccionado
      alert("Función para editar comentario");
      this.mostrarEditar = false;
    },
    eliminarComentario() {
      // Implementa la lógica para eliminar el comentario seleccionado
      alert("Función para eliminar comentario");
      this.mostrarEliminar = false;
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
