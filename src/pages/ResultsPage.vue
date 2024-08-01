<script>
import axios from "axios";
import { store } from "../store";
import ApartmentCard from "../components/ApartmentCard.vue";

export default {
  props: ["query"],
  name: "ResultsPage",
  watch: {
    query: {
      immediate: true,
      handler(newQuery) {
        this.fetchResults(newQuery);
      },
    },
  },
  data() {
    return {
      searchResults: [],
      isLoading: false,
      error: null,
      store,
      imgBaseUrl: "http://127.0.0.1:8000/storage",

      filters: {
        beds: null,
        bathroom: null,
        rooms: null,
        radius: null,
      },

      tempFilters: {
        beds: null,
        bathroom: null,
        rooms: null,
        radius: null,
      },
    };
  },

  components: {
    ApartmentCard,
  },

  created() {
    this.fetchResults();
  },

  mounted() {
    this.loadFilters();
  },

  methods: {
    fetchResults(query) {
      if (!query) return;

      this.isLoading = true;
      this.error = null;

      axios
        .get("http://127.0.0.1:8000/api/search", {
          params: {
            input: query,
            beds: this.filters.beds,
            bathroom: this.filters.bathroom,
            rooms: this.filters.rooms,
            radius: this.filters.radius,
          },
        })
        .then((response) => {
          let sortedResults = response.data.sort((a, b) => {
            let idA = a.sponsorship_id || 0;
            let idB = b.sponsorship_id || 0;
            return idB - idA;
          });
          this.store.searchResults = sortedResults;
          console.log(this.store.searchResults);

          this.isLoading = false;
        })
        .catch((error) => {
          this.error = "C'é stato un errore nel caricare i dati.";
          this.isLoading = false;
        });
    },

    applyFilters() {
      this.filters = { ...this.tempFilters };
      localStorage.setItem("filters", JSON.stringify(this.filters));
      this.fetchResults(this.query);
    },

    loadFilters() {
      const query = this.$route.query;
      const savedFilters = localStorage.getItem("filters");

      // If initialSearch flag is present, do not load filters from local storage
      if (query.firstSearch) {
        this.filters = {
          beds: null,
          bathroom: null,
          rooms: null,
          radius: null,
        };
        this.tempFilters = { ...this.filters };
        localStorage.removeItem("filters");

        // Remove initialSearch flag from the URL without reloading the page
        this.$router.replace({
          path: this.$route.path,
          query: { q: query.q },
        });
      } else if (savedFilters) {
        this.filters = JSON.parse(savedFilters);
        this.tempFilters = { ...this.filters };
      }
    },
  },

  computed: {
    filteredApartments() {
      return this.store.searchResults.filter((apartment) => {
        const { beds, bathroom, rooms } = this.filters;

        const matchBeds = beds !== null ? apartment.beds >= beds : true;
        const matchBaths =
          bathroom !== null ? apartment.bathroom >= bathroom : true;
        const matchRooms = rooms !== null ? apartment.rooms >= rooms : true;

        return matchBeds && matchBaths && matchRooms;
      });
    },
  },
};
</script>

<template>
  <div class="container mb-5 d-flex flex-column min-vh-100 text-center mt-3">
    <div v-if="isLoading">
      <div class="spinner-border ms-spinner" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else class="flex-grow-1">

      <!-- FILTERS -->
      <form @submit.prevent="applyFilters"
        class="row align-items-center ms-search justify-content-between py-2 mt-3 d-none d-md-flex">
        <div class="col-lg-2 col-md-6 col-sm-12 d-flex flex-column fw-bold text-center">
          <label class="form-label" for="beds">Letti</label>
          <input placeholder="0" class="form-control text-center border border-0" id="beds" type="number"
            v-model="tempFilters.beds" @keydown.enter.prevent="applyFilters" autocomplete="off" />
        </div>

        <div class="col-lg-2 col-md-6 col-sm-12 d-flex flex-column fw-bold text-center">
          <label class="form-label" for="bathroom">Bagni</label>
          <input placeholder="0" class="form-control text-center border border-0" id="bathroom" type="number"
            v-model="tempFilters.bathroom" @keydown.enter.prevent="applyFilters" autocomplete="off" />
        </div>

        <div class="col-lg-2 col-md-6 col-sm-12 d-flex flex-column fw-bold text-center">
          <label class="form-label" for="rooms">Stanze</label>
          <input placeholder="0" class="form-control text-center border border-0" id="rooms" type="number"
            v-model="tempFilters.rooms" @keydown.enter.prevent="applyFilters" autocomplete="off" />
        </div>

        <div class="col-lg-2 col-md-6 col-sm-12 d-flex flex-column fw-bold text-center">
          <label class="form-label" for="radius">Raggio di ricerca</label>
          <input placeholder="20" class="form-control text-center border border-0" id="radius" type="number"
            v-model="tempFilters.radius" @keydown.enter.prevent="applyFilters" autocomplete="off" />
        </div>

        <div class="col-lg-2 col-md-12 col-sm-12 d-flex justify-content-center">
          <button type="submit" class="btn btn-primary search-btn">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </form>


      <!-- ADVANCE FILTERS SMARTPHONE -->
      <form @submit.prevent="applyFilters" class="row align-items-center justify-content-between py-2 mt-3 d-md-none">
        <p class="d-inline-flex gap-1 w-100">
          <button class="btn btn-primary w-100 ms-orange-btn" type="button" data-bs-toggle="collapse"
            data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
            Filtri ricerca
          </button>
        </p>
        <div class="collapse w-100" id="collapseExample">
          <div class="card card-body">
            <div class="mb-3">
              <label class="form-label" for="beds">Letti</label>
              <input class="form-control" id="beds" type="number" v-model="tempFilters.beds"
                @keydown.enter.prevent="applyFilters" autocomplete="off" />
            </div>
            <div class="mb-3">
              <label class="form-label" for="bathroom">Bagni</label>
              <input class="form-control" id="bathroom" type="number" v-model="tempFilters.bathroom"
                @keydown.enter.prevent="applyFilters" autocomplete="off" />
            </div>
            <div class="mb-3">
              <label class="form-label" for="rooms">Stanze</label>
              <input class="form-control" id="rooms" type="number" v-model="tempFilters.rooms"
                @keydown.enter.prevent="applyFilters" autocomplete="off" />
            </div>
            <div class="mb-3">
              <label class="form-label" for="radius">Distanza</label>
              <input class="form-control" id="radius" type="number" v-model="tempFilters.radius"
                @keydown.enter.prevent="applyFilters" autocomplete="off" />
            </div>
            <div class="d-flex justify-content-end">
              <button type="submit" class="btn btn-primary ms-orange-btn">Cerca</button>
            </div>
          </div>
        </div>
      </form>

      <!-- RESULTS -->
      <div class="results mt-4">
        <h1 class="results-title text-center">
          Ecco cosa abbiamo trovato per te:
        </h1>
        <div v-if="filteredApartments.length === 0"
          class="no-results d-flex flex-column align-items-center justify-content-center">
          <i class="fas fa-search fa-3x mb-3 animated-magnifying-glass"></i>
          <h3 class="text-center">"La ricerca non ha prodotto risultati."</h3>
        </div>
        <div v-else>
          <div class="row g-4 mt-3">
            <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="apartment in filteredApartments" :key="apartment">
              <router-link :to="{
                name: 'single-result',
                params: { slug: apartment.slug },
              }" class="text-decoration-none">
                <div class="card h-100">
                  <img :src="`${imgBaseUrl}/${apartment.img_path}`" class="card-img-top" alt="Apartment Image"
                    v-if="apartment.img_path" />
                  <img src="https://t3.ftcdn.net/jpg/05/52/37/18/360_F_552371867_LkVmqMEChRhMMHDQ2drOS8cwhAWehgVc.png"
                    alt="Default Image" v-else />

                  <div class="card-body d-flex flex-column justify-content-start">
                    <div>

                      <span v-if="apartment.sponsorship_id >= 2" class="badge rounded-pill text-bg-primary">Consigliato
                        per te</span>
                    </div>
                    <h5 class="card-title">{{ apartment.title }}</h5>

                    <p class="card-text">
                      {{ apartment.apartment_description }}
                    </p>
                    <ul class="list-unstyled">
                      <li>
                        Letti: {{ apartment.beds }}, Bagni:
                        {{ apartment.bathroom }}, Stanze: {{ apartment.rooms }}
                      </li>
                    </ul>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../style/general" as *;

.container {
  padding-top: $header-height;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.ms-spinner {
  color: #FE5D26;
}

.results-title {
  font-family: "Rubik", sans-serif;
  font-weight: 500;
  font-size: 3rem;
  color: #606361;
}

.results {
  margin-top: 3rem;
}

.no-results {
  text-align: center;
  margin-top: 5em;
}

.no-results h3 {
  font-size: 3rem;
  font-weight: bold;
  color: #ccc;
}

.no-results i {
  color: #ccc;
}

.card {
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  min-height: 500px;

  &:hover {
    transform: scale(1.05);
  }

  .card-img-top {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    min-height: 300px;
    object-fit: cover;
    object-position: center;
    position: relative;
  }

  .card-body {
    padding: 15px;
  }

  .badge {
    position: absolute;
    background-color: #FE5D26 !important;
    padding: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    top: 20px;
    left: 20px;
  }

  .card-title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .card-text {
    font-size: 0.9rem;
    color: #555;
  }

  .list-unstyled {
    padding-left: 0;
    list-style: none;
    margin-bottom: 15px;
  }
}

.ms_btn {
  background-color: #FE5D26;
  color: $white;

  &:hover {
    background-color: #fb7a4f;
    color: $white;
  }
}

.ms-search {
  border: 1px solid lightgray;
  border-radius: 40px;
  background-color: #f8f9fa;
  padding: 15px 20px;
}

.search-btn {
  border: none;
  background-color: #FE5D26;
  border-radius: 50%;
  font-size: 20px;
  width: 60px;
  height: 60px;
  padding: 10px;
  color: white;
  line-height: 10px;
}

.search-btn:hover {
  background-color: #fb7a4f;
  color: white;
}

.ms-column {
  border: none;
  border-right: 1px solid lightgray;
}

.ms-column:active,
.ms-column:focus {
  outline: none;
  background-color: white;
  border: none;
}

input::-webkit-inner-spin-button,
input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-30px);
  }

  60% {
    transform: translateY(-15px);
  }
}

.animated-magnifying-glass {
  animation: bounce 2s infinite;
  color: #ccc;
}

input:focus::placeholder {
  color: transparent;
}

.btn-primary,
.btn-primary:focus,
.btn-primary:hover {
  background-color: #FE5D26;
  border-color: #FE5D26;
}

.form-label {
  margin-bottom: 5px;
}

.form-control {
  background-color: #f8f9fa;
  border-radius: 10px;
  text-align: center;
  font-size: 1rem;
}

.card.card-body {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 15px;
}

input[type="number"] {
  -moz-appearance: textfield;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Media query for responsive text size */
@media (max-width: 768px) {
  .results-title {
    font-size: 1.8rem; 
  }

  .no-results h3 {
    font-size: 2rem; 
  }
  .row.g-4 {
    gap: 0,3rem; 
  }
}
</style>
