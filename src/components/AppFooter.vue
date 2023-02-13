<script>
export default {
    name: "AppFooter",
data() {
    return {
        socials: ["fa-brands fa-facebook-f", "fa-brands fa-twitter", "fa-brands fa-youtube", "fa-brands fa-instagram", "fa-brands fa-linkedin"],
        credits: ["Copyright 2023 Boolbnb, Inc |  ", " All Rights Reserved"]
        }
    }
}
</script>

<template>
    <footer>
        <div class="copyrights d-flex align-items-center">
            <h5 class="fw-bolder m-0" v-for="credit in credits">{{ credit }}</h5>
        </div>
        <ul class="socials-icons d-flex justify-content-between m-0">
            <li v-for="social in socials">
                <i :class="social"></i>
            </li>
        </ul>
    </footer>
</template>

<style lang="scss" scoped>
@use "../styles/general.scss" as *;
footer {
  padding: 2rem;
  display: flex;
  justify-content: space-between;

//   Copyrights
  .copyrights {
    color: var(--basicBlack);

    h5 {
        font-size: .9rem;
    }
  }
//   Copyrights

// Socials
  .socials-icons {
    width: 300px;
    color: var(--socials);
    
    i {
        padding: .5rem;
        font-size: 1.2rem;
        background-color: var(--lightGrey);
    }
  }
}
// Socials
</style>