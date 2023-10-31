<template>
  <div class="home flex-col-reverse flex" style="font-family: 'Poppins', sans-serif;">
    <img alt="Vue logo" src="../assets/img/hustle.png" class="myimg ml-10 mt-10">
    <div class="mt-10">
      <welcome class="ps-20 intro" msg=""/>
    </div>
  </div>
  <div>
    <Featured/>
  </div>
</template>

<script>
// @ is an alias to /src
import Welcome from '@/components/Welcome.vue'
import FeaturedVue from '@/components/Featured.vue'

export default {
  name: 'HomeView',
  components: {
    Welcome, FeaturedVue
  }
}
</script>

<style scoped>
.home {
  background: linear-gradient(90deg, rgba(216,235,199,1) 0%, rgba(255,255,255,1) 99%);
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end; /* Align items to the end (right side) of the flex container */
}

.myimg {
  float: right; /* Float the image to the right */
  margin-left: 10px;
  margin-right: 130px;
  margin-top: 40px;
  width: 700px;
  height: auto;
}

/* Media query for small screens */
@media (max-width: 1068px) {
  .home {
    flex-direction: column;
     /* Change the direction to column for small screens */
  }

  .myimg {
    float: none; /* Remove the float for small screens */
    margin: 10px auto; /* Center the image horizontally with top margin */
  }
  .intro {
    text-align: center;
    padding: 5px;
    margin-top: -30px;
  }
}
</style>





