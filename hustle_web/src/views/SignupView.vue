<template>
  <div class="flex justify-center items-center" style="font-family: 'P-posts', sans-serif;">
    <SignupFormVue />
  </div>
</template>

<script>
import SignupFormVue from '@/components/SignupForm.vue';

export default {
  name: 'SignupView',
  components: {
    SignupFormVue
  }
}
</script>

<style>

</style>