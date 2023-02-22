<script>
export default {
    name: 'AppHeader',
}

</script>


<template>
    <header>
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid d-flex justify-content-between ms-3">
                <!-- Logo -->
                <router-link :to="{ name: 'home' }" class="navbar-brand">
                    <img class="d-md-block d-none" src="../assets/logo-lg.svg" alt="logo-boolbnb">
                    <img class="d-sm-block d-md-none" src="../assets/logo-sm.svg" alt="">
                </router-link>
                <!-- Navigation -->
                <div class="navbar" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link me-3" href="http://127.0.0.1:8000/login">Login</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>


<style lang="scss" scoped>
header {
    border-bottom: 5px solid #D61C4E;

    .navbar {
        img {
            height: 25px;
        }

        .nav-item a {
            color: black;
            font-weight: bolder;
        }
    }
}
</style>