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
        this.apartment.description.length > 80
      ) {
        return this.apartment.description.substr(0, 80) + " ...";
      }
      return this.apartment.description;
    },
  },
  methods: {
    handleClick() {
      this.$router.push(
        '/' + this.apartment.slug
      );
    }
  }
};
</script>

<template>
  <div class="col-3 my-3">
    <div class="ms-card shadow-sm" style="width: 18rem;" @click="handleClick">
      <img :src="`${store.apiUrl}/storage/${apartment.cover_image}`" class="ms-card-img-top" alt="apartment.title">
      <div class="ms-card-body p-2">
        <!-- Title -->
        <h5 class="card-title mt-2">{{ apartment.title }}</h5>
        <!-- /Title -->

        <!-- Description -->
        <p class="ms-card-text mt-1" v-if="apartment.description">{{ descriptionPreview }}</p>
        <p class="ms-card-text mt-1" v-else> ---- </p>
        <!-- / Description -->
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "../styles/general.scss" as *;

.ms-card {
  height: 100%;
  min-height: 400px;
  background-color: var(--bgGrey);
  border-top-right-radius: 30px;
  cursor: pointer;

  .ms-card-body {
    .card-title {
      font-size: 15px;
      font-weight: 600;
    }

    .ms-card-text {
      font-size: 13px;
      font-weight: 400;
      color: var(--darkerGrey);
    }
  }

  .ms-card-img-top {
    width: 18rem;
    height: 18rem;
    object-fit: cover;
    border-top-right-radius: 30px;
    border-bottom-left-radius: 30px;
  }
}
</style>
