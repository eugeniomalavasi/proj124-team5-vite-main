RESULT PAGE
<script>
    import axios from 'axios';
    import { store } from '../store';
    import ApartmentCard from '../components/ApartmentCard.vue'

    export default {
        props: ["query"],
        name: "ResultsPage",
        watch: {
            query: {
                immediate: true,
                handler(newQuery) {
                    this.fetchResults(newQuery);
                }
            }
        },
        data() {
            return {
                isLoading: false,
                searchResults: [],
                error: null,
                store
            };
        },
        components: {
            ApartmentCard
        },
        mounted() {
            this.fetchResults();
        },
        created() {
            this.apartmentDetails(this.store.searchResults.slug);
            console.log(this.store.searchResults.slug);
        },
        methods: {
            fetchData() {
                axios.get('http://127.0.0.1:8000/api/filter', {
                    params: {
                        beds: 5,
                        rooms: 3,
                        bathroom: 2,
                        square_mt: 75
                    }
                })
                    .then(response => {
                        console.log(response.data);
                        // Gestisci i dati qui
                        this.searchResults = response.data;
                    })
                    .catch(error => {
                        console.error('Errore nella chiamata:', error);
                    });
            },
            fetchResults(query) {
                if (!query) return;

                this.isLoading = true;
                this.error = null;

                // First Axios call
                axios.get('http://127.0.0.1:8000/api/search', {
                    params: { input: query },
                })
                    .then(response => {
                        this.store.searchResults = response.data;
                        // console.log("Search Results:", this.store.searchResults);
                        this.isLoading = false;
                    })
                    .catch(error => {
                        this.error = 'There was an error fetching the search results';
                        console.error("Error fetching search results:", error);
                        this.isLoading = false;
                    });

                //     axios.get(`http://127.0.0.1:8000/api/apartment/${this.store.searchResults.slug}/address`)
                //         .then(response => {
                //             this.store.address = response.data;
                //             console.log("Address:", this.store.address);
                //         })
                //         .catch(error => {
                //             console.error("Error fetching address:", error);
                //         });

            },
            apartmentDetails(slug) {
                axios.get(`http://127.0.0.1:8000/api/apartment/${slug}/apartment-details`)
                    .then(response => {
                        console.log(response);
                        this.store.appDetails = response.data;
                    })
                    .catch(error => {
                        console.error("There was an error fetching the apartment details:", error);
                    });
            }
        },
    };


</script>

<template>
    <div class="container">
        <div v-if="isLoading">Loading...</div>
        <div v-else>
            <h1>Risultati vicino <span>{{ query }}</span></h1>
            <div v-if="error">{{ error }}</div>
            <ul v-else>
                <li v-for="result in store.searchResults" :key="result.slug">{{ result.title }}</li>
            </ul>
            <ApartmentCard :store="store" />
        </div>
    </div>
</template>

<style scoped lang="scss"></style>


SINGLE RESULT PAGE

<script>
    import { store } from '../store';
    import axios from 'axios';

    export default {
        name: "SingleResultPage",
        created() {
            this.apartmentDetails(this.store.searchResults[i].slug);
            console.log(this.i);
        },
        data() {
            return {
                store,
                imgBaseUrl: 'http://127.0.0.1:8000/storage',
                selectedIndex: null
            }
        },

        methods: {
            // apartmentDetails(slug) {
            //     axios.get(`http://127.0.0.1:8000/api/apartment/${slug}/apartment-details`)
            //         .then(response => {
            //             console.log(response.data);
            //             this.store.appDetails = response.data;
            //         })
            //         .catch(error => {
            //             console.error("There was an error fetching the apartment details:", error);
            //         });
            // },
            handleProductSelected(index) {
                this.selectedIndex = index;
            }
        },
        
    }
</script>

<template>
    <div class="container">
        <div class="apartment_content">
            <!-- <h1 class="fw-bold">{{ store.appDetails.apartment.apartment_description }}</h1> -->
            <!-- <p>{{ store.appDetails.apartment_description }}</p> -->
            <!-- <img :src="`${imgBaseUrl}/${store.appDetails.img_path}`" alt=""> -->
            <!-- <img v-else src="https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg" alt=""> -->
        </div>
    </div>
</template>

<style scoped lang="scss">
    .container {
        margin-top: 6rem;
    }
</style>

<!-- APARTMENT CARD -->
<script>
    export default {
        props: {
            store: Object,
        },
        created() {
            console.log(this.store);
        },
        data() {
            return {
                imgBaseUrl: 'http://127.0.0.1:8000/storage',
            }
        },
        methods: {
            selectApartment(index) {
                this.$emit('apartment-selected', index);
            }
        },
    }
</script>

<template>
    <section class="wrapper">
        <div class="container">
            <div class="row">
                <div class="col text-center mb-5">
                    <p class="lead">inserire Appartamenti sponsorizzati</p>
                </div>
            </div>
            <div class="row">

                <div class="card col-sm-12 col-md-6 col-lg-4 mb-4" v-for="(curCard , index) in store.searchResults" :key="index"
                    style="width: 18rem;">
                    <img :src="`${imgBaseUrl}/${curCard.img_path}`" class="card-img-top"
                        alt="{{ curCard.title }}">
                    <div class="card-body">
                        <h5 class="card-title">{{ curCard.title }}</h5>
                        <p class="card-text small">{{ curCard.apartment_description }}</p>
                        <router-link :to="{ name: 'single-result', params: { slug: curCard.slug} }" class="btn btn-primary">Dettagli</router-link>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
    @use "../style/partials/palette" as *;

    body {
        background: #161616;

        h1 {
            color: #fff;
        }

        .lead {
            color: #aaa;
        }

        .wrapper {
            margin: 10vh
        }
        .card {
            border: none;
            transition: all 500ms cubic-bezier(0.19, 1, 0.22, 1);
            overflow: hidden;
            border-radius: 20px;
            min-height: 450px;
            box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.2);

            @media (max-width: 768px) {
                min-height: 350px;
            }

            @media (max-width: 420px) {
                min-height: 300px;
            }

            .card-footer {
                background: none;
                border-top: none;

                .media {
                    img {
                        border: solid 3px rgba(255, 255, 255, 0.3);
                    }
                }
            }

            .card-title {
                font-weight: 800
            }

        }
    }

    @media (max-width: 767px) {}
</style>

STORE JS

import { reactive } from "vue";

export const store = reactive({
    location: "",
    searchResults: [],
    address: "",
    imgBaseUrl: 'http://127.0.0.1:8000/storage',
    appDetails: [],
});

