<script>
	import axios from "axios";
	import ContactForm from "../components/ContactForm.vue";
	import FeaturedApartments from "../components/FeaturedApartments.vue";

	export default {
		name: "SingleResultPage",
		props: ["slug"],
		components: { ContactForm, FeaturedApartments },
		data() {
			return {
				apartment: null,
				imgBaseUrl: "http://127.0.0.1:8000/storage",
			};
		},
		created() {
			this.fetchApartmentDetails();
		},
		mounted() {
			this.viewRegister();
		},
		methods: {
			fetchApartmentDetails() {
				axios
					.get(`http://127.0.0.1:8000/api/apartment/${this.slug}/apartment-details`)
					.then((response) => {
						this.apartment = response.data;
					})
					.catch((error) => {
						console.error("Errore nel prendere i dati:", error);
					});
			},

			goBackToResults() {
				this.$router.push({ name: "SearchResults", query: { q: this.$route.query.q } });
			},

			viewRegister() {
				axios.post("http://127.0.0.1:8000/api/view", {
					apartment_id: this.apartment.id,
					user_id: this.apartment.user_id,
					title: this.apartment.title
				})
					.then((response) => {
						console.log('Visita registrata');
					})
					.catch((error) => {
						console.log('errore nella registrazione', error);
					})
			},
		},
	};
</script>

<template>
	<div class="container mt-6">
		<div v-if="apartment">
			<div class="row justify-content-center mt-3">
				<div class="col-md-10 col-lg-8">
					<div class="d-flex justify-content-end button-container">
						<button @click="goBackToResults" class="btn my-button ms_btn btn-primary">
							<i class="fas fa-arrow-left"></i> Torna indietro
						</button>
					</div>
					<h1 class="fw-bold">{{ apartment.title }}</h1>
					<p><i class="fa-solid fa-location-dot fs-5 me-1" style="color: #FE5D26"></i>{{ apartment.address }}</p>
					<img :src="`${imgBaseUrl}/${apartment.img_path}`" class="img-fluid rounded mb-4" alt="Apartment Image" v-if="apartment.img_path" />
					<img class="img-fluid rounded mb-4" src="https://t3.ftcdn.net/jpg/05/52/37/18/360_F_552371867_LkVmqMEChRhMMHDQ2drOS8cwhAWehgVc.png" alt="Default Image" v-else />
					<h3>Descrizione:</h3>
					<p>{{ apartment.apartment_description }}</p>
					
					<div class="row mt-4">
						<div class="col-sm-12 col-md-6 col-lg-6">
							<h5>Caratteristiche</h5>
							<ul class="list-unstyled">
								<li><i class="fas fa-bath"></i> Bagni: {{ apartment.bathroom }}</li>
								<li><i class="fas fa-bed"></i> Camere da letto: {{ apartment.beds }}</li>
								<li><i class="fas fa-door-open"></i> Stanze: {{ apartment.rooms }}</li>
								<li><i class="fas fa-ruler-combined"></i> Dimensione: {{ apartment.square_mt }} m²</li>
							</ul>
						</div>
						<div class="col-sm-12 col-md-6 col-lg-6">
							<h5>Servizi</h5>
							<ul class="list-unstyled">
								<li v-for="(service, index) in apartment.services" :key="index">
									<i class="fas fa-check"></i> {{ service.title }}
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-else class="d-flex justify-content-center align-items-center" style="height: 200px;">
			<div class="spinner-border text-primary" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
		<ContactForm :apartment_id="apartment.id" class="my-3" />
	</div>
</template>

<style scoped lang="scss">


	.container {
		font-family: 'Poppins', sans-serif;
		margin-top: 6rem;
		color: #484848;

		.img-fluid {
			max-width: 100%;
			height: auto;
		}

		.my-button {
			background-color: #FE5D26;
			color: white;
			border: none;
			padding: 10px 20px;
			font-size: 1rem;
			border-radius: 5px;
			cursor: pointer;
			text-align: center;

			&:hover {
				background-color: #e04e1e;
				color: white;
			}

			i {
				margin-right: 8px;
				color: white;
			}
		}

		h1 {
			font-size: 2.5rem;
			margin-bottom: 0.5rem;
			font-weight: 600;
			color: #484848;
		}

		h3 {
			margin-top: 1.5rem;
			margin-bottom: 1rem;
			font-weight: 600;
			color: #484848;
		}

		h5 {
			margin-top: 1rem;
			margin-bottom: 0.5rem;
			font-weight: 600;
			color: #484848;
		}

		p, li {
			font-weight: 400;
			color: #484848;
		}

		ul {
			list-style-type: none;
			padding: 0;
		}

		li {
			margin-bottom: 0.5rem;

			i {
				margin-right: 10px;
				color: #FE5D26;
			}
		}
	}
</style>