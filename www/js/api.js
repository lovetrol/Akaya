const ApiService = {
    async getSeries() {
        try {
            const url = `${APP_CONFIG.API_URL}/get/series`; 
            console.log("Intentando conectar a:", url); 

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({}) 
            });
            
            const data = await response.json();
            console.log("Datos recibidos de API:", data); 
            return data;

        } catch (error) {
            console.error("ERROR FATAL EN API:", error); 
            return [];
        }
    },
    async getSerieDetail(serieId) {
        if (!serieId) {
            console.error("ERROR: ID indefinido");
            return null;
        }

        try {
            const url = `${APP_CONFIG.API_URL}/get/series/detail?id=${serieId}`;
            console.log("Consultando detalle:", url);
            const response = await fetch(url, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: serieId }) 
            });

            if (!response.ok) {
                console.error(`API Error ${response.status}`);
                return null;
            }

            const data = await response.json();
            console.log("Detalle recibido:", data);
            return data;

        } catch (error) {
            console.error("Error de Red:", error);
            return null;
        }
    }
};