<template>
  <div class="relative container mb-10 mt-10">
      <div class="text">
         Edit your : {{ editedService.name }} Service details
      </div>
      <div class="text-center mt-6">
        <div class="rounded-t mb-0 px-6 py-6">
          <div class="grid h-46 grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xxl:grid-cols-5 ms-6 mr-6">
              <img v-bind:src="getImageUrl(editedService.image_paths, 0)" class="rounded h-[200px] w-[200px] object-cover" alt="No image" />
              <img v-bind:src="getImageUrl(editedService.image_paths, 1)" class="rounded h-[200px] w-[200px] object-cover" alt="No image" />
              <img v-bind:src="getImageUrl(editedService.image_paths, 2)" class="rounded h-[200px] w-[200px] object-cover" alt="No image" />
              <img v-bind:src="getImageUrl(editedService.image_paths, 3)" class="rounded h-[200px] w-[200px] object-cover" alt="No image" />
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
          </div>
          <hr class="mt-6 border-b-1 border-gray-400" />
        </div>
      </div>
      <form @submit.prevent="submitForm">
         <div class="form-row">
            <div class="input-data">
              <select v-model="selectedCategory">
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
              <div class="underline"></div>
              <label for="category">Category:</label>
            </div>
         </div>
         <div class="form-row">
            <div class="input-data">
               <input v-model="editedService.name" type="text" required id="name" autocomplete="on">
               <div class="underline"></div>
               <label for="name">Service Name</label>
            </div>
         </div>
         <div class="form-row">
            <div class="input-data">
               <input v-model="editedService.service_category_id" type="text" required id="name" autocomplete="on">
               <div class="underline"></div>
               <label for="name">Service Name</label>
            </div>
         </div>
         <div class="form-row">
         <div class="input-data textarea">
            <textarea v-model="editedService.description" name="8" cols="80" required id="description"></textarea>
            <br />
            <div class="underline"></div>
            <label for="message">Description</label>
            <br />
         </div>
         </div>
         <div v-if="verify.isVisible" class="flash-message text-red-600">
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
  name: "EditService",
  props: {
      id: {
          type: String,
          required: true
      }
  },
  data() {
    return {
      editedService: {
        name: "",
        description: "",
        locations: "",
        service_category_id: "",
        image_paths: "",
      },
      
      verify: {
          isVisible: false,
          message: ""
      },
      categories: [],
    };
  },
  created() {
    this.fetchService();
  },
  methods: {
    fetchCategories() {
      this.$instance.get("/service_categories")
        .then((response) => {
          this.categories = response.data.map(category => {
          return {
            ...category,
          };
          });
        })
        .catch((error) => {
          console.log(error.response.data.detail);
        })
    },
    fetchService() {
      this.$instance.get("/services/" + this.id)
        .then(response => {
          this.editedService = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    submitForm() {
      this.$instance.put("/services/" + this.id, this.editedService)
        .then(response => {
          this.verify.isVisible = true;
          this.verify.message = "Service updated successfully";
        })
        .catch(error => {
          console.log(error);
          this.verify.isVisible = true;
          this.verify.message = "Something went wrong";
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
                    if (vm.editedService.image_paths === "") {
                        vm.editedService.image_paths = result.info.secure_url
                    } else {
                        vm.editedService.image_paths = vm.editedService.image_paths + ',' + result.info.secure_url
                    }
                    }
                }
            );
        widget.open();
    },
    // get image urls from service data
    getImageUrl(images, index) {
        if (images === "" || images === 'string') {
            return "https://i.postimg.cc/8zh6Fv2C/custom.png";
        }

        const path_split = images.split(',');
        
        if (path_split.length > index) {
            return path_split[index];
        }

        return "https://i.postimg.cc/8zh6Fv2C/custom.png";  
    },
  },
  mounted() {
    this.fetchService();
    this.fetchCategories();
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