<script>
export default {
  name: "ApartmentPageLoading",
};
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
        <div class="fake-description mt-5 text-center">
          <p class="fake-paragraph mb-2"></p>
          <p class="fake-paragraph mb-2"></p>
          <p class="fake-paragraph mb-2"></p>
          <p class="fake-paragraph mb-2"></p>
          <p class="fake-paragraph mb-2"></p>
        </div>
      </div>
      <div class="col col-md-5">
        <div
          class="fake-img-square d-flex align-items-center justify-content-center mt-3"
        >
          <i class="fa-solid fa-mountain-sun"></i>
        </div>
      </div>
    </div>
  </section>
  <section class="fake-basic-services p-5">
    <div class="container">
      <div v-for="index in 5" :key="index" class="fake-icon-group d-flex align-items-center mb-3">
        <div class="fake-icon me-3"></div>
        <div class="fake-text">
          <div class="fake-title mb-1"></div>
          <div class="fake-subtitle"></div>
        </div>
      </div>
    </div>
  </section>
  <div class="fake-advanced-services p-5">
    <div class="container">
      <h2 class="fake-advanced-title"></h2>
      <div class="row" v-for="index in 5" :key="index">
        <div class="col-xs-1 col-sm-6">
          <div class="icon-group-2 d-flex align-items-center mt-3">
            <div class="fake-icon me-3"></div>
            <h5 class="fake-advanced-service-title"></h5>
          </div>
        </div>
      </div>
    </div>
  </div>
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
      background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
      background-size: 200% 100%;
      animation: 1.5s shine linear infinite;
    }

    .fake-paragraph {
      width: 400px;
      height: 14px;
      border-radius: 10px;
      background-color: var(--lightGrey);

      background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
      display: inline-block;
      background-size: 200% 100%;

      animation: 1.5s shine linear infinite;

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

    background: linear-gradient(100deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
    background-size: 200% 100%;

    border-radius: 187px 0px 0px 0px;

    background-color: var(--lightGrey);
    animation: 1.5s shine linear infinite;

    i {
      color: white;
      font-size: 5rem;
    }
  }
}

.fake-basic-services,
.fake-advanced-services {
  border-top: 1px solid var(--lightGrey);
  border-bottom: 1px solid var(--lightGrey);

}

.fake-icon {
  width: 25px;
  height: 25px;
  background-color: var(--darkerGrey);
  border-radius: 5px;
}

.fake-text {
  .fake-title,
  .fake-subtitle {
    background-color: var(--lightGrey);
    border-radius: 5px;
  }

  .fake-title {
    width: 150px;
    height: 15px;
  }
  
  .fake-subtitle {
    width: 100px;
    height: 10px;
  }
}

.fake-advanced-services {
  .fake-advanced-title {
    width: 300px;
        height: 20px;
        border-radius: 10px;
        background-color: var(--lightGrey);
  }
  
  .fake-advanced-service-title {
    width: 80px;
    height: 20px;
    background-color: var(--lightGrey);
    border-radius: 5px;
  }
}

@keyframes shine {
    to {
      background-position-x: -200%;
    }
  }
</style>
