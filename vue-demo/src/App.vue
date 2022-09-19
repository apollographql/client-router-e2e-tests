<template>
  <h1>@vue/apollo-composable + @defer demo</h1>
  <p v-if="error">Something went wrong...</p>
  <p v-if="loading">Loading...</p>
  <div v-else v-for="product in result.allProducts" :key="product.id">
    {{ (product.id && product.sku) ? `Product: ${product.id}` : '' }}
    <p>Dimensions: {{ product.dimensions ? `${product.dimensions.size}✨` : '' }}</p>
  </div>
  <div></div>
</template>

<script>
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'

const PRODUCTS_QUERY = gql`
  query TestQuery {
    allProducts {
      ...DimensionsAndVariation @defer
      sku
      id
    }
  }
  fragment DimensionsAndVariation on Product {
    dimensions {
      size
    }
    variation {
      id
      name
    }
  }
`
export default {
  name: 'App',
  setup () {
    const { result, loading, error } = useQuery(PRODUCTS_QUERY);
    return {
      result,
      loading, 
      error
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
