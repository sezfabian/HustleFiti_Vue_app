<template>
  <div class="profile w-full relative">
    <img src="../assets/img/green.png" class="h-[50vh] w-full object-cover">
    <div class="card object-top w-full flex top-[20px]">
      <div class="flex flex-col align-middle">
      </div>
    </div>
  </div>
    <div class="cards flex flex-col w-full relative top-[-220px] mb-5">
      <div class="avatar object-left  w-[400px] z-10">
          <div class="rounded-tl-[100%] rounded-br-[100%] z-10 m-10 bg-stone-100 dark:bg-black 
           absolute sm:w-[400px] md:w-[350px] top-[-130px] lg:top-[-220px]">
            <img src="../assets/img/hustle.png" />
          </div>
        </div>
      <div class="card-body bg-stone-100 rounded-lg sm:ms-0 md:ms-10 lg:ms-[40px] lg:w-[400px] lg:mt-11 flex-col w-1/4 p-10 z-5 font-family: Poppins">
      <form class="sm:w-full md:w-full lg:w-full flex flex-col">
        <h1 class="text-3xl text-green-900 font-bold text-center  mb-4 z-10 username">{{profile.username}}</h1>
        <star-rating v-model:rating="profile.average_rating" disabled star-size="40" class="ms-10"></star-rating>
                    <div class="relative w-full flex flex-col">
                      <div class="relative mb-3  w-full flex flex-col-me">
                        <label
                        class="uppercase text-green-900 flex text-xs me-6 font-bold mt-4"
                        for="grid-password"
                        >name:</label>
                        <p class="text-black text-l
                        flex mt-3"
                        >{{ profile.first_name }} {{ profile.last_name }}</p> 
                      </div>
                    </div>
                    <div class="relative w-full flex flex-cols mb-3">
                      <label
                        class="block uppercase text-green-900 text-xs  me-5 font-bold mt-4"
                        for="grid-password"
                        >Email:</label>
                       <p class="text-black text-l
                        mt-3"
                        >{{ profile.email }}</p>
                    </div>
                      <div class="relative w-full flex mb-3">
                      <label
                        class="block uppercase text-green-900 text-xs  me-4 font-bold mt-4"
                        for="grid-password"
                        >Phone:</label>
                      <p class="text-black text-l
                        flex mt-3"
                        >{{ profile.phone }}</p>
                    </div>
                    <div class="relative w-full flex mb-3">
                      <label
                        class="block uppercase text-green-900 text-xs  me-4 font-bold mt-4"
                        for="grid-password"
                        >Gender:</label>
                      <p class="text-black text-l
                        flex mt-3"
                        >{{ profile.gender }}</p>
                    </div>
                    <div class="relative w-full flex mb-3">
                      <label
                        class="block uppercase text-green-900 text-xs  me-4 font-bold mt-4"
                        for="grid-password"
                        >Phone:</label>
                      <p class="text-black text-l
                        flex mt-3"
                        > </p>
                    </div>
                  </form>
                  <div class="text-center flex mt-6">
                      <button
                        class="bg-green-900 text-white active:bg-gray-700 text-sm
                         font-bold uppercase px-6 py-3 rounded-full shadow hover:shadow-lg
                         hover:bg-green-700 outline-none focus:outline-none mr-1 mb-1 w-full"
                        type="button"
                        style="transition: all 0.15s ease 0s;"
                      >
                        Edit Profile
                      </button>
                  </div>
      </div>
    <div class="relative flex flex-col justify-center w-full lg:w-[70vw] md:w-[30vw]  bg-stone-100 lg:left-[+490px] lg:top-[-475px] lg:rounded-lg">
      <ul class="lg:flex hover:cursor-pointer justify-between mb-5 ml-10 mt-5">
        <li class="flex-grow">

          <div type="button">
           <a class="uppercase text-green-900 flex text-xs me-6 font-bold mt-4 
            hover:underline hover:text-teal-600"
            >Summary</a>
          </div>
        </li>
        <li class="flex-grow">
          <a class="uppercase text-green-900 flex text-xs me-6 font-bold mt-4 
            hover:underline hover:text-teal-600"
            >My Contractcs</a>
        </li>
        <li class="flex-grow">
            <a class="uppercase text-green-900 flex text-xs me-6 font-bold mt-4 
            hover:underline  hover:cursor-pointer hover:text-teal-600"
            @click=""
            >My Services</a>
        </li>
        <li type="button" class="flex-grow hover:cursor-pointer">
            <a class="uppercase text-green-900 flex text-xs me-6 font-bold mt-4 
            hover:underline  hover:cursor-pointer hover:text-teal-600"
            >Reviews</a>
        </li>
      </ul>
      <userServices/>
      <div class="text-center justify-center flex mt-6">
          <button
            class="bg-green-900 text-white text-sm font-bold uppercase px-6 py-3
            rounded-full shadow hover:bg-green-700 outline-none focus:outline-none mr-1 mb-1 w-[200px]"
            type="button"
            style="transition: all 0.15s ease 0s;"
            @click="redirect('/add_service')"
            > Add Service
          </button>
      </div>
    </div>
  </div>

</template>


<script>
import UserServices from '@/components/UserServices.vue'
import NewService from '@/components/NewService.vue'
import StarRating from 'vue-star-rating'
import router from "@/router";
import NewServiceVue from '@/components/NewService.vue'


export default {
    components: {
        StarRating, UserServices, NewService
    },
    data() {
        return {
            isNewService: false,
            profile: {},
            isEditing: false, 
            encrypted_session_id: this.$Cookies.get('session_id')
        }
    },
    methods: {
        getUser() {
            this.$instance.get("/user/profile",  {
                params: {
                  "encrypted_session_id": this.encrypted_session_id
                },
                withCredentials: true })
                .then((response) => {
                    console.log(response.data)
                    this.profile = response.data
                    this.$Cookies.set('user_id', response.data["id"])
                })
                .catch((error) => {
                    console.log(error.response.data.detail)
                    console.log(this.$Cookies.get('email'))
                });
        },
        redirect(path) {
          router.push({ path: path });
        },
        toogleNewService() {
            this.isNewService = !this.isNewService
        }
    },
    created() {
        this.getUser()
    }
}
</script>

<style scoped>
.avatar .card-body {
  background-color: #d5e4d8;
}
@media screen and (max-width: 720px) {
  .avatar {
    width: 60vw;
  }
  .card-body {
    width: 100vw;
    padding-top: 100px;
  }
  .username {
    font-size: 3rem;
  }
}

@media screen and (max-width: 1008px) {
  .avatar {
    width: 100vw;
  }
  h1 {
    font-size: 1.5rem;
    background-color: transparent;
    border-radius: 20px;
  }

  a {
    font-size: 1rem;
  }
  .card-body {
    width: 100vw;
    padding-top: 130px;
    margin: 0;
  }
  .username {
    font-size: 3rem;
  }
}

</style>
