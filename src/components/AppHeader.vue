<script>
export default {
    name: 'AppHeader',
}

</script>


<template>
    <header>
        <nav class="navbar navbar-expand-lg bg-body-tertiary py-3 px-5">
            <div class="container-fluid">

                <!-- Logo -->
                <router-link :to="{ name: 'home' }" class="navbar-brand">
                    <img src="../assets/logo-lg.svg" alt="logo-boolbnb">
                </router-link>

                <!-- Hamburger menu -->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <!-- Navigation -->
                <div class="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link :to="{ name: 'search' }" class="nav-link">
                                Search
                            </router-link>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link">Become a host</a>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link">Login</a>
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