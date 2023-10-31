<template>
  <div class="relative container mb-10 mt-10">
      <div class="text">
         Edit Profile : {{ editedUser.first_name }} {{ editedUser.last_name }}
      </div>
      <div class="text-center mt-6">
        <div class="rounded-t mb-0 px-6 py-6">
          <div class="grid h-46 grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xxl:grid-cols-5 ms-6 mr-6">
              <h2> Banner Image </h2>
              <img v-bind:src="editedUser.user_banner_path" class="rounded h-[200px] w-[200px] object-cover" alt="No image" />
          </div>
          <div class="btn-wrapper mt-8 text-center">
              <button class="bg-white active:bg-gray-100 text-gray-800
               font-normal px-4 py-2 rounded outline-none focus:outline-none
               mr-1 mb-1 uppercase shadow hover:shadow-2xl inline-flex items-center text-xs"
               type="button"
               @click="openUploadWidgetBanner()"
               style="transition: all 0.15s ease 0s;">
               <img alt="..." class="w-5 mr-1" src="../assets/img/image.svg"/>Upload Image
              </button>
              <button class="bg-white active:bg-gray-100 text-gray-800
               font-normal px-4 py-2 rounded outline-none focus:outline-none
               mr-1 mb-1 uppercase shadow hover:shadow-2xl inline-flex items-center text-xs"
               type="button"
               @click="deleteBannerImage()"
               style="transition: all 0.15s ease 0s;">
               <img alt="..." class="w-5 ms-5 mr-1" src="../assets/img/trash.svg"/>Delete Image
              </button>
          </div>
          <div class="grid h-46 grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xxl:grid-cols-5 ms-6 mr-6">
              <h2> Profile Image </h2>
              <img v-bind:src="editedUser.user_image_path" class="rounded h-[200px] w-[200px] object-cover" alt="No image" />
          </div>
          <div class="btn-wrapper mt-8 text-center">
              <button class="bg-white active:bg-gray-100 text-gray-800
               font-normal px-4 py-2 rounded outline-none focus:outline-none
               mr-1 mb-1 uppercase shadow hover:shadow-2xl inline-flex items-center text-xs"
               type="button"
               @click="openUploadWidget()"
               style="transition: all 0.15s ease 0s;">
               <img alt="..." class="w-5 mr-1" src="../assets/img/image.svg"/>Upload Image
              </button>
              <button class="bg-white active:bg-gray-100 text-gray-800
               font-normal px-4 py-2 rounded outline-none focus:outline-none
               mr-1 mb-1 uppercase shadow hover:shadow-2xl inline-flex items-center text-xs"
               type="button"
               @click="deleteImage()"
               style="transition: all 0.15s ease 0s;">
               <img alt="..." class="w-5 ms-5 mr-1" src="../assets/img/trash.svg"/>Delete Image
              </button>
          </div>
          <hr class="mt-6 border-b-1 border-gray-400" />
        </div>
      </div>
      <form @submit.prevent="submitForm">
         <div class="form-row">
            <div class="input-data">
               <input v-model="editedUser.username" type="text" optional id="sub_Category" autocomplete="on">
               <div class="underline"></div>
               <label for="name">Username:</label>
            </div>
         </div>
         <div class="form-row">
            <div class="input-data">
               <input v-model="editedUser.phone_number" type="phone" required id="phone" autocomplete="on">
               <div class="underline"></div>
               <label for="name">Phone or Mobile:</label>
            </div>
         </div>
         <div class="form-row">
            <div class="input-data">
               <input v-model="editedUser.date_of_birth" type="date" required id="date_of_birth" autocomplete="on">
               <div class="underline"></div>
               <label for="name">Date of Birth:</label>
            </div>
         </div>
         
         <div v-if="verify.isVisible" class="flash-message flex justify-center text-center text-red-600">
            {{ verify.message }}
         </div>
         <div class="form-row flex justify-center submit-btn" @click="submitForm()">
               <div class="input-data">
                  <div class="inner"></div>
                  <input type="submit" value="Save Changes">
               </div>
        </div>
        <div class="flex flex-wrap ms-4 me-4 mt-6 mb-4">
            <div class="w-1/2">
                <a href="#profile" class="text-gray-700 text-lg hover:text-red-500">
                    <small>Dismiss Changes</small>
                </a>
            </div>
            <div class="w-1/2 text-right">
                <a @click="deleteUser()" class="text-gray-700 text-lg hover:cursor-pointer hover:text-red-500">
                    <small>Delete My Account</small>
                </a>
            </div>
        </div>
      </form>
      </div>
</template>

<script>
import router from '@/router/index.js';

export default {
  name: "EditProfileVue",
  props: {
      id: {
          type: String,
          required: true
      }
  },
  data() {
    return {
      editedUser: {
        username: "",
        phone_number: "",
        date_of_birth: "",
        user_image_path: "",
        user_banner_path: "",
      },

      verify: {
        isVisible: false,
        message: ""
    },
    };
  },

  created() {
    this.fetchUser();
  },

  methods: {
    fetchUser() {
      this.$instance.get("/user/profile",  {
        params: {
          "encrypted_session_id": this.$Cookies.get("session_id")
        },
        withCredentials: true })
        .then((response) => {
          console.log(response.data)
          this.editedUser = response.data
        })
        .catch((error) => {
          console.log(error.response.data.detail)
        });
        },
    submitForm() {
      this.$instance.put("/user/profile", this.editedUser, {
        params: {
          "encrypted_session_id": this.$Cookies.get("session_id")
        }
      })
        .then((response) => {
          this.verify.isVisible = true;
          this.verify.message = "Profile updated successfully";
          setTimeout(() => {
            this.verify.isVisible = false;
            router.push("/profile");
          }, 1000);
        })
        .catch((error) => {
          console.log(error.response.data.detail);
          this.verify.isVisible = true;
          this.verify.message = error.response.data.detail;
        })
    },

    // Open cloudinary image upload widget
    openUploadWidget() {
        const vm = this;
            const widget = window.cloudinary.openUploadWidget({
                cloudName: 'dizc06lpa', upload_preset: "ocsywmks"
                }, function(error, result) {
                    if (!error && result && result.event === "success") {
                    console.log('Done! Here is the image info: ', result.info);
                    vm.editedUser.user_image_path = result.info.secure_url;
                    }
                }
            );
        widget.open();
    },

    openUploadWidgetBanner() {
        const vm = this;
            const widget = window.cloudinary.openUploadWidget({
                cloudName: 'dizc06lpa', upload_preset: "ocsywmks"
                }, function(error, result) {
                    if (!error && result && result.event === "success") {
                    console.log('Done! Here is the image info: ', result.info);
                    vm.editedUser.user_banner_path = result.info.secure_url;
                    }
                }
            );
        widget.open();
    },
    // delete image
    deleteImage() {
        this.editedUser.user_image_path = "";
        return;
    },

    deleteBanner() {
        this.editedUser.user_banner_path = "";
        return;
    },
    deleteUser() {
        this.$instance.delete("/user/profile", {
            params: {
                "encrypted_session_id": this.$Cookies.get("session_id")
            }
        })
        .then(response => {
            this.verify.isVisible = true;
            this.verify.message = "Profile deleted successfully";
        })
        .catch(error => {
            console.log(error.response.data.detail);
            this.verify.isVisible = true;
            this.verify.message = error.response.data.detail;
        })
    }
  },
  mounted() {
    this.fetchUser();
  },


}
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
  max-width: 90vw;
  background: #ffffff;
  width: 1000px;
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
.input-data input, select,
.textarea textarea{
  display: block;
  width: 100%;
  height: 100%;
  border: none;
  font-size: 17px;
  border-bottom: 2px solid rgba(0,0,0, 0.12);
}
.input-data input:focus ~ label, .textarea textarea:focus ~ label,
.input-data input:valid ~ label, .textarea textarea:valid ~ label,
.input-data select:focus ~ label, .select select:valid ~ label
{
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
.input-data select:focus ~ .underline:before,
.input-data select:valid ~ .underline:before,
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
    width: 40%!important;
  }
}
</style>