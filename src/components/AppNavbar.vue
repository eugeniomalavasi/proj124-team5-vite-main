<script>
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div class="container-fluid">
            <router-link class="w-50" :to="{ name: 'home' }">
                <img src="/src/assets/boolbnb_logo.png" alt="Logo" class="align-text-top logo">
            </router-link>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link :to="{ name: 'about' }" class="nav-link">
                            Chi Siamo
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'login' }" class="nav-link">
                            Gestione Appartamenti
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped lang="scss">
    @use "../style/partials/palette" as *;

    nav {
        min-height: 60px;
    }

    .container-fluid {
        img.logo {
            width: 70%;
        }
        li {
            text-decoration: none;
        }

        .router-link-active {
            color: $orange;
        }
    }

    @media screen and (min-width: 768px) {
        .container-fluid {
            img.logo {
                width: 30%;
            }
        }
    }

    @media screen and (min-width: 1024px) {
        nav {
            min-height: 80px;
            max-height: 80px;
        }
        .container-fluid {
            img.logo {
                width: 30%; 
            }
        }
    }
</style>