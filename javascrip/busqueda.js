// busqueda-simple.js
const url = "https://umoxzhitoujluggspitx.supabase.co/rest/v1/vuelos_disponibles";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtb3h6aGl0b3VqbHVnZ3NwaXR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExMTU2MTgsImV4cCI6MjA3NjY5MTYxOH0.7FahMznLDSsSaidDFUVpOc9Awy4iB5HQXxTkIL9RdN8";

console.log('Procesando punto 1. Obteniendo todos los datos de la tabla vuelos_disponibles>>>>...');
fetch(url,{headers:{'apikey': API_KEY}})
.then(r=>r.json())
.then(data=>console.log('todos los datos de la tabla vuelos_disponibles esta asi',data))