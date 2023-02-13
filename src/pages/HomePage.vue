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
    <section id="jumbotron" class="position-relative">
    <div class="container jumbotron-container">
      <div class="row">
        <!-- Left -->
            <div class="col-4 text-center">
              <h3 class="fw-bold">Not sure where to go?</h3>
              <p class="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium voluptatem earum, est sunt voluptate, repellendus!</p>

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
            <div class="col-8 text-center">
              <div class="img-container">
                <img id="front-home" src="../assets/front-home-1.svg" alt="">
              </div>
            </div>
          </div>
        </div>
      </section>
  <!-- / Jumbotron -->

  <!-- Apartments -->
  <div class="container apartment-container">
    <Loading v-if="loading" />
    <section id="apartments" class="row" v-else>
      <h1>Most Viewed</h1>
      <CardApartment
        v-for="apartment in apartments"
        :key="apartment.id"
        :apartment="apartment"
      />
    </section>
  </div>
  <!--/  Apartments -->

  <!-- Hosting section -->
  <section id="hosting">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-8 text-center">
          <div class="img-container">
            <img id="front-hosting" src="../assets/front-home-2.svg" alt="">
          </div>
        </div>
        <div class="col-4 text-start">
          <h2 class="fw-bold">Try hosting</h2>
          <p class="mt-3">Earn extra income and unlock new
            opportunities by sharing your space.
            Earn extra income and unlock new
            opportunities by sharing your space.
          </p>
          <button class="ms-btn ms-btn-1 mt-4">
            <span>LEARN MORE</span>
          </button>
        </div>
      </div>
    </div>
  </section>
  <!-- /Hosting section -->
</template>

<style lang="scss" scoped>
@use "../styles/general.scss" as *;
// Jumbotron
#jumbotron {
  background-color: var(--bgGrey);
  width: 100%;
  height: 500px;

  .jumbotron-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    bottom: -100px;

  }
}
// /Jumbotron

// Apartments Section
.apartment-container {
  margin-top: 5rem;

  #apartments {
    margin-top: 3rem;
  }
}
// /Apartments Section

// Hosting Section
#hosting {
  position: relative;
  background-color: var(--bgGrey);
  width: 100%;
  padding: 5rem;
  border-top: 5px solid var(--mainYellow);

  .ms-btn-1 {
    background-color: var(--primaryMain);

  }
}
// /Hosting Section

.col-4 {

p {
  color: var(--lorem);
}
}
</style>
