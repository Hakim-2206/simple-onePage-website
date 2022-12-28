

function searchCountry() {
    const searchTerm = document.getElementById('search').value;
    fetch(`https://restcountries.com/v2/all?name=${searchTerm}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données de l\'API');
        }
        return response.json();
      })
      .then(countries => {
        // Vérifier qu'au moins un pays correspondant a été trouvé
        if (countries.length > 0) {
          // Supprimer les éventuelles cartes déjà affichées
          const cards = document.querySelectorAll('.card');
          for (let i = 0; i < cards.length; i++) {
            cards[i].remove();
          }
          // Pour chaque pays trouvé, créer une carte avec son nom et son drapeau
          countries.forEach(country => {
            // Vérifier si le nom du pays contient la chaîne de caractères recherchée
            if (country.name.toLowerCase().includes(searchTerm.toLowerCase())) {
              const card = document.createElement('div');
              card.classList.add('card');
              card.style.textAlign = 'center';
              // Ajouter le nom du pays
              const h2 = document.createElement('h2');
              h2.innerText = country.name;
              h2.style.border = '1px solid white';
              h2.style.display = 'inline-block';
              h2.style.padding = '2rem';
              card.appendChild(h2);
              // Ajouter la capitale
              const capitaleH2 = document.createElement('h2');
              capitaleH2.innerText = 'Capital city : ' + country.capital;
              card.appendChild(capitaleH2);
              // Ajouter le drapeau du pays
              const img = document.createElement('img');
              img.className = "image-responsive";
              img.src = `${country.flag}`;
              img.alt = `Drapeau de ${country.name}`;
              card.appendChild(img);
              // Ajouter la carte à la page
              document.body.appendChild(card);
            }
          });
        } else {
          // Si aucun pays n'a été trouvé, afficher un message d'erreur
          console.error('Aucun pays trouvé');
        }
      })
      .catch(error => console.error(error));
  }

  const form = document.createElement('form');
form.addEventListener('submit', function(event) {
  event.preventDefault();
  searchCountry();
});
const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.id = 'search';
searchInput.placeholder = 'Rechercher un pays';
form.appendChild(searchInput);
const submitInput = document.createElement('input');
submitInput.type = 'submit';
submitInput.id = 'go';
form.appendChild(submitInput);
document.body.appendChild(form);

form.style.textAlign = 'center';



// Créer le bouton
const button = document.createElement('button');
button.classList.add('scroll-top-button');
button.innerHTML = '<i class="fas fa-arrow-up"></i>';

// Ajouter le bouton au DOM
document.body.appendChild(button);

// Cacher le bouton au démarrage
button.style.display = 'none';

// Afficher le bouton lorsque l'utilisateur est au milieu de la page
window.addEventListener('scroll', function() {
  if (window.scrollY > window.innerHeight / 2) {
    button.style.display = 'block';
  } else {
    button.style.display = 'none';
  }
});

// Fixer la position du bouton en haut à droite de l'écran
button.style.position = 'fixed';
button.style.top = '50%';
button.style.right = '5%';
button.style.transform = 'translate(50%, -50%)';

// Rendre le bouton plus gros
button.style.fontSize = '40px';
button.style.width = '60px';
button.style.height = '60px';

// Renvoyer l'utilisateur en haut de la page lorsque le bouton est cliqué
button.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
});