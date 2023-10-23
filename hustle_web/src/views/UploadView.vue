<template>
    <h1> Upload Image </h1>
    <button @click="openUploadWidget()"> Upload </button>
</template>

<script>
export default {
    methods: {
        openUploadWidget() {
            const widget = window.cloudinary.openUploadWidget({
                cloudName: 'dizc06lpa', upload_preset: "ocsywmks"
                }, function(error, result) {
                    if (!error && result && result.event === "success") {
                    console.log('Done! Here is the image info: ', result.info);
                    }
                }
            );
            widget.open();
        }
    }
}
</script>

<style>

</style>