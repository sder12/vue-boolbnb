<script>
export default {
    name: 'NotFoundPage',
}

</script>


<template>
    <div id="not-found" class="container text-center">
        <i class="fa-solid fa-triangle-exclamation fs-4"></i>
        <h1 class="my-3">404 not found</h1>
        <router-link :to="{ name: 'home' }" class="btn btn-warning">
            back to home
        </router-link>
    </div>
</template>


<style lang="scss" scoped>
#not-found {
    height: calc(100vh - 180px);
    padding: 5rem 0;
}
</style>