<script>
export default {
  name: "CardApartmentLoading",
};
</script>

<template>
  <div
    class="col my-3 d-flex justify-content-sm-center justify-content-md-start"
  >
    <div class="ms-card shadow-sm">
      <!--Fake img-->
      <div class="ms-card-img-top"></div>
      <!--Fake img-->

      <!-- Fake text -->
      <div class="ms-card-body p-2">
        <div class="ms-card-text mt-2"></div>
        <div class="ms-card-text mt-2"></div>
        <div class="ms-card-text mt-2"></div>
      </div>
      <!-- /Fake text -->
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "../styles/general.scss" as *;

.ms-card {
  width: 18rem;
  height: 100%;
  min-height: 400px;
  background-color: var(--bgGrey);
  border-top-right-radius: 30px;

  .ms-card-img-top {
    width: 18rem;
    height: 18rem;
    border-top-right-radius: 30px;
    border-bottom-left-radius: 30px;
    background: linear-gradient(100deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
    background-size: 200% 100%;
    background-color: var(--loadingDarkGrey);
    animation: 1.5s shine linear infinite;
  }

  .ms-card-text {
    min-height: 15px;
    width: 60%;
    border-radius: 30px;
    background: linear-gradient(100deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
    background-size: 200% 100%;
    background-color: var(--loadingDarkGrey);
    animation: 1.5s shine linear infinite;
  }

  .ms-card-text:first-child {
    width: 80%;
  }
  @keyframes shine {
    to {
      background-position-x: -200%;
    }
  }
}
</style>
