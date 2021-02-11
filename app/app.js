function capitalize(str){
    return str[0].toUpperCase() + str.slice(1);
} //met la première lettre en majuscule de toutes les chaines de caractère 
async function main(withIP = true){
    let ville; 
    if(withIP){
// la fonction fetch sert  à faire des promesses. Une promesse c'est lorsque JS nous dit qu'il va faire une action et qu'il nous promet qu'une fois que cette action sera terminé, il fera ce qu'on lui a demandé. Lorsque la focntion fetch est terminé, le resultat que nous avons est une réponse. 
const ip = await fetch('https://api.ipify.org?format=json') 
// cette API sert à nous géolocaliser depuis l'adresse IP de notre ordinateur
   .then(resultat => resultat.json())
   //then permet de dire voici ce que j'aimerais que tu fasse une fois que tu auras récupéré le contenu de l'url que je t'ai passé. THEN = signie "voilà ce que tu feras quand tu auras terminé" 
   .then(json => json.ip)

const ville = await fetch('http://freegeoip.net/json/' + ip) // Récupére la ville en fonction de l'adresse IP
   .then(resultat => resultat.json()) //affiche moi les résultats en format JSON
   .then(json => json.city) 
}  else {
   ville = document.querySelector('#ville')
   textContent;
} 
      
const meteo = await fetch('https://api.openweathermap.org/data/2.5/weather?q=$(ville)&appid=575f53e2fa17f74dd09bda3e82b140e3&lang=fr&units=metric')
    .then(resultat => resultat.json())
    .then(json => json)
displayWeatherInfos(meteo)
}    

function displayWeatherInfos(data){
    const name = data.name;
    const temperature = data.main.temp;
    const conditions = data.weather[0].main;
    const description = data.weather[0].description;
document.querySelector('#ville').textContent = name;
document.querySelector('#temperature').textContent = Math.round(temperature);
document.querySelector('#conditions').textContent = capitalize(description);
document.querySelector('i.wi').className = weatherIcons[conditions]
document.body.className = conditions.toLowerCase()
}

// pour changer de ville ==>
const ville = document.querySelector('#ville');

ville.addEventListener('click', () => {
  ville.contentEditable = true; //contentEditable permet de modifier le contenu
}); 

ville.addEventListener('keydown', (e) => {
   if(e.keyCode === 13){
      e.preventDefault(); //preventdefault permet de ne pas revenir à la ligne
    }
})
//keydown signifie "quand on appuie sur la touche", on passe en parametre l'événement (e), je rajoute une condition pour préciser que ce n'est que la touche "entrée" qui est concernée. 13 étant le code de la touche entrée 
main();
