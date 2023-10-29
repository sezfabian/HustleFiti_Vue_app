<template>
  <div class="flex justify-center items-center" style="font-family: 'P-posts', sans-serif;">
    <LoginFormVue />
  </div>
</template>

<script>
import LoginFormVue from '@/components/LoginForm.vue';

export default {
  name: 'SigninView',
  components: {
    LoginFormVue
  }
}
</script>

<style>

</style>