const videoOceano = document.getElementById('video-oceano');
const btnCambiar = document.getElementById('btn-cambiar-vision');
const hudTexto = document.getElementById('hud-texto');
const avisoRotacion = document.getElementById('aviso-rotacion');

// 0. DETECCIÓN DE ORIENTACIÓN DEL DISPOSITIVO
function verificarOrientacion() {
    const esPortrait = window.innerHeight > window.innerWidth;
    const esMobile = window.innerWidth <= 768;
    
    if (esMobile && esPortrait) {
        avisoRotacion.classList.add('activo');
    } else {
        avisoRotacion.classList.remove('activo');
    }
}

// Verificar orientación al cargar
verificarOrientacion();

// Escuchar cambios de orientación
window.addEventListener('orientationchange', () => {
    setTimeout(verificarOrientacion, 100);
});

window.addEventListener('resize', verificarOrientacion);

// 1. LÓGICA DE INTERCAMBIO DE VISTA (BOTÓN)
btnCambiar.addEventListener('click', () => {
    document.body.classList.toggle('modo-tiburon');
    
    if (document.body.classList.contains('modo-tiburon')) {
        hudTexto.innerHTML = `
            <p><strong>MODO:</strong> VISTA DE DEPREDADOR (Carcharodon carcharias)</p>
            <p><strong>ESPECTRO:</strong> MONOCROMÁTICO (0% CONOS DE COLOR)</p>
            <p><strong>ÓPTICA:</strong> ENFOQUE CENTRAL / PERIFERIA DIFUSA</p>
            <p><strong>RESOLUCIÓN:</strong> BAJA (PROCESAMIENTO DE SILUETAS Y CONTRASTE)</p>
        `;
    } else {
        hudTexto.innerHTML = `
            <p><strong>MODO:</strong> VISTA HUMANA (Homo sapiens)</p>
            <p><strong>ESPECTRO:</strong> TRICROMÁTICO (RGB COMPLETO)</p>
            <p><strong>ÓPTICA:</strong> ENFOQUE CRISTALINO BINOCULAR (~120°)</p>
            <p><strong>RESOLUCIÓN:</strong> ALTA DEFINICIÓN ÓPTICA</p>
        `;
    }
});

// 2. FÍSICAS DE LA CÁMARA (Efecto de flotación e inercia subacuática)
let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;

window.addEventListener('mousemove', (e) => {
    // Convierte las coordenadas del cursor en un rango de -0.5 a 0.5
    mouseX = (e.clientX / window.innerWidth) - 0.5;
    mouseY = (e.clientY / window.innerHeight) - 0.5;
});

function animarCamara() {
    // Algoritmo de suavizado lineal (Lerp): 0.04 define la densidad pesada del agua
    currentX += (mouseX - currentX) * 0.04;
    currentY += (mouseY - currentY) * 0.04;

    // Amplitud de movimiento del mapa de video
    const rangoX = 110; 
    const rangoY = 80;
    
    const moverX = currentX * -rangoX;
    const moverY = currentY * -rangoY;
    const cabeceoZ = currentX * -3.5; // Simula el vaivén del nado

    // Aplicar coordenadas calculadas al elemento de video
    videoOceano.style.transform = `translate(${moverX}px, ${moverY}px) rotate(${cabeceoZ}deg)`;

    // Ejecuta el bucle en el próximo fotograma de la pantalla
    requestAnimationFrame(animarCamara);
}

// Iniciar sistema de física visual
animarCamara();
