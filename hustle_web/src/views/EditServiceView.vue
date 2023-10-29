<template>
  <div>
    <main>
        <section id="view" class="relative w-full h-full" >
            <div class="container mx-auto px-4 h-full">
                <div class="flex content-center items-center justify-center h-full">
                    <div class="w-full lg:w-10/12 px-4 mt-0">
                    <div class="relative flex flex-col min-w-100
                     break-words w-full mt-6 mb-6 shadow-lg rounded-lg bg-gray-200 border-0 form">
                        <div class="flex-auto px-4 lg:px-10 py-2 pt-0">
                            <div class="text-gray-700 text-center mb-5 font-bold text-lg">
                                <small>Edit Service Details</small>
                            </div>
                        <form>
                            <div class="relative w-full flex flex-col-auto mb-3">
                                <div class="relative w-full mb-3 flex flex-col me-4">
                                    <label
                                     class="block uppercase text-gray-700 text-xs font-bold mb-2"
                                     for="grid-password"
                                    >Service Name:</label>
                                    <input type="name"
                                     v-model="editedService.name"
                                     class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded
                                     text-sm shadow focus:outline-none focus:ring w-full"
                                     placeholder="My Service"
                                     style="transition: all 0.15s ease 0s;"
                                    required
                                    />
                                </div>
                            </div>

                            <div class="relative w-full flex flex-col-auto mb-3">
                                <div class="relative w-full mb-3 flex flex-col me-4">
                                    <label
                                     class="block uppercase text-gray-700 text-xs font-bold mb-2"
                                     for="grid-password"
                                    >Service Description:</label>
                                    <input type="name"
                                     v-model="editedService.description"
                                     class="border-0 px-3 py-3 h-[200px] placeholder-gray-400 text-gray-700 bg-white rounded
                                     overflow-y-auto text-sm shadow focus:outline-none focus:ring w-full"
                                     placeholder="My Service Description"
                                     style="transition: all 0.15s ease 0s; word-wrap: break-word;"
                                    required
                                    />
                                </div>
                            </div>

                            <div class="relative w-full flex flex-col-auto mb-3">
                                <div class="relative w-full mb-3 flex flex-col me-4">
                                    <label
                                     class="block uppercase text-gray-700 text-xs font-bold mb-2"
                                     for="grid-password"
                                    >Service Name:</label>
                                    <input type="name"
                                     v-model="editedService.name"
                                     class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded
                                     text-sm shadow focus:outline-none focus:ring w-full"
                                     placeholder="My Service"
                                     style="transition: all 0.15s ease 0s;"
                                    required
                                    />
                                </div>
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
                        <button class="bg-gray-900 text-white active:bg-gray-700
                             text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg
                             hover:bg-gray-700 outline-none focus:outline-none mr-1 mb-1 w-full"
                            type="button"
                            style="transition: all 0.15s ease 0s;"
                            @click="register()"> Sign up
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
  <EditService/>
</template>

<script>
import EditService from '@/components/EditService.vue';
const url = "http://13.234.17.232"

export default {
  name: "EditServiceView",
  props: {
      id: {
          type: String,
          required: true
      }
  },
  components: {
      EditService
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

      editedPricePackage: {
        duration: "",
        price: "",
      },

    }
  },

  methods: {
    fetchService() {
      this.$instance.get("/services/" + this.$route.params.id).then((response) => {
        this.editedService.name = response.data.name;
      })
      .catch(error => {
        console.log(error.response.data.detail);
      });
    },

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