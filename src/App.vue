<template>
  <nav class="relative flex flex-wrap items-center justify-between px-2 py-3 bg-blueGray-500 mb-3">
  <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
    <div class="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
      <img class="h-12" src="./assets/logo.png" alt="">
    </div>
    <div class="lg:flex flex-grow items-center" id="example-navbar-warning">
      <router-link class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75" to="/"> Home </router-link>
      <router-link class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75" to="/services"> Services </router-link>
      <router-link class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75" to="/about"> About </router-link>
      <ul class="flex flex-col lg:flex-row list-none lg:ml-auto"> </ul>
      <router-link
       v-if="!this.$Cookies.get('session_id')"
       class="px-3 py-2 flex items-center text-xs uppercase font-bold
       leading-snug text-black hover:opacity-75" to="/signin"> Sign in | Register </router-link>
      <router-link 
       v-if="this.$Cookies.get('email')"
       class="px-3 py-2 flex items-center text-s lowercase
       font-bold leading-snug text-black hover:opacity-60" to="/profile">
       {{ this.$Cookies.get('email') }} > </router-link>
      <p
       v-if="this.$Cookies.get('session_id')"
       class="px-3 py-2 flex items-center text-xs uppercase font-bold
       leading-snug text-black hover:opacity-75 hover:cursor-pointer" @click="logout()"> Logout </p>
    </div>
  </div>
  </nav>
  <router-view id="view"/>
  <FooterVue/>
</template>

<script>
import FooterVue from './components/Footer.vue';


export default {
  name: 'App',
  components: {
    FooterVue
  },

  methods: {
    logout() {
      this.$Cookies.remove('user_id');
      this.$Cookies.remove('email');
      this.$Cookies.remove('session_id');
      this.$router.push('/');
      location.reload();
    }
  }
};
</script>

<style>
body {
  font-family: 'Poppins+Inline+One', sans-serif;
}

</style>