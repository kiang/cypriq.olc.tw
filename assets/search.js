window.searchIndex = null;
function personSearch() {
    return {
        query: '',
        results: [],
        async search() {
            if (this.query.length < 1) { this.results = []; return; }
            if (!window.searchIndex) {
                var base = document.documentElement.dataset.baseUrl || '';
                var res = await fetch(base + '/search-index.json');
                window.searchIndex = await res.json();
            }
            var q = this.query.toLowerCase();
            this.results = window.searchIndex
                .filter(function(p) { return p.name.includes(q) || (p.agency && p.agency.includes(q)); })
                .slice(0, 20);
        }
    }
}
