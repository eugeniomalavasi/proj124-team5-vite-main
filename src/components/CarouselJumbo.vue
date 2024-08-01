<script>
    import SearchBar from "../components/SearchBar.vue"
    import {VueWriter} from 'vue-writer';
    export default {
            name: "CarouselJumbo",
            components:{VueWriter, SearchBar }
        }
</script>

<template>
    <div class="wrapper">
        <div class="carousel-wrapper">
            <div class="carousel slide" data-bs-ride="carousel" data-bs-interval="4000">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="/src/assets/jumbo/jumbo_1.avif" alt="jumbo_img1">
                    </div>
                    <div class="carousel-item">
                        <img src="/src/assets/jumbo/jumbo_2.avif"  alt="jumbo_img2">
                    </div>
                    <div class="carousel-item">
                        <img src="/src/assets/jumbo/jumbo_3.avif"  alt="jumbo_img3">
                    </div>
                    <div class="carousel-item">
                        <img src="/src/assets/jumbo/jumbo_4.avif"  alt="jumbo_img4">
                    </div>
                    <div class="carousel-item">
                        <img src="/src/assets/jumbo/jumbo_5.avif"  alt="jumbo_img5">
                    </div>
                    <div class="carousel-item">
                        <img src="/src/assets/jumbo/jumbo_6.avif"  alt="jumbo_img6">
                    </div>
                </div>
                <div class="overlay">
        
                </div>
            </div>
        </div>
    
        <div class="container ms_container_home d-flex flex-column justify-content-center py-2">
                <div class="row">
                    <h1 class="px-lg-5 text-white"> Voglio andare a <VueWriter style="color: #FE5D26;" class="d-inline" :eraseSpeed="50" :array="['Londra','Parigi','Roma','Berlino','Madrid','Milano']"/></h1> 
                </div>
                
                <div class="row">
                    <SearchBar/>
                </div>
                
        </div>
    </div>
</template>

<style scoped lang="scss">
    @use "../style/general" as *;
    
    
    .wrapper {
        padding-top: 60px;
        position: relative;
        max-height: 100vh;
        max-width: 100vw;
        .carousel-wrapper{
            position: relative;
            height: 100%;
            width: 100%;
            overflow: hidden;
            
            
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
            }
            
            
            .overlay {
                position:absolute;
                top:0;
                left:0;
                right:0;
                bottom:0;
                background-color:rgba(0, 0, 0, 0.5);
                z-index:1;
                color:white;
            }
        }
        
        .ms_container_home {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 2;
        }
    }
    
    
    @media only screen and (min-width: 900px) {
        .wrapper {
            padding-top: 0px;
            height: 100vh;
            width: 100vw;
        }
    }
    
</style>
