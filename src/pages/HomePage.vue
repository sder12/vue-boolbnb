<script>
import { store } from "../store";
import axios from "axios";
import CardApartment from "../components/CardApartment.vue";
import Loading from "../components/Loading.vue";
export default {
  name: "HomePage",
  components: { CardApartment, Loading },
  data() {
    return {
      store,
      loading: false,
      apartments: [],
    };
  },
  created() {
    this.getApartments();
  },
  methods: {
    getApartments() {
      this.loading = true;

      axios
        .get(`${this.store.apiUrl}/api/apartments`)
        .then((resp) => {
          this.apartments = resp.data.apartments;
          this.store.services = resp.data.services;

          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goToSearchPage() {
      if (this.store.addressInput) {
        this.$router.push({
          path: "/search",
        });
      }
    },
  },
};
</script>

<template>
  <!-- Jumbotron -->
  <div class="container-fluid wrapper">
    <div class="container">
      <section id="jumbotron" class="row">
        <!-- Left -->
        <div class="col col-6 text-center">
          <h3>Not sure where to go?</h3>

          <!-- Form Research -->
          <div class="d-flex justify-content-center" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              v-model="this.store.addressInput"
            />
            <a class="btn btn-dark" @click="goToSearchPage">
              <i class="fa-solid fa-magnifying-glass"></i>
            </a>
          </div>
          <!-- /Form Research -->
        </div>

        <!-- Right -->
        <div class="col col-6 text-center">
          <span> IMAGE </span>
        </div>
      </section>
    </div>
  </div>
  <!-- / Jumbotron -->

  <!-- Apartments -->
  <div class="container">
    <Loading v-if="loading" />
    <section id="apartments" class="row" v-else>
      <CardApartment
        v-for="apartment in apartments"
        :key="apartment.id"
        :apartment="apartment"
      />
    </section>
  </div>
  <!--/  Apartments -->
</template>

<style lang="scss" scoped>
.wrapper {
  background-color: #f2f4f7;
  padding: 5rem 0;
}

#apartments {
  margin-top: 3rem;
}
</style>
