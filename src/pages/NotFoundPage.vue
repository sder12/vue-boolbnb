<script>
export default {
    name: 'NotFoundPage',
}

</script>


<template>
    <div class="container text-center">
        <h1>404 not found</h1>
        <router-link :to="{ name: 'home' }" class="btn btn-warning">
            back to home
        </router-link>
    </div>
</template>


<style lang="scss" scoped>

</style>