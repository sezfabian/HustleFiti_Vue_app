<template>
  <div>
    <main>
      <section class="absolute w-full h-full">
        <div
          class="absolute top-0 w-full h-full bg-#045b4c"
        ></div>
        <div class="container mx-auto px-4 h-full bg-#045b4c">
          <div class="flex content-center items-center justify-center h-full">
            <div class="w-full lg:w-5/12 px-4">
              <div
                class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0"
              >
                <div class="rounded-t mb-0 px-6 py-6">
                  <div class="text-center mb-3">
                    <h6 class="text-gray-600 text-sm font-bold">
                      Sign in with
                    </h6>
                  </div>
                  <div class="btn-wrapper text-center">
                    <button
                      class="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
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
                <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <div class="text-gray-700 text-center mb-3 font-bold">
                    <small>Or sign in with credentials</small>
                  </div>
                  <form>
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
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-gray-700 text-xs font-bold mb-2"
                        for="grid-password"
                        >Password</label
                      ><input
                        type="password"
                        v-model="user.password"
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Password"
                        style="transition: all 0.15s ease 0s;"
                        required
                      />
                    </div>
                    <div>
                      <label class="inline-flex items-center cursor-pointer"
                        ><input
                          id="customCheckLogin"
                          type="checkbox"
                          class="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
                          style="transition: all 0.15s ease 0s;"
                        /><span class="ml-2 text-sm font-semibold text-gray-700"
                          >Remember me</span
                        ></label
                      >
                    </div>
                    <div v-if="verify.isVisible" class="flash-message text-red-600">
                        {{ verify.message }}
                    </div>
                    <div class="text-center mt-6">
                      <button
                        class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                        type="button"
                        style="transition: all 0.15s ease 0s;"
                        @click="login()"
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                  <div class="flex flex-wrap mt-6">
                    <div class="w-1/2">
                        <a href="#forgot_password" class="text-gray-700 hover:text-red-500">
                        <small>Forgot password?</small>
                        </a>
                    </div>
                    <div class="w-1/2 text-right">
                        <a href="#signup" class="text-gray-700 hover:text-red-500">
                        <small>Create new account</small>
                        </a>
                    </div>
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
import axios from "axios";
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
        password: ""
      },
      verify: {
        password: "",
        isVisible: false,
        message: ""
      }
    };
  },
  methods: {
    login() {
      if (this.user.email === "" || this.user.password === "") {
        this.verify.isVisible = true;
        this.verify.message = "Please fill in all fields";
        return;
      }

      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.user.email);

      if (!isValidEmail) {
        this.verify.isVisible = true;
        this.verify.message = 'Invalid email format';
        return;
      } 

      axios.post(url + "/user/sessions", this.user)
        .then((response) => {
          console.log(response);
          router.push({ path: "/" });
        })
        .catch((error) => {
            this.verify.isVisible = true;
            this.verify.message = "Email or password is incorrect";
            console.log(error.response.data.detail);
        });
    },
    redirect(path) {
      router.push({ path: path });
    },

  }
}
</script>