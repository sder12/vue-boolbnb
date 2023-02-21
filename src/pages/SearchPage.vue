<script>
import { store } from "../store";
import axios from "axios";
import CardApartment from "../components/CardApartment.vue";
import CardApartmentLoading from "../components/CardApartmentLoading.vue";

export default {
  name: "SearchPage",
  components: { CardApartment, CardApartmentLoading },
  data() {
    return {
      store,
      loading: false,
      errors: false,
      notFound: false,
      filterModal: false,
      autocompleteResults: [],
    };
  },
  methods: {
    getFilterApartments() {
      this.autocompleteResults = [];
      this.filterModal = false;
      if (this.store.addressInput || this.$route.params.address) {
        this.loading = true;
        this.errors = false;
        this.notFound = false;

        //Address
        if (!this.store.addressInput) {
          this.store.addressInput = this.$route.params.address;
        }

        if (this.store.addressInput !== this.$route.params.address) {
          this.$router.replace({
            name: "search",
            params: {
              address: this.store.addressInput,
            },
          });
        }

        let params = {
          address: this.store.addressInput,
          range: this.store.rangeKm,
        };

        if (this.store.bedsInput) {
          params.beds_number = this.store.bedsInput;
        }

        if (this.store.roomsInput) {
          params.rooms_number = this.store.roomsInput;
        }

        if (this.store.servicesFilter) {
          params.services = this.store.servicesFilter;
        }

        axios
          .get(`${this.store.apiUrl}/api/apartments`, { params: params })
          .then((resp) => {
            this.store.searchedApartments = resp.data.apartments;
            this.loading = false;
          })
          .catch((err) => {
            console.log(err);
            this.loading = false;
            this.notFound = true;
          });
      } else {
        this.loading = false;
        this.errors = true;
      }
    },
    getServices() {
      this.loading = true;
      this.errors = false;
      this.notFound = false;

      axios
        .get(`${this.store.apiUrl}/api/services`)
        .then((resp) => {
          this.store.services = resp.data.services;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
          this.notFound = true;
        });
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
    resetFilter() {
      this.store.rangeKm = 20;
      this.store.roomsInput = null;
      this.store.bedsInput = null;
      this.store.servicesFilter = [];
    },
  },
  created() {
    this.getFilterApartments();
    this.getServices();
  },
};
</script>

<template>
  <!-- Search -->
  <div class="container-fluid wrapper">
    <div class="container">
      <section class="row text-center">
        <div
          class="col-12 col-lg-8 col-xl-6 text-center d-flex flex-wrap align-items-center mb-5 mb-lg-0"
        >
          <!-- Form Research -->
          <div class="w-100">
            <input
              class="form-control input-search"
              type="search"
              placeholder="Search"
              aria-label="Search"
              @keyup.enter="getFilterApartments"
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
                      getFilterApartments();
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
          <div class="invalid-feedback text-start ps-2">
            <strong>Insert an adress or a city</strong>
          </div>
        </div>

        <!-- Button trigger modal -->
        <div class="col-12 col-lg-4 col-xl-6 text-end">
          <button
            type="button"
            class="ms-btn-filter ms-btn-color"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            @click="
              () => {
                this.filterModal = true;
              }
            "
          >
            <i class="fa-solid fa-list-check"></i>
            <span class="ms-1">Apply Filters</span>
          </button>
        </div>
      </section>

      <!-- Modal -->
      <section
        class="modal pt-4"
        id="filterModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        :class="{ 'show fade d-block ms-bg-fade': filterModal }"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <!-- Modal header -->
            <div class="modal-header text-center">
              <div class="text-center w-100 pt-3">
                <h3>Filter</h3>
              </div>
              <div>
                <button
                  type="button"
                  class="btn-close text-end me-1"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  @click="
                    () => {
                      this.filterModal = false;
                    }
                  "
                ></button>
              </div>
            </div>
            <!-- /Modal Header -->

            <!-- Modal body -->
            <div class="modal-body">
              <!-- Range -->
              <div class="form-group d-flex">
                <label for="rangeKm" class="form-label filter-title w-50">
                  <h5>RANGE in km</h5>
                </label>
                <input
                  type="range"
                  class="form-range w-35"
                  min="0.1"
                  max="20"
                  id="rangeKm"
                  step="0.1"
                  v-model="this.store.rangeKm"
                />
                <span>{{ store.rangeKm }} km</span>
              </div>

              <!-- Rooms -->
              <div class="form-group d-flex">
                <label class="form-label filter-title w-50">
                  <h5>ROOMS number</h5>
                </label>
                <input
                  class="form-control w-25"
                  type="number"
                  v-model="this.store.roomsInput"
                  min="1"
                />
              </div>

              <!-- Beds -->
              <div class="form-group d-flex">
                <label class="form-label filter-title w-50">
                  <h5>BEDS number</h5>
                </label>
                <input
                  class="form-control w-25"
                  type="number"
                  v-model="this.store.bedsInput"
                  min="1"
                />
              </div>

              <!-- Services -->
              <div class="form-group">
                <label class="form-label filter-title">
                  <h5>Services</h5>
                </label>
                <div class="row d-flex flex-wrap justify-content-end">
                  <div
                    class="form-check ms-5 col col-6 col-lg-4"
                    v-for="service in this.store.services"
                  >
                    <label
                      class="form-check-label"
                      :for="`services-${service.id}`"
                      >{{ service.name }}</label
                    >
                    <input
                      type="checkbox"
                      v-model="this.store.servicesFilter"
                      :value="`${service.id}`"
                      class="form-check-input"
                      :id="`services-${service.id}`"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- Modal body -->

            <!-- Modal-footer -->
            <div class="modal-footer d-flex justify-content-between">
              <a
                type="button"
                class="ms-btn-filter bg-danger"
                @click="resetFilter"
              >
                Reset
              </a>
              <a
                type="button"
                class="ms-btn-filter"
                @click="getFilterApartments"
                >APPLY</a
              >
            </div>
            <!-- /Modal-footer  -->
          </div>
        </div>
      </section>
    </div>
  </div>
  <!-- /Search -->

  <!-- Apartments -->

  <!-- IF Loading -->
  <div v-if="loading" class="container mt-2">
    <div class="row row-cols-xl-4 row-cols-lg-3">
      <CardApartmentLoading v-for="n in 8" />
    </div>
  </div>
  <!-- ELSE  Loading -->
  <div v-else class="container">
    <!-- IF notFound -->
    <div v-if="notFound" class="text-center my-5">
      <h2>No exact matches :(</h2>
      <h4>Try adjusting your <strong> search area.</strong></h4>
    </div>
    <!-- ELSE notFound -->
    <section v-else id="apartments">
      <!-- Array empty -->
      <div id="array-empty" v-if="store.searchedApartments.length == 0" class="text-center mt-5">
        <h2>No exact matches :(</h2>
        <h4>
          Try changing or removing some of your <strong>filters</strong> or
          adjusting your <strong> search area.</strong>
        </h4>
      </div>
      <!-- FOUND -->
      <div v-else class="row row-cols-xl-4 row-cols-lg-3">
        <CardApartment
          v-for="apartment in store.searchedApartments"
          :key="apartment.id"
          :apartment="apartment"
        />
      </div>
    </section>
  </div>
  <!--/  Apartments -->
</template>

<style lang="scss" scoped>
.wrapper {
  background-color: var(--bgGrey);
  padding: 5rem 0;

  .input-search {
    position: relative;
    height: 65px;
    border-radius: 50px;
    padding-left: 2rem;
    z-index: 10;

    &::placeholder {
      color: #a68ba7;
    }
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
}

.ms-btn-color {
  background-color: var(--secondaryMain);
}

.ms-bg-fade {
  background-color: rgba(0, 0, 0, 0.372);
}

//MODAL - filter

.modal-body {
  padding: 2rem 5rem;
}

// Border and margin
.modal-header,
.modal-body {
  border-bottom: 4px solid var(--loadingDarkGrey);

  .form-group:not(:last-child) {
    border-bottom: 2px solid var(--loadingDarkGrey);
  }

  .form-group {
    margin: 2px 0;
  }
}

//Text and Btns
.modal-content {
  .modal-header {
    h3 {
      font-weight: bolder;
      font-size: 1.4rem;
      color: var(--primaryMain);
    }
  }

  .modal-body > div {
    padding: 1rem 0;
  }

  .modal-body {
    .filter-title {
      color: var(--darkBlue);
      font-weight: bolder;
    }
  }

  .modal-footer {
    button {
      background-color: white;
      color: black;
      text-decoration: underline;
    }

    a {
      background-color: var(--secondaryMainDarker);
      text-decoration: none;
    }
  }
}

#array-empty {
  height: 500px;
}
</style>
