<script>
  import { store } from "/src/store.js";
import axios from "axios"
  

  export default {
    data () {
      return {
        store,
        userInput: "",
      }
    },

    methods: {
      submitData() {
        if (this.userInput.trim() !== '') {
          this.$router.push({ path: '/results', query: { q: this.userInput, firstSearch: true } });
        }
      },
      autocomplete() {
    const locationInput = document.getElementById('location');
    const suggestionsContainer = document.getElementById('suggestions');
    let timeout;

    locationInput.addEventListener("input", () => {
        let query = locationInput.value;

        if (timeout) clearTimeout(timeout);
        if (query.length >= 4) {
            timeout = setTimeout(() => {
                axios
                    .get("http://127.0.0.1:8000/api/autocomplete", { params: { query: query } })
                    .then(response => {
                        console.log("response: " + response.data);
                        suggestionsContainer.innerHTML = "";
                        response.data.forEach(item => {
                            let suggestion = document.createElement("a");
                            suggestion.href = "#";
                            suggestion.classList.add(
                                "list-group-item",
                                "list-group-item-action",
                                "suggestion-item"
                            );
                            suggestion.textContent = item.address;
                            suggestionsContainer.appendChild(suggestion);

                            suggestion.addEventListener("click", event => {
                                event.preventDefault();
                                locationInput.value = item.address;
                                this.userInput = item.address; 
                                suggestionsContainer.innerHTML = "";
                            });
                        });
                    });
            }, 300); 
        }
    });
},
      debouncedAutocomplete() {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.autocomplete(this.userInput);
            }, 500); 
        }
    },
  }
</script>

<template>
    <form method="POST" class="form-inline my-lg-2 py-2 px-lg-5 my-lg-0 d-flex gap-3">
      <div class="w-100">
        <input v-model="userInput" id="location" class="form-control mr-sm-2 me-md-4 py-lg-2" type="search" @input="debouncedAutocomplete" placeholder="Inserisci la tua prossima destinazione..." aria-label="Search" required autocomplete="off">
        <div id="suggestions" class="list-group mt-2"></div>
      </div>
      <button id="search-btn" class="btn btn-outline-success py-2" @click="submitData">Cerca</button>
    </form>
</template>

<style scoped lang="scss">
    @use "../style/partials/palette" as *;


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

  .form-control:focus {
    box-shadow: 5px 5px 20px 1px #fe5c26; ;
  }

  #location{
    position: relative;
  }
  #suggestions{
    position: absolute;
  }
</style>