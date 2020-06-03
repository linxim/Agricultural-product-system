<template>
  <div>
    <page-header></page-header>
    <fruit></fruit>
    <vegetables></vegetables>
    <meat></meat>
    <page-footer></page-footer>
  </div>
</template>

<script>
import PageHeader from './PageHeader'
import Fruit from './fruit/fruit'
import Vegetables from './vegetables/vegetables'
import Meat from './meat/meat'
import PageFooter from './footer/pagefooter'

export default {
  components: {
    PageHeader,
    Fruit,
    Vegetables,
    Meat,
    PageFooter
  },
  data () {
    return {
 
    }
  },

  methods: {
    
  },
  mounted () {
   
  }
}
</script>

<style scoped>
* {
  margin: 0px;
  padding: 0px;
}

li {
  list-style: none;
}
