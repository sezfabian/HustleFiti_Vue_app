<template>
  <div class="profile w-full relative">
    <img :src="profileBanner" class="h-[50vh] w-full object-cover">
    <div class="card object-top w-full flex top-[20px]">
      <div class="flex flex-col align-middle">
      </div>
    </div>
  </div>
    <div class="cards flex flex-col relative top-[-220px] mb-5">
      <div class="avatar object-left rounded-full w-[400px] z-10">
          <div class="rounded-full w-[300px] z-10 m-10 ms-9 bg-stone-100 dark:bg-black 
           absolute sm:w-[300px] md:w-[250px] max-w-[300px] top-[-130px] lg:top-[-130px]">
            <img :src="profileImage" alt="No image" class="rounded-full w-[260px]
            border-[10px] ms-5 object-cover" />
          </div>
        </div>
      <div class="card-body bg-stone-100 rounded-lg sm:ms-0 md:ms-10 lg:ms-[40px] lg:w-[400px] lg:mt-11 flex-col w-1/4 p-10 z-5 font-family: Poppins">
      <form class="sm:w-full md:w-full lg:w-full flex flex-col mt-16">
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
                        >{{ profile.phone_number }}</p>
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
                        @click="this.$router.push('/edit-profile')"
                      >
                        Edit Profile
                      </button>
                  </div>
      </div>
    <div class="relative flex flex-col justify-center lg:w-[68vw] w-full
     bg-stone-100 lg:left-[+490px] lg:top-[-540px] lg:rounded-lg">
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
            profileImage: '',
            profileBanner: '',
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
                    this.profileImage = response.data["user_image_path"]
                    this.profileBanner = response.data["user_banner_path"]
                })
                .catch((error) => {
                    console.log(error.response.data.detail)
                    console.log(this.$Cookies.get('email'))
                });
        },
        redirect(path) {
          router.push({ path: path });
        },
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
