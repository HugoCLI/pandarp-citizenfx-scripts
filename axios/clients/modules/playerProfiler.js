
// Chargement des informations utilisateurs
let Profiler;
onNet('Profiler', (data) => {
    Profiler = data;
    console.log("Profiler", "OK");
})
