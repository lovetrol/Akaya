const UiRenderer = {
    createCardHtml(serie) {
        const fullImageUrl = serie.image && serie.image.startsWith('http') 
            ? serie.image 
            : `${APP_CONFIG.IMG_URL}${serie.image}`;
            
        return `
            <div class="card" onclick="UiRenderer.toggleCardActive(this)">
                <img src="${fullImageUrl}" alt="${serie.name}" class="card-image">
                
                <div class="card-info">
                    <h3 class="card-title">${serie.name}</h3>
                    <p class="card-meta">${serie.total_chapters} Capítulos</p>
                </div>

                <div class="card-overlay">
                    <h3 class="card-title" style="color:#fff; text-align:center">${serie.name}</h3>
                    <p class="card-meta" style="color:#ccc">${serie.total_chapters} Capítulos</p>
                    
                    <button class="btn-ver-mas" onclick="app.openDetail('${serie.id}', event)">
                        VER MÁS
                    </button>
                </div>
            </div>
        `;
    },
    toggleCardActive(cardElement) {
        document.querySelectorAll('.card.active').forEach(c => {
            if (c !== cardElement) c.classList.remove('active');
        });
        cardElement.classList.toggle('active');
    },
    renderModal(serieData) {
        const data = serieData.item || serieData.serie || serieData;

        const modalBody = document.getElementById('modal-body');
        const imgUrl = data.image ? `${APP_CONFIG.IMG_URL}${data.image}` : 'img/placeholder.png';

        console.log("Datos para modal:", data); 
        modalBody.innerHTML = `
            <div style="display:flex; flex-direction:column; align-items:center;">
                <img src="${imgUrl}" style="width:140px; height:210px; object-fit:cover; border-radius:12px; box-shadow:0 5px 15px rgba(0,0,0,0.3); margin-bottom:15px;">
                
                <h2 style="text-align:center; margin-bottom:10px; font-size:1.4rem; color:#000;">
                    ${data.name || 'Sin Título'}
                </h2>
                
                <div style="display:flex; gap:15px; margin-bottom:20px; font-size:0.9rem; color:#555;">
                    <span style="background:#eee; padding:5px 12px; border-radius:20px;">
                        Estado: <strong>${data.status || 'N/A'}</strong>
                    </span>
                    <span style="background:#eee; padding:5px 12px; border-radius:20px;">
                        Caps: <strong>${data.total_chapters || 0}</strong>
                    </span>
                </div>
                
                <hr style="width:100%; border:0; border-top:1px solid #eee; margin-bottom:15px;">
                
                <div style="width:100%; text-align:left;">
                    <h4 style="margin-bottom:8px; font-size:1rem; color:#333;">Sinopsis</h4>
                    <p style="line-height:1.5; color:#666; font-size:0.95rem;">
                        ${data.description || 'No hay descripción disponible para esta serie.'}
                    </p>
                </div>
            </div>
        `;
        
        document.getElementById('detail-modal').classList.remove('hidden');
    }
};

document.getElementById('close-modal').onclick = () => {
    document.getElementById('detail-modal').classList.add('hidden');
};

document.getElementById('detail-modal').addEventListener('click', function(event) {
    if (event.target === this) {
        this.classList.add('hidden');
    }
});