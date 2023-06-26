const inputCiudad = document.getElementById(`inputCiudad`);
const btnEnviar = document.getElementById(`btnEnviar`);
const content = document.getElementById(`content`);

const key = `60b8cc4849c0ce289f96fe055bdd008b`
/* Funciones */
const consultaClima = async () => {
  //Funcion consultaClima
  const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${inputCiudad.value}&appid=60b8cc4849c0ce289f96fe055bdd008b&units=metric&lang=es`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCiudad.value}&lang=sp&appid=${key}&units=metric&cnt=6`;
  try {
    console.log(`esperando...`);
    const resp = await fetch(url);
    const data = await resp.json();
    console.log(data);
    console.log(`tarea completa`);
    const idIcon = data.weather[0].icon;
    const iconUrl = `https://api.openweathermap.org/img/w/${idIcon}.png`;
    pintarInfo(data, iconUrl);
    pronostico()
    /* crearMapMet(data) */
    crearMap(data);
  } catch (error) {
    console.log(`hubo un error`,error);
  }
};

const pintarInfo = (data, iconUrl) => {
  //Funcion pintarInfo
  const iconContainer = document.getElementById(`iconContainer`);
  content.innerHTML = `
    <tr>
        <td>${data.name}</td>
        <td>${data.main.temp.toFixed(0)}°C</td>
        <td><img src="${iconUrl}"></td>
        <td>${data.weather[0].description}</td>
    </tr>
    `;
};

const pronostico = async () => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${inputCiudad.value}&appid=${key}`
  try {
    const resp = await fetch(url)
    const data = await resp.json()
    console.log(`forecast`,data)
    const lista = data.list
    console.log(lista)
    const fecha = lista.map((element)=>{
      return element.dt_txt
    })
    console.log(fecha)
  } catch (error) {
    console.log(`hubo un error`, error)
  }
}

            /* No funciona */
/* const crearMapMet = async (data) => {
  const mapMet = document.getElementById(`mapMet`)
  const lon = data.coord.lon
  const lat = data.coord.lat
  const url = `https://tile.openweathermap.org/map/temp_new/10/20/103.png?q=${inputCiudad.value}&appid=60b8cc4849c0ce289f96fe055bdd008b
  `
  try {
    const resp = await fetch(url)
    const imagen = await resp.blob()
    const urlImagen = URL.createObjectURL(imagen)
    const mapaMet = document.createElement(`img`)
    mapaMet.src = url
    mapaMet.id = `mapaMet`
    mapMet.appendChild(mapaMet)
  } catch (error) {
    console.log('Error al cargar el mapa:', error);
  }
} */

const crearMap = async (data) => {
  //Funcion CrearMap
  const map = document.getElementById("map");
  const lon = data.coord.lon
  const lat = data.coord.lat 

  const url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=12&size=250x250&language=es&markers=color:red%7C${lat},${lon}&key=AIzaSyB_XovRPL628I8hQ5ZTaJRw2Sy8j7BTBnQ`;
  try {
    const resp = await fetch(url);
    const imagen = await resp.blob();
    const urlImagen = URL.createObjectURL(imagen);
    const mapa = document.createElement("img");
    mapa.src = urlImagen;
    mapa.id = `mapa`;
    map.appendChild(mapa);
  } catch (error) {
    console.log("Error al cargar el mapa:", error);
  }
};

/* ChartJS */
const ctx = document.getElementById("myChart");

new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

/* eventos */
btnEnviar.addEventListener(`click`, consultaClima); //Evento btnEnviar

