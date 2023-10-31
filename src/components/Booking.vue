<template>
  <div class="relative container mb-10 mt-10">
      <div class="text">
         Book service : {{ Service.name }}
      </div>
      <form @submit.prevent="submitForm">
         <div class="form-row justify-center w-full">
             <iframe class="w-full"
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127641.17044273233!2d36.76499551171281!3d-1.303035977718309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi!5e0!3m2!1sen!2ske!4v1698728482292!5m2!1sen!2ske" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
         </div>
         <div class="form-row">
            <div class="input-data">
               <input v-model="contract.map_link" type="text" required id="name" autocomplete="on">
               <div class="underline"></div>
               <label for="name"> Paste Map Pin Location Link:</label>
            </div>
         </div>
         
         <div class="form-row">
            <div class="input-data">
               <input v-model="contract.contract_start_date" type="datetime-local" required id="dateOfBirth" autocomplete="on"
                class="text-white focus:text-gray-900 valid:text-black">
               <div class="underline"></div>
               <label for="date z-2">Start Date & Time:</label>
            </div>
             <div class="input-data">
               <input v-model="contract.contract_end_date" type="datetime-local" required id="dateOfBirth" autocomplete="on"
                class="text-white focus:text-gray-900 valid:text-black">
               <div class="underline"></div>
               <label for="date z-2">Start Date & Time:</label>
            </div>
         </div>

         <div class="form-row">
            <div class="input-data">
               <input v-model="contract.duration" type="number" required id="duration" autocomplete="on">
               <div class="underline"></div>
               <label for="password">Duration in Hours:</label>
            </div>
         </div>

         <div class="form-row">
            <div class="input-data">
              <select v-model="contract.price_package_id">
                <option class="max-w-full overflow-y-scroll"
                 name="8" cols="80"
                 v-for="pricePackage in Service.price_packages" :key="pricePackage.id" :value="pricePackage.id">
                  {{ pricePackage.name }} - Ksh: {{ pricePackage.price }} - {{ pricePackage.description }}
                </option>
              </select>
              <div class="underline"></div>
              <label for="price_package">Price package:</label>
            </div>
         </div>

        <div v-if="verify.isVisible" class="flash-message flex text-center justify-center text-red-600">
            {{ verify.message }}
         </div>
         <div class="form-row flex justify-center submit-btn" @click="submitForm()">
               <div class="input-data inline-flex items-center ">
                  <div class="inner"></div>
                  <input type="submit" value="Get Service">
               </div>
        </div>
        <div class="flex flex-wrap ms-4 me-4 mt-6 mb-4">
            <div class="w-1/2">
                <a href="#services" class="text-gray-700 text-lg hover:text-red-500">
                    <small>Go back?</small>
                </a>
            </div>
        </div>
      </form>
      </div>
</template>

<script>

export default {
  name: "BookingVue",
  props: {
      serviceId: {
          type: String,
          required: true
      }
  },

  data () {
    return {
      locations: [],
      mapLink: "",
      price_packages: [],

      contract: {
        service_id: "",
        location: "",
        map_link: "",
        duration: "1",
        price_package_id: "",
        total_amount: 0,
        contract_start_date: "",
        contract_end_date: "",
        contract_status: "Pending"
      },

      Service: {
        name: "",
        description: "",
        locations: "",
        service_category_id: "",
        sub_category: "",
        image_paths: "",
        price_packages: []
      },

      verify: {
        isVisible: false,
        message: ""
      },
      service_id: "",
    };
  },

   computed: {
    isStartDateValid() {
      const startDate = new Date(this.contract.contract_start_date);
      const currentDate = new Date();
      return startDate >= currentDate;
    },
    isEndDateValid() {
      const startDate = new Date(this.contract.contract_start_date);
      const endDate = new Date(this.contract.contract_end_date);
      return endDate >= startDate;
    },

  },
  watch: {
    'contract.contract_start_date'(newValue) {
      const startDate = new Date(newValue);
      const currentDate = new Date();
      if (startDate < currentDate) {
        this.contract.contract_start_date = ''; // Clear the start date if it's earlier than the current date
      }
    },
    'contract.contract_end_date'(newValue) {
      const startDate = new Date(this.contract.contract_start_date);
      const endDate = new Date(newValue);
      if (endDate < startDate) {
        this.contract.contract_end_date = ''; // Clear the end date if it's earlier than the start date
      }
    }
  },

  methods: {
    fetchService() {
      console.log(this.$route.params.serviceId.replace(':', ''));
      this.$instance.get("/services/" + this.$route.params.serviceId.replace(':', ''))
        .then(response => {
          this.Service = response.data;
          console.log(this.Service);
        })
        .catch(error => {
          console.log(error);
        });
    },

    submitForm() {

      if (this.contract.map_link === "") {
        this.verify.isVisible = true;
        this.verify.message = "Please paste your location map link";
        return;
      }

      if (!this.isStartDateValid) {
        this.verify.isVisible = true;
        this.verify.message = "Please select a valid start date";
        return;
      }

      if (!this.isEndDateValid) {
        this.verify.isVisible = true;
        this.verify.message = "Please select a valid end date";
        return;
      }
      this.contract.service_id = this.Service.id;
      console.log(this.contract);
      this.$instance.post("/contract/create/", this.contract, { 
        params: { 
          "encrypted_session_id": this.$Cookies.get("session_id") 
        } 
      })
        .then(response => {
            this.verify.isVisible = true;
            this.verify.message = "Booking successful";
            this.$router.push({ path: "/profile" });
        })
        .catch(error => {
            console.log(error);
            this.verify.isVisible = true;
            this.verify.message = error.response.data.detail;
        })
    },
  },
  created () {
    this.fetchService();
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
form .form-row .textarea .option{
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