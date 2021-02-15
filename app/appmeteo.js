function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
} //met la première lettre en majuscule de toutes les chaines de caractère

async function main(withIP = true) {
    let ville;
    if (withIP) {
        // la fonction fetch sert  à faire des promesses. Une promesse c'est lorsque JS nous dit qu'il va faire une action et qu'il nous promet qu'une fois que cette action sera terminé, il fera ce qu'on lui a demandé. Lorsque la focntion fetch est terminé, le resultat que nous avons est une réponse.
        const ip = await (await fetch('https://api.ipify.org?format=json')).json();
        // cette API sert à nous géolocaliser depuis l'adresse IP de notre ordinateur
        // .then(resultat => resultat.json())
        // //then permet de dire voici ce que j'aimerais que tu fasse une fois que tu auras récupéré le contenu de l'url que je t'ai passé. THEN = signie "voilà ce que tu feras quand tu auras terminé"
        // .then(json => json.ip);
        console.log(ip.ip);

        ville = await (
            await fetch(
                `http://api.ipstack.com/${ip.ip}?access_key=6917170349220de06e3a43ba602e9f98&output=json&legacy=1`
            )
        ).json();

        // Récupére la ville en fonction de l'adresse IP
        // .then(resultat => resultat.json()) //affiche moi les résultats en format JSON
        // .then(json => json.city);
        console.log(ville);
    } else {
        ville = document.querySelector('.ville').textContent;
        // textContent;
    }

    const location = ville.city.split(' ')[0];

    const meteo = await (
        await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=575f53e2fa17f74dd09bda3e82b140e3&lang=fr&units=metric`
        )
    ).json();

    // .then(resultat => resultat.json())
    // .then(json => json);

    displayWeatherInfos(meteo);
}

function displayWeatherInfos(data) {
    console.log(data);
    const name = data.name;
    const temperature = data.main.temp;
    const conditions = data.weather[0].main;
    const description = data.weather[0].description;
    document.querySelector('.ville').textContent = name;
    document.querySelector('#temperature').textContent = Math.round(temperature);
    document.querySelector('#conditions').textContent = capitalize(description);
    // document.querySelector('i.wi').className = weatherIcons[conditions];
    document.body.className = conditions.toLowerCase();
}

// pour changer de ville ==>
const ville = document.querySelector('.ville');

ville.addEventListener('click', () => {
    ville.contentEditable = true; //contentEditable permet de modifier le contenu
});

ville.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
        e.preventDefault(); //preventdefault permet de ne pas revenir à la ligne
    }
});
//keydown signifie "quand on appuie sur la touche", on passe en parametre l'événement (e), je rajoute une condition pour préciser que ce n'est que la touche "entrée" qui est concernée. 13 étant le code de la touche entrée
main();

//AUTO COMPLETION 
const myInput = document.querySelector("#Recherche")
const btnOk = document.querySelector("#btn");
const autoCm = document.querySelector('#monUl');
const lat = 36.9;
const long = 7.7667;
const mymap = L.map('mapid').setView([lat, long], 10);




//auto compliton du champ
myInput.addEventListener('keyup', (event) => {
    event.preventDefault();
    // console.log(myInput.value);

    const url = `https://places-dsn.algolia.net/1/places/query`;
    fetch(url, {
            method: "POST",
            body: JSON.stringify({ query: myInput.value })
        })
        .then(res => res.json())
        .then((data) => {
            // console.log(data)
            autoCm.innerHTML = '',
                data.hits.forEach(element => {
                    // console.log(element.locale_names.default)
                    autoCm.insertAdjacentHTML('beforeend', `
                <li>${element.locale_names.default}</li>
                `)
                });
        })

});

//mapGéo
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2Fpa291IiwiYSI6ImNra3h1dGllZzAzZzcyb3Fvdmx0MzNvMWIifQ.E2Bj_8bT4qrVsTzkQmrroA', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    // accessToken: 'your.mapbox.access.token'
}).addTo(mymap);
//indicateur//
var marker = L.marker([lat, long]).addTo(mymap);


btnOk.addEventListener('click', (event) => {
    event.preventDefault();


    console.log(myInput.value);

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${myInput.value}&units=metric&APPID=135165fee6ce87eb1cda40569a3d699c`;
    fetch(url)
        .then(res => res.json())
        // .then(res => console.log(res))
        .then((data) => {
            // console.log(data.coord)
            mymap.setView([data.coord.lat, data.coord.lon], 10);
            var marker = L.marker([data.coord.lat, data.coord.lon]).addTo(mymap);
            autoCm.innerHTML = '';

            //refresh
            //sinon supprimer 

        })

});
//FIN AUTO COMPLETION 
