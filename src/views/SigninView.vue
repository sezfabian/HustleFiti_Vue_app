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
  },

  methods: {
    checkLoginStatus() {
      if (this.$Cookies.get('session_id')) {
        this.$router.push('/services')
      }
    }
  },
  created() {
    this.checkLoginStatus()
  },

  mounted() {
    this.checkLoginStatus()
  }

}
</script>

<style>

</style>