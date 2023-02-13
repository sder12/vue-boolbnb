<script>
import { store } from "../store";
export default {
  name: "CardApartment",
  props: {
    apartment: Object,
  },
  data() {
    return {
      store,
    };
  },
  computed: {
    descriptionPreview() {
      if (
        this.apartment.description &&
        this.apartment.description.length > 100
      ) {
        return this.apartment.description.substr(0, 100) + " ...";
      }
      return this.apartment.description;
    },
  },
};
</script>

<template>
  <div class="col col-3 my-3">
    <div class="card" style="width: 18rem">
      <img
        :src="`${store.apiUrl}/storage/${apartment.cover_image}`"
        class="card-img-top"
        alt="apartment.title"
      />

      <div class="card-body">
        <!-- Title -->
        <h5 class="card-title">{{ apartment.title }}</h5>
        <!-- /Title -->

        <!-- Description -->
        <p class="card-text" v-if="apartment.description">
          {{ descriptionPreview }}
        </p>

        <p class="card-text" v-else>----</p>
        <!-- / Description -->

        <!-- router-link :to="{name: 'single-apartment', params: {slug: apartment.slug}}"-->
        <router-link
          :to="{
            name: 'show',
            params: { slug: apartment.slug },
          }"
          class="btn btn-primary"
        >
          <i class="fa-solid fa-eye"></i>
        </router-link>
        <!-- / router-link -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
