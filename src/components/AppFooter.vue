<script>
export default {
  name: "AppFooter",
  data() {
    return {
      socials: [
        "fa-brands fa-facebook-f",
        "fa-brands fa-twitter",
        "fa-brands fa-youtube",
        "fa-brands fa-instagram",
        "fa-brands fa-linkedin",
      ],
      credits: ["Copyright 2023 Boolbnb, Inc | All Rights Reserved"],
    };
  },
};
</script>

<template>
  <footer class="container d-flex align-items-center">
    <div class="row justify-content-between align-items-center w-100">
      <div class="col-12 col-md-6 order-md-2">
        <ul class="socials-icons m-0">
          <li v-for="social in socials">
            <div class="square">
              <i :class="social"></i>
            </div>
          </li>
        </ul>
      </div>
      <div class="col-12 col-md-6 order-md-1">
        <div class="text-center text-md-start">
          <p class="fw-bolder m-0 p-0" v-for="credit in credits">
            {{ credit }}
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use "../styles/general.scss" as *;

footer {
  height: 80px;

  // Socials
  .square {
    width: 40px;
    height: 40px;
    background-color: var(--lightGrey);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  li:not(:last-child) {
    margin-right: 10px;
  }

  .socials-icons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: var(--socials);

    i {
      background-color: var(--lightGrey);
    }
  }

  // Socials

  //   Copyrights
  .row {
    p {
      font-size: 1rem;
    }
  }
}

@media only screen and (max-width: 767px) {
  footer {
    .socials-icons {
      justify-content: center;
    }

    .row {
      p {
        padding: 1rem;
      }
    }
  }
}

@media only screen and (min-width: 576px) {
  footer .row {
    p {
      font-size: 1.2rem;
    }
  }
}

@media only screen and (min-width: 992px) {
  footer .row {
    p {
      font-size: 1rem;
    }
  }
}
</style>
