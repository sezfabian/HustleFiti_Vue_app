<template>
  <div class="relative container mb-10 mt-10">
      <div class="text">
         Log in to your account
      </div>
      <form @submit.prevent="submitForm">
         <div class="form-row">
            <div class="input-data">
               <input v-model="user.email" type="text" required id="name" autocomplete="on">
               <div class="underline"></div>
               <label for="name">Email</label>
            </div>
         </div>
         <div class="form-row">
            <div class="input-data">
               <input v-model="user.password" type="password" required id="email" autocomplete="on">
               <div class="underline"></div>
               <label for="password">Password</label>
            </div>
         </div>
         <div class="flex justify-center">
            <label class="inline-flex items-center cursor-pointer">
                <input id="customCheckLogin"
                 type="checkbox"
                 class="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
                 style="transition: all 0.15s ease 0s;"/>
                    <span class="ml-2 ms-4 text-sm font-semibold text-gray-700"
                    >Remember me</span>
            </label>
        </div>
         <div v-if="verify.isVisible" class="flash-message text-red-600">
            {{ verify.message }}
         </div>
         <div class="form-row flex justify-center submit-btn" @click="login()">
               <div class="input-data inline-flex items-center ">
                  <div class="inner"></div>
                  <input type="submit" value="Sign In">
               </div>
        </div>
        <div class="flex flex-wrap ms-4 me-4 mt-6 mb-4">
            <div class="w-1/2">
                <a href="#forgot_password" class="text-gray-700 text-lg hover:text-red-500">
                    <small>Forgot password?</small>
                </a>
            </div>
            <div class="w-1/2 text-right">
                <a href="#signup" class="text-gray-700 text-lg hover:text-red-500">
                    <small>Create new account</small>
                </a>
            </div>
        </div>
      </form>
      </div>
</template>

<script>
import router from '@/router/index.js';

export default {
  name: "ContactForm",

  data() {
    return {
      user: {
        email: "",
        password: "",
        cookie: document.cookie
      },
      verify: {
        password: "",
        isVisible: false,
        message: ""
      },
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

      this.$instance.post("/user/sessions", this.user, { withCredentials: true , headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        },)
        .then((response) => {
          console.log(response.data.email);
          console.log(response.headers);
          this.verify.isVisible = true;
          this.verify.message = "Login successful";
          this.$Cookies.set('email', response.data["email"]);
          this.$Cookies.set('session_id', response.data["encrypted_session_id"]);
          setTimeout(() => {
            router.push({ path: "/services" });
          }, 1000);
          return;
        })
        .catch((error) => {
            this.verify.isVisible = true;
            this.verify.message = "Email or password is incorrect";
        });
    },
    redirect(path) {
      router.push({ path: path, force: true });
    }
  }
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');
*{
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
body{
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 10px;
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(115deg, #27c279 10%, #64c46c 90%);
}
.container{
  max-width: 80vw;
  background: #ffffff;
  width: 700px;
  padding: 25px 40px 10px 40px;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
}
.container .text{
  text-align: center;
  font-size: 41px;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  background: -webkit-linear-gradient(right, #11464b, #468681, #31494b, #0f6432);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.container form{
  padding: 30px 0 0 0;
}
.container form .form-row{
  display: flex;
  margin: 32px 0;
}
form .form-row .input-data{
  width: 100%;
  height: 40px;
  margin: 0 20px;
  position: relative;
}
form .form-row .textarea{
  height: 150px;
}
.input-data input,
.textarea textarea{
  display: block;
  width: 100%;
  height: 100%;
  border: none;
  font-size: 17px;
  border-bottom: 2px solid rgba(0,0,0, 0.12);
}
.input-data input:focus ~ label, .textarea textarea:focus ~ label,
.input-data input:valid ~ label, .textarea textarea:valid ~ label{
  transform: translateY(-20px);
  font-size: 14px;
  color: #08121f;
}

.textarea textarea:focus ~ label,
.textarea textarea:valid ~ label{
  transform: translateY(-60px);
}
.textarea textarea{
  resize: none;
  padding-top: 10px;
}
.input-data label{
  position: absolute;
  left: 0%;
  align-content: left;
  pointer-events: none;
  bottom: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
}
.textarea label{
  bottom: 80px;
  background: #fff;
}
.input-data .underline{
  position: absolute;
  left: 0%;
  bottom: 0;
  height: 2px;
  width: 100%;
}
.input-data .underline:before{
  position: absolute;
  left: 0%;
  content: "";
  height: 2px;
  width: 100%;
  background: #123b0d;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.3s ease;
}
.input-data input:focus ~ .underline:before,
.input-data input:valid ~ .underline:before,
.textarea textarea:focus ~ .underline:before,
.textarea textarea:valid ~ .underline:before{
  transform: scale(1);
}

.submit-btn{
  width: 100%;
  left: 17vw;
  margin: auto;
}
.submit-btn .input-data{
  overflow: hidden;
  height: 45px!important;
  width: 25%!important;
  border-radius: 5px;
}
.submit-btn .input-data .inner{
  height: 100%;
  width: 300%;
  position: absolute;
  left: -100%;
  background: -webkit-linear-gradient(right, #0b292c, #153823, #548a5c, #4f796c);
  transition: all 0.4s;
}
.submit-btn .input-data:hover .inner{
  left: 0;
}
.submit-btn .input-data input{
  background: none;
  border: none;
  color: #fff;
  font-size: 17px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  position: relative;
  z-index: 2;
}
@media (max-width: 700px) {
  .container .text{
    font-size: 30px;
  }
  .container form{
    padding: 10px 0 0 0;
  }
  .container form .form-row{
    display: block;
  }
  form .form-row .input-data{
    margin: 35px 0!important;
  }
  .submit-btn .input-data{
    width: 100%!important;
  }
}
</style>