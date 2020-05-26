import debounce from '../util/debounce'

export default (fieldToWatch, debounceTime = 350) => ({
  data () {
    return {
      _debouncedSearchEvent: null
    }
  },
  watch: {
    [fieldToWatch] (query) {
      if (query.length >= 3) {
        if (!this._debouncedSearchEvent) {
          this._debouncedSearchEvent = debounce((q) => {
            this.fbpSearch(q)
          }, debounceTime)
        }
        this._debouncedSearchEvent(query)
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
})