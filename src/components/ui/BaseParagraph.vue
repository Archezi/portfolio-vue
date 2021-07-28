<template>
    <p>
        {{ projectDescription }}
    </p>
</template>



<script>
export default {
    props: ['id', ],
    computed: {
        projectDescription() {
            return this.desc;
        }
    }
}
</script>

<style lang="scss" scoped>

    p {
        color: white;
        font-size: 1.6rem;
        z-index: 10;
    }
</style>>
