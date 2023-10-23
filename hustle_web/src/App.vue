<template>
  <nav class="relative flex flex-wrap items-center justify-between px-2 py-3 bg-blueGray-500 mb-3">
  <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
    <div class="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
      <img class="h-12" src="./assets/logo.png" alt="">
      <button class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button">
        <span class="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
      </button>
    </div>
    <div class="lg:flex flex-grow items-center" id="example-navbar-warning">
      <ul class="flex flex-col lg:flex-row list-none lg:ml-auto"> </ul>
      <router-link class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75" to="/"> Home </router-link>
      <router-link class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75" to="/about"> About </router-link>
      <ul class="flex flex-col lg:flex-row list-none lg:ml-auto"> </ul>
      <router-link class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75" to="/signin"> Sign in </router-link>
      <router-link class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75" to="/about"> About </router-link>
    </div>
  </div>
  </nav>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
};
</script>