<script>
export default {
    name: 'SentMessagePage'
}
</script>

<template>
    <div class="container-fluid d-flex justify-content-center">
        <div class="row row-cols-1 row-cols-md-2 w-75">
            <div class="col text-center">
                <h2>Well done!</h2>
                <h3>Your message was sent to our host!</h3>

                <router-link :to="{ name: 'home' }" class="ms-btn-filter mt-3">
                    Back home
                </router-link>
            </div>
            <div class="col text-center">
                <img src="../assets/front-message-yes.svg" alt="sent-message" class="w-50 pt-5">
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container-fluid {
    background-color: var(--bgGrey);

    .row {
        background-color: white;
        margin: 3em 0;
        padding: 6em 2em;
    }

    h2,
    h3 {
        font-weight: bolder;
        color: var(--darkBlue);
    }

    .ms-btn-filter {
        background-color: var(--darkBlue);
        display: inline-block;

        &:hover {
            color: white;
        }
    }
}
</style>