<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>
      <strong>Bienvenido a nuestra Aplicación de Comentarios.</strong>
      Esta plataforma te permite expresarte de manera fácil y efectiva.
      Descubre las funciones clave:
    </h2>
    <ul>
      <li><strong>Agregar Comentarios:</strong> Expresa tus pensamientos y opiniones rápidamente.</li>
      <li><strong>Editar Comentarios:</strong> Mantén tus mensajes actualizados y relevantes.</li>
      <li><strong>Eliminar Comentarios:</strong> Gestiona tu participación según tus preferencias.</li>
    </ul>
    <p>
      Dirígete a la sección de comentarios para experimentar estas funciones.
    </p>
    <router-link to="/about">Ir a la sección de comentarios</router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
};
</script>

<style scoped>
.hello {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
}

p {
  font-size: 16px;
  line-height: 1.6;
  color: #333;
}

ul {
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
}

li {
  font-size: 16px;
  margin-bottom: 10px;
}

strong {
  font-weight: bold;
  color: #42b983;
}
</style>
