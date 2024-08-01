<script>
    export default {
        props: {
            store: Object,
        },
        created() {
            console.log(this.store);
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

                <div class="card col-sm-12 col-md-6 col-lg-4 mb-4" v-for="curCard in store.searchResults"
                    style="width: 18rem;">
                    <img src="https://hips.hearstapps.com/hmg-prod/images/03-1574758094.jpg" class="card-img-top"
                        alt="{{ curCard.title }}">
                    <div class="card-body">
                        <h5 class="card-title">{{ curCard.title }}</h5>
                        <p class="card-text small">{{ curCard.apartment_description }}</p>
                        <router-link :to="{ name: 'single-result', params: { slug: curCard.slug } }" class="btn btn-primary">Dettagli</router-link>
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