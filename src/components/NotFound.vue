<template>
    <div class="container d-flex justify-content-center flex-column align-items-center pt-5">
      <h2 class="fw-bold fs-1 text-center mb-4">Oops! <br> Questa pagina non esiste, torna alla home :-)</h2>
      <h3 class="fw-bold mb-5">404</h3>
  
      <router-link id="home-btn" class="btn btn-outline-success py-2 custom-button" :to="{ name: 'home' }">Home</router-link>
    </div>
  </template>
<script>
export default {
  name: 'NotFound'
};
</script>

<style scoped lang="scss">

.container{
    height:calc(100vh - 80px);

  .btn-outline-success {
    --bs-btn-color: #FE5D26;
    --bs-btn-border-color:#FE5D26;
    --bs-btn-hover-bg: #FE5D26;
    --bs-btn-hover-border-color: #ffffff;
    --bs-btn-active-bg: #FE5D26;
    --bs-btn-active-border-color: #FE5D26;
    --bs-btn-disabled-color: #FE5D26;
    --bs-btn-disabled-border-color: #FE5D26;
    --bs-btn-background-color: #FE5D26;
    font-weight: bold;
    color: white;
    background-color: #FE5D26;
  }

  h3{
    color: #FE5D26;
  }
  h2{
    color: #7EBC89;
  }
}

</style>