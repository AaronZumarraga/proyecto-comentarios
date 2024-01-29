<template>
  <div class="home">
    <HelloWorld msg=""/>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
};
</script>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

router-link {
  font-size: 16px;
  text-decoration: underline;
  color: #42b983;
  cursor: pointer;
}
</style>
