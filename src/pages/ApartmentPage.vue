<script>
import { store } from "../store";
import axios from "axios";

export default {
  name: "Details",
  data() {
    return {
      store,
      apartment: [],
      apiKey: "QEZMPbAxyM5B51twR2BRzWuWxSUDiBYg",
    };
  },
  methods: {
    getApartment() {
      const slug = this.$route.params.slug;
      axios.get(`${this.store.apiUrl}/api/apartments/${slug}`).then((resp) => {
        this.apartment = resp.data.apartment;
        this.createMap(
          this.apartment.address.latitude,
          this.apartment.address.longitude,
          this.apiKey
        );
      });
    },

    createMap(lat, long, key) {
      const map = tt.map({
        key: key,
        container: "map",
        center: [long, lat],
        zoom: 17,
      });
      map.on("load", () => {
        new tt.Marker().setLngLat([long, lat]).addTo(map);
      });
    },
  },
  created() {
    this.getApartment();
  },
  computed: {},
};
</script>

<template>
  <h1>{{ apartment.title }}</h1>
  <h2>N° di stanze: {{ apartment.rooms_number }}</h2>
  <div id="map" style="width: 400px; height: 400px"></div>
</template>
