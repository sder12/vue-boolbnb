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
      roomsInput: null,
      bedsInput: null,
      rangeKm: 20,
      servicesFilter: [],
    };
  },
  methods: {
    getFilterApartments() {
      this.filterModal = false;
      if (this.store.addressInput) {
        this.loading = true;
        this.errors = false;
        this.notFound = false;

        let params = {
          address: this.store.addressInput,
          range: this.rangeKm,
        };

        if (this.bedsInput) {
          params.beds_number = this.bedsInput;
        }

        if (this.roomsInput) {
          params.rooms_number = this.roomsInput;
        }

        if (this.servicesFilter) {
          params.services = this.servicesFilter;
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
        <div class="col-6 text-center d-flex flex-wrap align-items-center">
          <input class="form-control me-2 w-75" :class="{ 'is-invalid': errors }" type="input" placeholder="Search"
            aria-label="Search" v-model="this.store.addressInput" />
          <a class="btn btn-dark" @click="getFilterApartments">
            <i class="fa-solid fa-magnifying-glass"></i>
          </a>
          <div class="invalid-feedback text-start ps-2">
            <strong>Insert an adress or a city</strong>
          </div>
        </div>


        <!-- Button trigger modal -->
        <div class="col-6 text-end">
          <button type="button" class="ms-btn-filter ms-btn-color" data-bs-toggle="modal" data-bs-target="#exampleModal"
            @click="
              () => {
                this.filterModal = true;
              }
            ">
            <i class="fa-solid fa-list-check"></i>
            <span class="ms-1">Apply Filters</span>
          </button>
        </div>
      </section>


      <!-- Modal -->
      <section class="modal pt-4  " id="filterModal" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true" :class="{ 'show fade d-block ms-bg-fade': filterModal }">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">

            <!-- Modal header -->
            <div class="modal-header text-center">
              <div class="text-center w-100 pt-3">
                <h3>Filter</h3>
              </div>
              <div>
                <button type="button" class="btn-close text-end me-1" data-bs-dismiss="modal" aria-label="Close"
                  @click="() => { this.filterModal = false; }"></button>
              </div>
            </div>
            <!-- /Modal Header -->

            <!-- Modal body -->
            <div class="modal-body">
              <!-- Range -->
              <div class="form-group d-flex">
                <label for="rangeKm" class="form-label filter-title w-50">
                  <h5> RANGE in km </h5>
                </label>
                <input type="range" class="form-range w-35" min="0.1" max="20" id="rangeKm" step="0.1"
                  v-model="this.rangeKm" />
                <span>{{ rangeKm }} km</span>
              </div>

              <!-- Rooms -->
              <div class="form-group d-flex">
                <label class="form-label filter-title w-50">
                  <h5> ROOMS number</h5>
                </label>
                <input class="form-control w-25" type="number" v-model="this.roomsInput" />
              </div>

              <!-- Beds -->
              <div class="form-group d-flex">
                <label class="form-label filter-title w-50">
                  <h5> BEDS number</h5>
                </label>
                <input class="form-control w-25" type="number" v-model="this.bedsInput" />
              </div>
              <!-- Services -->
              <div class="form-group">
                <label class="form-label filter-title">
                  <h5> Services</h5>
                </label>
                <div class="d-flex flex-wrap">
                  <div class="form-check w-25" v-for="service in this.store.services">
                    <label class="form-check-label" :for="`services-${service.id}`">{{
                      service.name
                    }}</label>
                    <input type="checkbox" v-model="this.servicesFilter" :value="`${service.id}`"
                      class="form-check-input" :id="`services-${service.id}`" />
                  </div>
                </div>

              </div>
            </div>
            <!-- Modal body -->

            <!-- Modal-footer -->
            <div class="modal-footer d-flex justify-content-between">
              <button type="button" class="ms-btn-filter" data-bs-dismiss="modal" @click="
                () => {
                  this.filterModal = false;
                }
              ">
                Close
              </button>
              <a type="button" class="ms-btn-filter" @click="getFilterApartments">APPLY</a>
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
      <h2> No exact matches :(</h2>
      <h4> Try adjusting your <strong> search area.</strong></h4>
    </div>
    <!-- ELSE notFound -->
    <section v-else id="apartments">
      <!-- Array empty -->
      <div v-if="store.searchedApartments.length == 0" class="text-center mt-5">
        <h2> No exact matches :(</h2>
        <h4> Try changing or removing some of your <strong>filters</strong> or adjusting your <strong> search
            area.</strong> </h4>
      </div>
      <!-- FOUND -->
      <div v-else class="row row-cols-xl-4 row-cols-lg-3">
        <CardApartment v-for="apartment in store.searchedApartments" :key="apartment.id" :apartment="apartment" />
      </div>
    </section>
  </div>
  <!--/  Apartments -->

</template>

<style lang="scss" scoped>
.wrapper {
  background-color: var(--bgGrey);
  padding: 5rem 0;
}

.ms-btn-color {
  background-color: var(--secondaryMain);
}

.ms-bg-fade {
  background-color: rgba(0, 0, 0, 0.372);
}



//MODAL - filter

// .modal-dialog {

//   .modal-content {
//     width: 60vw;
//   }
// }

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

  .modal-body>div {
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
</style>
