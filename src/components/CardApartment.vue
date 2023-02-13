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
    <div class="col-3 my-3">
        <div class="ms-card" style="width: 18rem;">
            <img :src="`${store.apiUrl}/storage/${apartment.cover_image}`" class="ms-card-img-top" alt="apartment.title">
            <div class="ms-card-body p-2">
                <!-- Title -->
                <h5 class="card-title mt-2">{{ apartment.title }}</h5>
                <!-- /Title -->

                <!-- Description -->
                <p class="ms-card-text mt-1" v-if="apartment.description">{{ descriptionPreview }}</p>
                <p class="ms-card-text mt-1" v-else> ---- </p>
                <!-- / Description -->

                <router-link
                    :to="{
                        name: 'show',
                        params: { slug: apartment.slug },
                    }"
                    class="btn btn-primary"
                    >
                    <i class="fa-solid fa-eye"></i>
                </router-link>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@use "../styles/general.scss" as *;
.ms-card {
    background-color: var(--bgGrey);
    border-top-right-radius: 30px;
    .ms-card-body {
        .ms-card-text {
            color: var(--darkerGrey);
        }
    }
    .ms-card-img-top {
        border-top-right-radius: 30px;
        border-bottom-left-radius: 30px;
    }
}
</style>
