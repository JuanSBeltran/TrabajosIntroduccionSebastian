// busqueda.js
const urlVuelos = "https://umoxzhitoujluggspitx.supabase.co/rest/v1/vuelos_disponibles";
const urlDestinos = "https://umoxzhitoujluggspitx.supabase.co/rest/v1/destinos";
const urlOrigen = "https://umoxzhitoujluggspitx.supabase.co/rest/v1/origen";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtb3h6aGl0b3VqbHVnZ3NwaXR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExMTU2MTgsImV4cCI6MjA3NjY5MTYxOH0.7FahMznLDSsSaidDFUVpOc9Awy4iB5HQXxTkIL9RdN8";

// Configurar para leer desde la consola
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

async function buscarVuelos() {
    try {
        // Primero obtener todos los destinos disponibles
        console.log('🛫 Obteniendo destinos disponibles...\n');
        const responseDestinos = await fetch(urlDestinos, {
            headers: { 'apikey': API_KEY }
        });
        const destinos = await responseDestinos.json();
        
        // Mostrar destinos disponibles por nombre de ciudad
        console.log('🏙️  CIUDADES DISPONIBLES:');
        destinos.forEach(destino => {
            console.log(`   📍 ${destino.ciudad}`);
        });
        
        console.log('\n');

        // Preguntar al usuario
        readline.question('📍 ¿A qué ciudad quieres viajar? (escribe el nombre): ', async (ciudadBuscada) => {
            if (!ciudadBuscada.trim()) {
                console.log('❌ Debes escribir un nombre de ciudad');
                readline.close();
                return;
            }

            // Buscar el destino que coincida con la ciudad
            const destinoEncontrado = destinos.find(destino => 
                destino.ciudad.toLowerCase().includes(ciudadBuscada.toLowerCase())
            );

            if (!destinoEncontrado) {
                console.log(`❌ No se encontró la ciudad: "${ciudadBuscada}"`);
                readline.close();
                return;
            }

            console.log(`\n🔍 Buscando vuelos a ${destinoEncontrado.ciudad}...\n`);

            // Obtener todos los vuelos
            const responseVuelos = await fetch(urlVuelos, {
                headers: { 'apikey': API_KEY }
            });
            const vuelos = await responseVuelos.json();

            // Obtener información de los orígenes
            const responseOrigen = await fetch(urlOrigen, {
                headers: { 'apikey': API_KEY }
            });
            const origenes = await responseOrigen.json();

            // Filtrar vuelos por destino_id
            const vuelosFiltrados = vuelos.filter(vuelo => vuelo.destino_id == destinoEncontrado.id);
            
            if (vuelosFiltrados.length === 0) {
                console.log(`❌ No se encontraron vuelos a ${destinoEncontrado.ciudad}`);
                readline.close();
                return;
            }
            
            console.log(`✅ Se encontraron ${vuelosFiltrados.length} vuelos a ${destinoEncontrado.ciudad}:\n`);
            
            vuelosFiltrados.forEach(vuelo => {
                // Buscar el nombre del origen
                const origenInfo = origenes.find(origen => origen.id === vuelo.origen_id);
                const nombreOrigen = origenInfo ? origenInfo.ciudad : `ID: ${vuelo.origen_id}`;
                
                console.log(`✈️  ${vuelo.aerolinea}`);
                console.log(`   🚀 Desde: ${nombreOrigen}`);
                console.log(`   🎯 Hacia: ${destinoEncontrado.ciudad}`);
                console.log(`   💰 Precio: $${vuelo.precio}`);
                console.log(`   🗓️  Fecha: ${vuelo.fecha_salida}`);
                console.log(`   ⏰ Hora: ${vuelo.hora_salida}`);
                console.log(`   ⏱️  Duración: ${vuelo.duracion}`);
                console.log('   ──────────────────────────');
            });
            
            readline.close();
        });

    } catch (error) {
        console.log('❌ Error:', error);
        readline.close();
    }
}

// Iniciar la búsqueda
buscarVuelos();