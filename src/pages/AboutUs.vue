<script>
import AboutUsContent from '../components/AboutUsContent.vue';

export default {
  name: 'AboutUs',
  components: {
    AboutUsContent
  },
  methods: {
    goBack() {
      console.log("Go back button clicked");
      this.$router.go(-1);
    }
  }
}
</script>

<template>
  <div class="about-us">
    <AboutUsContent />
    <div class="text-center my-5">
      <button class="btn btn-primary mb-5" @click="goBack" @touchstart="goBack">Torna Indietro</button>
    </div>
  </div>
</template>
  

  
<style scoped>
.about-us {
  font-family: 'Merriweather', serif; 
  background-color: white; 
}

.btn-primary {
  background-color: #FE5D26; 
  border-color: #FE5D26;
  font-size: 1.2em;
  padding: 10px 20px;
}

.btn-primary:hover {
  background-color: lighten(#FE5D26, 10%);
  border-color: lighten(#FE5D26, 10%);
}
</style>