<script>
import { store } from "../store";
import axios from "axios";
import CardApartment from "../components/CardApartment.vue";
import Loading from "../components/Loading.vue";

export default {
  name: "SearchPage",
  components: { CardApartment, Loading },
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
      <section class="row justify-content-center flex-wrap">
        <div class="col-7 text-center d-flex flex-wrap">
          <input
            class="form-control me-2 w-75"
            :class="{ 'is-invalid': errors }"
            type="input"
            placeholder="Search"
            aria-label="Search"
            v-model="this.store.addressInput"
          />
          <a class="btn btn-dark" @click="getFilterApartments">
            <i class="fa-solid fa-magnifying-glass"></i>
          </a>
          <div class="invalid-feedback text-start ps-2">
            <strong>Inserisci un indirizzo o una citta'</strong>
          </div>
        </div>

        <!-- Button trigger modal -->
        <div class="col-7 text-end mt-4">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            @click="
              () => {
                this.filterModal = true;
              }
            "
          >
            Add more Filter
          </button>
        </div>
      </section>

      <!-- Modal -->
      <section>
        <div
          class="modal fade"
          id="filterModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          :class="{ 'show fade d-block': filterModal }"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Filters</h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  @click="
                    () => {
                      this.filterModal = false;
                    }
                  "
                ></button>
              </div>
              <div class="modal-body">
                <div class="mb-3">
                  <label for="rangeKm" class="form-label"
                    >Distanza massima</label
                  >
                  <input
                    type="range"
                    class="form-range"
                    min="20"
                    max="200"
                    id="rangeKm"
                    step="20"
                    v-model="this.rangeKm"
                  />
                  <span>{{ rangeKm }} km</span>
                </div>
                <!-- imput per filtrare stanze -->
                <div class="mb-3">
                  <p>numero di stanze minimo</p>
                  <input type="number" v-model="this.roomsInput" />
                </div>

                <div class="mb-3">
                  <p>numero di letti minimo</p>
                  <input type="number" v-model="this.bedsInput" />
                </div>

                <div class="mb-3">
                  <p>Servizi</p>
                  <div
                    class="form-check"
                    v-for="service in this.store.services"
                  >
                    <label
                      class="form-check-label"
                      :for="`services-${service.id}`"
                      >{{ service.name }}</label
                    >
                    <input
                      type="checkbox"
                      v-model="this.servicesFilter"
                      :value="`${service.id}`"
                      class="form-check-input"
                      :id="`services-${service.id}`"
                    />
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-danger"
                  data-bs-dismiss="modal"
                  @click="
                    () => {
                      this.filterModal = false;
                    }
                  "
                >
                  Reset
                </button>
                <a
                  type="button"
                  class="btn btn-success"
                  @click="getFilterApartments"
                  >Apply</a
                >
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
  <!-- /Search -->

  <!-- Apartments -->
  <Loading v-if="loading" />
  <div v-else class="container">
    <div v-if="notFound" class="text-center mt-5">
      <h2>
        La ricerca non è andata a buon fine :( riprova con un altro indirizzo o
        città!
      </h2>
    </div>
    <section v-else id="apartments" class="row">
      <h1 v-if="store.searchedApartments.length == 0" class="text-center mt-5">
        Nessun appartamento trovato!
      </h1>
      <CardApartment
        v-else
        v-for="apartment in store.searchedApartments"
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
</style>
