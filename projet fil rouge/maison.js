const listData = [
  { title: "Trouver une alternance", date: "12/12/2024", checked: false },
  { title: "Apprendre React.JS", date: "12/01/2025", checked: false },
  { title: "Apprendre Python  ", date: "14/02/2025", checked: false },
];
function saveData(listData){
  const listeJSON = JSON.stringify(listData);
  console.log(saveData);


  localStorage.setItem('liste_data', listeJSON);
};
function saveLastEditeDate(){
  const date1 = new Date();
  console.log(date1);

  localStorage.setItem('liste_edit_data', now.toJSON());
};
function displayLastEditeDate (){
  const LastEditedate = localStorage.getItem('liste_edit_data')
  const LasteEditeElement = document.getElementById("liste_edit_data");

  const dateFormetter = new Intl. DateTimeFormat();
  const lasteEditDate = new Date (LastEditedateISO);
  LasteEditeElement.textContent = `Dernier modification le : $
 {dateFormetter.format(lastEditDate)}`;


}

function getlisteFromLocalStorage(){
  const listFromLocalStorage = localStorage.getItem('liste_data');
  if(listFromLocalStorage === null){
    return [];
  }
  const listeData = JSON.parse(utilisateurFromLocalStorage);
  return listeData;
}


// Sélectionner le UL
const listElement = document.querySelector(".Main-list");
displayListTasks(listData, listElement, false)

  document.getElementById("search-form")
  document.addEventListener("submit", function (event) {
    // Inhibe le comportement par défaut des formulaires (rechargement de la page)
    event.preventDefault();

    // Sélectionne l'input de recherche
    const textInput = document.getElementById("search-input");

    // Récupère la valeur saisie par l'utilisateur dans l'input
    const searchValue = textInput.value;

    // Filtre le tableau de données
    // Récupère les tâches dont le titre contient la saisie utilisateur
    const filteredData = listData.filter(function (listItem) {
      return listItem.title.toLowerCase().includes(searchValue.toLowerCase());
    });

    resetListTasks(listElement);
    const isFiltered = searchValue !== '';
    displayListTasks(filteredData, listElement, isFiltered);

    disableActionButtons([addButtonElement, removeLastTaskButton], isFiltered);

    if (isFiltered) {
      listElement.classList.add('is-filtered');
    } else {
      listElement.classList.remove('is-filtered');
    }
  });

function disableActionButtons(actionButtons, isDisabled) {
  actionButtons.forEach(function(button){
    button.disabled = isDisabled;
    if (isDisabled) {
      button.classList.add("Button--disabled");
    } else {
      button.classList.remove("Button--disabled");
    }
  });
}
saveData(listData);

function resetListTasks(mainListElement) {
  mainListElement.innerHTML = "";
}

function displayListTasks(data, mainListElement, isFiltered) {
  if (mainListElement === null) {
    return;
  }

  // Parcourir le tableau
  data.forEach(function (listItem, index) {
    const newListElement = createNewTaskElement(listItem, index);

    // Injecter le LI dans le DOM en enfant de mon UL
    mainListElement.appendChild(newListElement);
  });

  updateTaskCount(data, isFiltered);
}

function updateTaskCount(data, isFiltered = false) {
  // Sélectionner mon paragraphe
  const listCountElement = document.querySelector(".Main-count");
  // modifier son contenu textuel "textContent"
  if (data.length > 0) {
    listCountElement.textContent = isFiltered
      ? `${data.length} élément(s) trouvé(s)`
      : `${data.length} élément(s)`;
  } else {
    listCountElement.textContent = isFiltered
      ? "Aucun élément ne correspond à votre recherche."
      : "Il n'y a aucun élément dans la liste.";
  }
}

function createNewTaskElement(newTask, newIndex) {
  const newListElement = document.createElement("li");

  // Créer un input de type checkbox
  const input = document.createElement("input");
  input.type = "checkbox";
  input.id = newIndex;
  newListElement.appendChild(input);
  input.addEventListener("click", function () {
    console.log("Checkbox clicked");
    newTask.checked = !newTask.checked;
    newListElement.classList.toggle("is-checked");
  });

  // Créer un label lié à la checkbox
  const label = document.createElement("label");
  label.htmlFor = newIndex;
  label.textContent = `${newTask.title} - ${newTask.date}`;
  newListElement.appendChild(label);

  return newListElement;
}

function toggleRemoveButtonDisabled(data) {
  if (data.length === 0) {
    removeLastTaskButton.disabled = true;
    removeLastTaskButton.classList.add("Button--disabled");
  } else {
    removeLastTaskButton.disabled = false;
    removeLastTaskButton.classList.remove("Button--disabled");
  }
}

const addButtonElement = document.getElementById("add-task-button");
addButtonElement.addEventListener("click", function () {
  if (listElement === null) {
    return;
  }

  const newTaskText = window.prompt("Veuillez saisir une nouvelle tâche");
  const newTaskDate = window.prompt("Veuillez saisir une date");

  if (newTaskText === "" || newTaskDate === "") {
    return;
  }

  const newTask = {
    title: newTaskText,
    date: newTaskDate,
    checked: false,
  };

  const newListElement = createNewTaskElement(newTask, listData.length);

  const beforeElement = listElement.firstChild;
  listElement.insertBefore(newListElement, beforeElement);

  listData.unshift(newTask);
  /////// RAPPEL DE FUNCTION 

  toggleRemoveButtonDisabled(listData);
  updateTaskCount(listData);
});

const removeLastTaskButton = document.getElementById("remove-task-button");
removeLastTaskButton.addEventListener("click", function () {
  if (listData.length === 0) {
    return;
  }

  const lastListElement = listElement.lastChild;
  lastListElement.remove();

  listData.pop();
  toggleRemoveButtonDisabled(listData);
  updateTaskCount(listData);
});

// function toggleRemoveButtonDisabled(data) {
//   if (data.length === 0) {
//     removeLastTaskButton.disabled = true;
//     removeLastTaskButton.classList.add("Button--disabled");
//   } else {
//     removeLastTaskButton.disabled = false;
//     removeLastTaskButton.classList.remove("Button--disabled");
//   }
// }
// document.getElementById('search-form').addEventListener('submit', function(event) {
//   // Inhibe le comportement par défaut des formulaires (rechargement de la page)
//   event.preventDefault();

//   // Sélectionne l'input de recherche
//   const textInput = document.getElementById('search-input');

//   // Récupère la valeur saisie par l'utilisateur dans l'input
//   const searchValue = textInput.value;

//   // Filtre le tableau de données
//   // Récupère les tâches dont le titre contient la saisie utilisateur
//   const filteredData = listData.filter(function(listItem) {
//     return listItem.title.includes(searchValue);
//   });
// function addition (a, b){
//   return a + b;

// }
// const resltat =addition(7, 9);
// console.log(resltat);

// function moyenne(tableauNombre){
//   let somme = 0; 
//   tableauNombre.forEach(function (nombre){
//     somme = addition(somme ,nombre );
//   });
//   return somme / tableauNombre.length;

// }
// const nombres =[1,2,3,4,5];
// const resultatMoyenne = moyenne (nombres);
// console.log(resultatMoyenne)
// function etLogique (op1, op2){

// return op1 && op2;


// }
// console.log(etLogique(true, false));

// function ouLogique (op1, op2){

//   return op1 || op2;
  


