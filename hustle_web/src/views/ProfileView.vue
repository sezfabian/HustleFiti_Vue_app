<template>
  <div class="profile w-full absolute">
    <img src="../assets/img/green.png" class="h-[50vh] w-full object-cover">
    <div class="card object-top w-full flex top-[20px]">
      <div class="flex flex-col align-middle">
        <div class="avatar object-left  w-[400px] z-10">
          <div class="rounded-tl-[100%] rounded-br-[100%] z-10 m-10 bg-emerald-100 absolute sm:w-[400px] md:w-[350px] lg top-[-15px]">
            <img src="../assets/img/hustle.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
    <div class="mycards flex flex-row relative">
      <div class="card-body bg-green-100  rounded-lg sm:ms-0 md:ms-10 lg:ms-[40px] lg:mt-11 flex flex-col w-half absolute p-10 top-[200px] z-5 font-family: Poppins">
      <div class="w-full">
      <form class="sm:w-full md:w-full lg:w-full flex flex-col">
        <h1 class="text-3xl font-bold text-center  mb-4 z-10 username">{{profile.username}}</h1>
        <star-rating v-model:rating="profile.average_rating" animate=false disabled star-size="40" class="ms-10"></star-rating>
                    <div class="relative w-full flex flex-col">
                      <div class="relative mb-3  w-full flex flex-col-me">
                        <label
                        class="uppercase text-gray-700 flex text-xs me-6 font-bold mt-4"
                        for="grid-password"
                        >name:</label>
                        <p class="text-gray-900 text-l
                        flex mt-3"
                        >{{ profile.first_name }} {{ profile.last_name }}</p> 
                      </div>
                    </div>
                    <div class="relative w-full flex mb-3">
                      <label
                        class="block uppercase text-gray-700 text-xs  me-5 font-bold mt-4"
                        for="grid-password"
                        >Email:</label
                      >
                       <p class="text-gray-900 text-l
                        flex mt-3"
                        >{{ profile.email }}</p>
                    </div>
                      <div class="relative w-full flex mb-3">
                      <label
                        class="block uppercase text-gray-700 text-xs  me-4 font-bold mt-4"
                        for="grid-password"
                        >Phone:</label>
                      <p class="text-gray-900 text-l
                        flex mt-3"
                        >{{ profile.phone }}</p>
                    </div>
                    <div class="relative w-full flex mb-3">
                      <label
                        class="block uppercase text-gray-700 text-xs  me-4 font-bold mt-4"
                        for="grid-password"
                        >Gender:</label>
                      <p class="text-gray-900
                        flex mt-3"
                        >{{ profile.gender }}</p>
                    </div>
                    <div class="relative w-full flex mb-3">
                      <label
                        class="block uppercase text-gray-700 text-xs  me-4 font-bold mt-4"
                        for="grid-password"
                        >Phone:</label>
                      <p class="text-gray-900 text-l
                        flex mt-3"
                        > </p>
                    </div>
                  </form>
                  <div class="text-center mt-6">
                      <button
                        class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded-full shadow hover:shadow-lg hover:bg-gray-700 outline-none focus:outline-none mr-1 mb-1 w-full"
                        type="button"
                        style="transition: all 0.15s ease 0s;"
                      >
                        Edit Profile
                      </button>
                    </div>
        </div>
      </div>
  </div>
</template>


<script>
import StarRating from 'vue-star-rating'

export default {
    components: {
        StarRating
    },
    data() {
        return {
            profile: {},
            isEditing: false, 
            encrypted_session_id: this.$Cookies.get('session_id')
        }
    },
    methods: {
        getUser() {
            console.log(this.$Cookies.get('email'))
            console.log(this.$Cookies.get('session_id'))
            this.$instance.get("/user/profile",  {
                params: {
                  "encrypted_session_id": this.encrypted_session_id
                },
                withCredentials: true })
                .then((response) => {
                    console.log(response.data)
                    this.profile = response.data
                    
                })
                .catch((error) => {
                    console.log(error.response.data.detail)
                    console.log(this.$Cookies.get('email'))
                });
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

@media screen and (max-width: 808px) {
  .avatar {
    width: 100vw;
  }
  h1 {
    font-size: 1px;
    background-color: transparent;
    border-radius: 20px;
  }
  .card-body {
    width: 100vw;
    padding-top: 100px;
  }
  .username {
    font-size: 3rem;
  }
}

</style>
