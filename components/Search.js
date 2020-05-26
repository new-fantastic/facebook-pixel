export default {
  watch: {
    query (query) {
      if (query.length >= 3) {
        this.fbpSearch(query)
      }
    }
  },
  methods: {
    fbpSearch(searchQuery) {
      fbq('track', 'Search', {
        search_string: searchQuery
      })
    }
  }
}