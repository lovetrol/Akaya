const app = {
    state: {
        allSeries: [],
        currentIndex: 0,
        pageSize: 10,
        isLoading: false 
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
            
            console.log("Series válidas cargadas:", this.state.allSeries.length);
            
            this.renderNextBatch();

        } catch (error) {
            console.error("Error cargando datos:", error);
        }
        
        document.getElementById('loading').style.display = 'none';
    },

    renderNextBatch: function() {
        const { allSeries, pageSize } = this.state;
        if (!allSeries || allSeries.length === 0) return;

        this.state.isLoading = true;
        const container = document.getElementById('series-container');
        for (let i = 0; i < pageSize; i++) {
            const indexCircular = this.state.currentIndex % allSeries.length;
            
            const serie = allSeries[indexCircular];
            const div = document.createElement('div');
            div.innerHTML = UiRenderer.createCardHtml(serie).trim();
            container.appendChild(div.firstChild);
            this.state.currentIndex++;
        }

        this.state.isLoading = false;
    },

    setupScroll: function() {
        window.addEventListener('scroll', () => {
            const distanciaAlFinal = document.body.offsetHeight - (window.innerHeight + window.scrollY);
            
            if (distanciaAlFinal < 100 && !this.state.isLoading) {
                this.renderNextBatch();
            }
        });
    },

    openDetail: async function(id, event) {
        event.stopPropagation(); 
        console.log("Abriendo detalle:", id);
        const detail = await ApiService.getSerieDetail(id);
        if (detail) {
            UiRenderer.renderModal(detail);
        }
    }
};

app.initialize();