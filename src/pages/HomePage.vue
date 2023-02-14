<script>
import { store } from "../store";
import axios from "axios";
import CardApartment from "../components/CardApartment.vue";
import CardApartmentLoading from "../components/CardApartmentLoading.vue";

export default {
  name: "HomePage",
  components: { CardApartment, CardApartmentLoading },
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
        <div class="col-sm-12 col-md-4 text-center">
          <h3 class="fw-bold">Not sure where to go?</h3>
          <p class="mt-3">Discover breathtaking destinations and book the perfect vacation rental for your next
            adventure.
            Simply enter your desired location to find available rentals.
          </p>
          <!-- Form Research -->
          <div class="d-flex justify-content-center mt-3" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"
              @keyup.enter="goToSearchPage" v-model="this.store.addressInput" />
          </div>
          <!-- /Form Research -->
        </div>

        <!-- Right -->
        <div class="col-sm-12 col-md-8 text-center">
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

    <h1>Most Viewed</h1>
    <section id="apartments" class="row row-cols-xl-4 row-cols-lg-3">
      <CardApartmentLoading v-if="loading" v-for="n in 4" />
      <CardApartment v-else v-for="apartment in apartments" :key="apartment.id" :apartment="apartment" />
    </section>
  </div>
  <!--/  Apartments -->

  <!-- Hosting section -->
  <section id="hosting">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-sm-12 col-md-8 text-center">
          <div class="img-container">
            <img id="front-hosting" src="../assets/front-home-2.svg" alt="">
          </div>
        </div>
        <div class="col-sm-12 col-md-4 text-start">
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

  .col-4 {
    display: flex;
    flex-direction: column;

  }

  .jumbotron-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    bottom: -100px;
  }

  input {
    width: 366px;
    height: 65px;
    border-radius: 50px;
    padding-left: 2rem;
  }

  input::placeholder {
    color: #A68BA7;
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
