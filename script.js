let data = [];

async function loadData() {
    try {
        const response = await fetch('data.json');
        data = await response.json();
    } catch (error) {
        console.error('Error cargando data.json:', error);
    }
}

document.getElementById('consultarBtn').addEventListener('click', () => {
    const input = document.getElementById('codigoInput').value.trim();
    if (input.length !== 4 || isNaN(input)) {
        showResult('<p class="error">Por favor, ingresa exactamente 4 dígitos.</p>');
        return;
    }

    const user = data.find(u => (u.last4 || u.cod.slice(-4)) === input);
    if (!user) {
        showResult('<p class="error">No se encontró un usuario con ese código.</p>');
        return;
    }

    let html = `<h2>${user.nombre}</h2><div class="cards-container">`;
    user.meses.forEach(mes => {
        html += `
            <div class="card">
                <h3>${mes.MES.charAt(0).toUpperCase() + mes.MES.slice(1)}</h3>
                <p><strong>Mes Pasado:</strong> ${mes['MES PASADO']}</p>
                <p><strong>Mes Actual:</strong> ${mes['MES ACTUAL']}</p>
                <p><strong>Metros Cúbicos:</strong> ${mes['METROS CUBICOS']}</p>
                <p><strong>Monto (Bs):</strong> ${mes['MONTO EN BS']}</p>
            </div>
        `;
    });
    html += '</div>';
    showResult(html);
});

function showResult(html) {
    document.getElementById('resultado').innerHTML = html;
}

// Cargar datos al inicio
loadData();