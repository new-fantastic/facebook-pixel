export default {
  methods: {
    fbpSearch(searchQuery) {
      fbq('track', 'Search', {
        search_string: searchQuery
      })
    }
  }
}