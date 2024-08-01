<script>
</script>

<template>
    <div class="container">
        <footer class="fsSmall footer mt-auto">
            <div class="links d-flex justify-content-between border-bottom">
                <ul class="nav justify-content-center">
                    <li class="nav-item"><a href="https://youtu.be/dQw4w9WgXcQ?si=EfCJJohZbHcWNRAC" class="nav-link px-2">Termini</a></li>
                    <li class="nav-item"><a href="https://youtu.be/dQw4w9WgXcQ?si=EfCJJohZbHcWNRAC" class="nav-link px-2">Privacy</a></li>
                    <li class="nav-item"><a href="https://youtu.be/dQw4w9WgXcQ?si=EfCJJohZbHcWNRAC" class="nav-link px-2">FAQs</a></li>
                    <li class="nav-item"><a href="https://youtu.be/dQw4w9WgXcQ?si=EfCJJohZbHcWNRAC" class="nav-link px-2">About</a></li>
                </ul>
    
                <ul class="nav justify-content-center">
                    <li class="nav-item">
                        <a href="https://youtu.be/dQw4w9WgXcQ?si=EfCJJohZbHcWNRAC" class="nav-link px-2"><i class="fa-brands fa-instagram"></i></a>
                    </li>
                    <li class="nav-item">
                        <a href="https://youtu.be/dQw4w9WgXcQ?si=EfCJJohZbHcWNRAC" class="nav-link px-2"><i class="fa-brands fa-facebook"></i></a>
                    </li>
                    <li class="nav-item">
                        <a href="https://youtu.be/dQw4w9WgXcQ?si=EfCJJohZbHcWNRAC" class="nav-link px-2"><i class="fa-brands fa-x-twitter"></i></a>
                    </li>
                </ul>
            </div>
            <p class="text-center py-2 ">© 2024 BoolBnB, Inc</p>
        </footer>
    </div>
</template>

<style scoped lang="scss">
@use "../style/partials/palette" as *;

    .container {
        background-color: $green;
        min-width: 100%;
        footer {
            padding: 5px;
            color: $white !important;
            p {
                margin: 0;
            }

            a {
                color: inherit
            }

            a:hover{
                color: $orange;
            }
        }
    }

    .fsSmall {
        font-size: 0.8rem !important;
    }
</style>