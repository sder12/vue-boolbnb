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
      autocompleteResults: [],
    };
  },
  created() {
    this.getApartments();
    this.getAutocompleteSearch();
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
    getAutocompleteSearch() {
      if (this.store.addressInput.length > 0) {
        axios
          .get(
            `https://api.tomtom.com/search/2/search/${encodeURIComponent(
              this.store.addressInput
            )}.json?key=${
              this.store.keyTomTom
            }&language=it-IT&countrySet=IT&limit=5`
          )
          .then((resp) => {
            this.autocompleteResults = resp.data.results;
          })
          .catch((err) => console.log(err));
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
          <p class="mt-3">
            Discover breathtaking destinations and book the perfect vacation
            rental for your next adventure. Simply enter your desired location
            to find available rentals.
          </p>
          <!-- Form Research -->
          <div class="mt-3" role="search">
            <input
              class="form-control w-100"
              type="search"
              placeholder="Search"
              aria-label="Search"
              @keyup.enter="goToSearchPage"
              v-model="this.store.addressInput"
              @input="getAutocompleteSearch"
            />
            <div
              class="autocomplete pb-2 px-1 text-start bg-white"
              :class="{ 'd-none': autocompleteResults.length === 0 }"
            >
              <ul>
                <li
                  v-for="city in autocompleteResults"
                  @click="
                    () => {
                      store.addressInput = city.address.freeformAddress;
                      goToSearchPage();
                    }
                  "
                  class="autocomplete-link py-2 px-3"
                >
                  {{ city.address.freeformAddress }}
                </li>
              </ul>
            </div>
          </div>
          <!-- /Form Research -->
        </div>

        <!-- Right -->
        <div class="col-sm-12 col-md-8 text-center">
          <div class="img-container">
            <img id="front-home" src="../assets/front-home-1.svg" alt="" />
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
      <CardApartment
        v-else
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
        <div class="col-sm-12 col-md-8 text-center">
          <div class="img-container">
            <img id="front-hosting" src="../assets/front-home-2.svg" alt="" />
          </div>
        </div>
        <div class="col-sm-12 col-md-4 text-start">
          <h2 class="fw-bold">Try hosting</h2>
          <p class="my-5">
            Earn extra income and unlock new opportunities by sharing your
            space. Earn extra income and unlock new opportunities by sharing
            your space.
          </p>

          <a href="http://127.0.0.1:8000/register" class="ms-btn ms-btn-1">
            <span>LEARN MORE</span>
          </a>
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
    position: relative;
    width: 366px;
    height: 65px;
    border-radius: 50px;
    padding-left: 2rem;
    z-index: 10;
  }

  input::placeholder {
    color: #a68ba7;
  }

  .autocomplete {
    position: relative;
    padding-top: 85px;
    transform: translateY(-65px);
    border-radius: 50px;
    z-index: 2;
    border: 2px solid #ced4da;
  }

  .autocomplete-link {
    cursor: pointer;
    &:hover {
      background-color: var(--lightGrey);
    }
  }

  #front-home {
    position: relative;
    z-index: 1;
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
