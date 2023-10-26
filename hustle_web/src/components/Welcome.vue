<template>
  <div class="hello ms-10 mt-10 mr-10 info">
    <h1 class="font-black">{{ msg }} Connecting skilled hands to your needs.</h1>
    <p class="mt-6">
      HustleFiti is your passport to a transformed Kenyan Gig Economy. We've crafted a visionary online marketplace, uniting skilled professionals with discerning clients in search of dependable solutions.
    </p>
    <p class="mt-6">
      We're more than a platform; we're a community, ensuring every service is reliable, convenient, and personalized. Welcome to HustleFiti, where your needs meet expertise effortlessly.
    </p>
    <button
     class="bg-green-900 active:bg-gray-100  text-white font-normal mt-6 px-10 py-5 rounded-full outline-none focus:outline-none mr-1 mb-1 shadow hover:shadow-2xl align-middle inline-flex items-center text-xs"
     type="button"
     style="transition: all 0.15s ease 0s;">
     Hire Now </button>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: 43px;
}
p {
  font-size: 16px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

@media (max-width: 1068px) {
  h1 {
    font-size: 20px;
  }
  p {
    font-size: 14px;
  }
  .info {
    margin: 4px;
  }

}
</style>
