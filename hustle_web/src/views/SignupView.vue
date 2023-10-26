<template>
  <div>
    <main>
      <section id="view" class="absolute w-full h-full" >
        <div
          class="absolute top-0 w-full h-full bg-#045b4c"
        ></div>
        <div class="container mx-auto px-4 h-full">
          <div class="flex content-center items-center justify-center h-full">
            <div class="w-full lg:w-5/12 px-4 mt-0">
              <div
                class="relative flex flex-col min-w-100 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0 form"
              >
                <div class="rounded-t mb-0 px-6 py-6">
                  <div class="text-center mb-3">
                    <h6 class="text-gray-600 text-sm font-bold">
                      Sign up with
                    </h6>
                  </div>
                  <div class="btn-wrapper text-center">
                    <button
                      class="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-2xl inline-flex items-center text-xs"
                      type="button"
                      style="transition: all 0.15s ease 0s;"
                    >
                      <img
                        alt="..."
                        class="w-5 mr-1"
                        src="../assets/img/google.svg"
                      />Google
                    </button>
                  </div>
                  <hr class="mt-6 border-b-1 border-gray-400" />
                </div>
                <div class="flex-auto px-4 lg:px-10 py-2 pt-0">
                  <div class="text-gray-700 text-center mb-5 font-bold text-lg">
                    <small>Or Register with your credentials</small>
                  </div>
                  <form>
                    <div class="relative w-full flex flex-col-auto mb-3">
                      <div class="relative w-full mb-3 flex flex-col me-4">
                        <label
                        class="block uppercase text-gray-700 text-xs font-bold mb-2"
                        for="grid-password"
                        >First name:</label
                        ><input
                        type="name"
                        v-model="user.first_name"
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="John"
                        style="transition: all 0.15s ease 0s;"
                        required
                        />
                      </div>
                      <div class="relative w-full mb-3 flex flex-col">
                        <label
                        class="block uppercase text-gray-700 text-xs font-bold mb-2"
                        for="grid-password"
                        >Last name:</label
                        ><input
                        type="name"
                        v-model="user.last_name"
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Doe"
                        style="transition: all 0.15s ease 0s;"
                        required
                        />
                      </div>
                    </div>
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-gray-700 text-xs font-bold mb-2"
                        for="grid-password"
                        >Username:</label
                      ><input
                        type="name"
                        v-model="user.username"
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Johdoe254"
                        style="transition: all 0.15s ease 0s;"
                        required
                      />
                    </div>
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-gray-700 text-xs font-bold mb-2"
                        for="grid-password"
                        >Email</label
                      ><input
                        type="email"
                        v-model="user.email"
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Email"
                        style="transition: all 0.15s ease 0s;"
                        required
                      />
                    </div>
                    <div class="relative w-full mb-3 flex">
                      <div class="relative w-full mb-3 flex flex-col me-4">
                      <label
                        class="block uppercase text-gray-700 text-xs font-bold mb-2"
                        for="grid-password"
                        >Password:</label
                      ><input
                        type="password"
                        v-model="user.password"
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Password"
                        style="transition: all 0.15s ease 0s;"
                        required
                      />
                      </div>
                      <div class="relative w-full mb-3 flex flex-col">
                      <label
                        class="block uppercase text-gray-700 text-xs font-bold mb-2"
                        for="grid-password"
                        >Retype Password:</label
                      ><input
                        type="password"
                        v-model="verify.password"
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Password"
                        style="transition: all 0.15s ease 0s;"
                        required
                      />
                      </div>
                    </div>
                    <div class="relative w-full mb-3 flex">
                      <div class="relative w-full mb-3 flex flex-col me-4">
                      <label
                        class="block uppercase text-gray-700 text-xs font-bold mb-2"
                        for="grid-password"
                        >Date of Birth:</label
                      ><input
                        type="date"
                        v-model="user.date_of_birth"
                        id="dateOfBirth"
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        style="transition: all 0.15s ease 0s;"
                        required
                        />
                      </div>
                      <div class="relative w-full mb-3 flex flex-col">
                      <label
                        class="block uppercase text-gray-700 text-xs font-bold mb-2"
                        for="grid-password"
                        >Gender:</label
                      ><select v-model="user.gender" id="gender"
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        required>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                      </select>
                      </div>
                    </div>
                    <div v-if="verify.isVisible" class="flash-message text-red-600">
                        {{ verify.message }}
                    </div>
                    <div class="text-center mt-6">
                      <button
                        class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg hover:bg-gray-700 outline-none focus:outline-none mr-1 mb-1 w-full"
                        type="button"
                        style="transition: all 0.15s ease 0s;"
                        @click="register()"
                      >
                        Sign up
                      </button>
                    </div>
                  </form>
                </div>
              <div class="flex flex-wrap mt-2 mb-4">
                <div class="w-1/2">
                    <a href="#signin" class="text-gray-700 hover:text-red-500 ms-10">
                        <small>Got an account?</small>
                    </a>
                </div>
                <div class="w-1/2 text-right">
                    <a href="#home" class="text-gray-700 hover:text-red-500 me-10">
                        <small>Not today?</small>
                    </a>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import router from "@/router";

const url = "http://13.234.17.232"

export default {
  name: "login-page",
  components: {

  },
  data() {
    return {
      user: {
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        username: "",
        date_of_birth: "",
        gender: "",
      },
      verify: {
        password: "",
        isVisible: false,
        message: ""
      }
    };
  },
  methods: {
    register() {
      if (this.user.email === "" || this.user.password === "" || this.user.first_name === "" || this.user.last_name === "" || this.user.username === "" || this.user.date_of_birth === "" || this.user.gender === "") {
        this.verify.isVisible = true;
        this.verify.message = "Please fill in all fields";
        return;          
      }

      if (this.user.password !== this.verify.password) {
        this.verify.isVisible = true;
        this.verify.message = "Passwords do not match";
        return;
      }

      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.user.email);
      const str = this.user.password
      const isValidPassword = /[A-Z]/.test(str) && /[0-9]/.test(str) && /[!@#$%^&*]/.test(str) && str.length >= 8 && /[a-z]/.test(str);
      
      if (!isValidEmail) {
        this.verify.isVisible = true;
        this.verify.message = 'Invalid email format';
        return;
      } else if (!isValidPassword) {
        this.verify.isVisible = true;
        this.verify.message = 'Password must contain at least one uppercase letter, one digit, one special character, and be at least 8 characters long';
        return;
      }

      axios.post(url + "/user/register", this.user)
        .then((response) => {
          console.log("Registration Success");
          router.push({ path: "/" });
        })
        .catch((error, response) => {
          if (error.response) {
            this.verify.isVisible = true;
            this.verify.message = error.response.data.detail;
            console.log(error.response.data.detail);
          }
        });
    },
    redirect(path) {
      router.push({ path: path });
    },

  }
}
</script>

<style>
#view {
    background: linear-gradient(90deg, rgba(216,235,199,1) 0%, rgba(255,255,255,1) 99%)
}
@media (max-width: 1068px) {
  .form {
    width: 140%;
  }
}

</style>