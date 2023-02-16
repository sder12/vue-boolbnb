<script>
export default {
    name: "ApartmentPageLoading"
}
</script>

<template>
<section id="apartment" class="container">
    <div class="row">
      <div class="col col-md-6">
        <div class="bar mt-3 mb-3"></div>
        <h1 class="title">Loading . . .</h1>
        <div class="fake-details">
          <div class="fake-text mb-2"></div>
          <div class="fake-text"></div>
        </div>
        <div class="fake-description mt-5 text-end">
          <p class="fake-paragraph mb-2"></p>
          <p class="fake-paragraph mb-2"></p>
          <p class="fake-paragraph mb-2"></p>
          <p class="fake-paragraph mb-2"></p>
          <p class="fake-paragraph mb-2"></p>
        </div>
      </div>
      <div class="col col-md-5">
        <div class="fake-img-square d-flex align-items-center justify-content-center">
            <i class="fa-solid fa-mountain-sun"></i>
        </div>
      </div>
    </div>
</section>
</template>

<style lang="scss">
@use "../styles/general.scss" as *;
#apartment {
  .row {
    display: flex;
    justify-content: space-between;

    .fake-text {
        width: 300px;
        height: 20px;
        border-radius: 10px;
        background-color: var(--lightGrey);
    }

    .fake-paragraph {
        width: 400px;
        height: 14px;
        border-radius: 10px;
        background-color: var(--lightGrey);
        display: inline-block;
    }
  }

  .bar {
    width: 573px;
    height: 18px;
    background-color: var(--darkerGrey);
  }

  .title {
    font-size: 25px;
    font-weight: 600;
  }

  .fake-img-square {
    width: 400px;
    height: 400px;
    border-top-left-radius: 30px;
    background-color: var(--lightGrey);

    i {
        color: white;
        font-size: 5rem;
    }
  }
}
</style>