<script>
import { store } from '../store';
import axios from "axios";
import CardApartment from "../components/CardApartment.vue";
import Loading from '../components/Loading.vue';

export default {
    name: 'SearchPage',
    components: { CardApartment, Loading },
    data() {
        return {
            store,
            apartments: {},
            loading: false,
        }
    },
    created() {
        this.getApartments();
    },
    methods: {
        getApartments() {
            this.loading = true;
            axios.get(`${this.store.apiUrl}/api/apartments`)
                .then(resp => {
                    this.apartments = resp.data.apartments;
                    console.log(this.apartments);
                    this.loading = false;
                })
        }
    }
}
</script>


<template>
    <!-- Search -->
    <div class="container-fluid wrapper">
        <div class="container">
            <section id="search" class="row justify-content-center">
                <div class="col col-4 text-center">
                    <form class="d-flex justify-content-center" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-dark" type="submit">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>
                </div>
            </section>
        </div>
    </div>
    <!-- /Search -->

    <!-- Apartments -->
    <div class="container">
        <section id="apartments" class="row">
            <Loading v-if="loading" />
            <CardApartment v-else v-for="apartment in apartments" :key="apartment.id" :apartment="apartment" />
        </section>
    </div>
    <!--/  Apartments -->
</template>


<style lang="scss" scoped>
.wrapper {
    background-color: #F2F4F7;
    padding: 5rem 0;
}
</style>