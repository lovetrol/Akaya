const app = {
    state: {
        allSeries: [],
        currentIndex: 0,
        pageSize: 5
    },

    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: async function() {
        console.log('App iniciada');
        await this.loadInitialData();
        this.setupScroll();
    },

    loadInitialData: async function() {
        document.getElementById('loading').style.display = 'block';
        
        try {
            const rawData = await ApiService.getSeries();
            const listaReal = rawData.items || []; 

            this.state.allSeries = listaReal.filter(serie => {
                const estaPublicada = serie.status && serie.status.toLowerCase() === 'published';
                const tieneImagen = serie.image && serie.image.trim() !== '';
                const tieneCapitulos = serie.total_chapters > 0;
                return estaPublicada && tieneImagen && tieneCapitulos;
            });
            
            console.log("Series cargadas:", this.state.allSeries.length);
            this.renderNextBatch();

        } catch (error) {
            console.error("Error cargando datos:", error);
        }
        
        document.getElementById('loading').style.display = 'none';
    },

    renderNextBatch: function() {
        const { allSeries, currentIndex, pageSize } = this.state;
        if (currentIndex >= allSeries.length) return;
        const batch = allSeries.slice(currentIndex, currentIndex + pageSize);
        const container = document.getElementById('series-container');

        batch.forEach(serie => {
            const div = document.createElement('div');
            div.innerHTML = UiRenderer.createCardHtml(serie).trim();
            container.appendChild(div.firstChild);
        });

        this.state.currentIndex += pageSize;
    },

    setupScroll: function() {
        window.addEventListener('scroll', () => {
            // espacio al final
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
                this.renderNextBatch();
            }
        });
    },

    openDetail: async function(id, event) {
        event.stopPropagation(); 
        const detail = await ApiService.getSerieDetail(id);
        if (detail) UiRenderer.renderModal(detail);
    }
};

app.initialize();