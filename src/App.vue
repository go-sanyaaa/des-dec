<template lang="pug">
  section.desc
    h1.desc__title Дизайнер-декоратор
    img(src="img/logo.png").desc__img
    a(href="https://github.com/go-sanyaaa/des-dec").desc__link GitHub
</template>

<script>
    export default {
        name: "App"
    }
</script>

<style lang="sass" scoped>
.desc
  width: 280px
  margin: 60px auto
  display: flex
  flex-direction: column
  &__title
    text-align: center
    font-size: 28px
    margin-bottom: 20px
    color: $secondary
  &__img
    object-fit: contain
  &__link
    text-align: center
    margin-top: 20px
    font-weight: bold
    color: $dark
</style>