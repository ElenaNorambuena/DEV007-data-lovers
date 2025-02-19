//=========IMPORTANDO DATA Y FUNCIONES DESDE DATA.JS Y POKEMON.JS===========
import dataFunctions from "./data.js"; //importando objeto que contiene funciones desde data.js
import data from "./data/pokemon/pokemon.js"; //importando data

//========================VARIABLES DE USO GENERAL==========================
const pokeContainer = document.querySelector(".flex-container"); //seleccionando contenedor flex para pokemones
const pokeInput = document.getElementById("searchbar"); //seleccionando barra búsqueda
const searchBttn = document.getElementById("searchbutton"); //seleccionando botón búqueda
const selectMenu = document.getElementById("selectmenu"); //seleccionando menú para ordenar
const filterMenu = document.getElementById("filtermenu");
const pokeDialog = document.getElementById("dialog-modal"); //seleccionando elemento dialog
const countPokeDialog = document.getElementById("count-dialog");
const countPokeDialogBttn = document.getElementById("count-button");
const closeBttn = document.createElement("button"); //creando botón cerrar
closeBttn.id = "close-button"; //asignando id al botón cerrar
closeBttn.className = "close-button"; //asignando clase al botón cerrar
closeBttn.innerHTML = "Cerrar"; //asignando contenido del botón
const closeCountBttn = document.createElement("button"); //creando botón cerrar para mensaje de contador
closeCountBttn.id = "count-close-button"; //asignando id al botón cerrar
closeCountBttn.className = "count-close-button"; //asignando clase al botón cerrar
closeCountBttn.innerHTML = "Cerrar"; //asignando contenido del botón

//====================FUNCIÓN PARA MOSTRAR DATA=============================
dataFunctions.showPokemon(); //ejecutando función para mostrar pokemones

//====================FUNCIONES PARA BUSCAR EN LA DATA======================
searchBttn.addEventListener("click", (e) => {
  //agregando event listener al botón búsqueda
  e.preventDefault(); //evitando que se cargue de nuevo automáticamente

  const searchNameResult = dataFunctions.searchName(
    pokeInput.value.toLowerCase()
  ); //declarando variable que guarda nombre ya filtrado según el input ingresado
  const searchNumberResult = dataFunctions.searchNumber(pokeInput.value); //declarando variable que guarda el número ya filtrado según el input ingresado
  const searchTypeResult = dataFunctions.searchType(
    pokeInput.value.toLowerCase()
  ); //declarando variable que guarda tipo ya filtrado según el input ingresado
  pokeContainer.innerHTML = ""; //vaciando el contenedor flex
  if (pokeInput.value === "") {
    //creando condicional en caso de un input vacío
    const createMessage1 = document.createElement("div"); //creando <div> para agregar el mensaje
    createMessage1.id = "noinput"; //asignando un id al div
    createMessage1.className = "messages"; //asignando una clase al div
    createMessage1.innerHTML +=
      "<h2> Por favor, ingresa el nombre, número o tipo de Pokemon para buscar.</h2>"; //agregando el mensaje como h2 al div
    createMessage1.innerHTML += "<img src=./img/HappyPikachu.png>"; //agregando imagen al div
    pokeContainer.insertAdjacentElement("beforeend", createMessage1); //insertando el div con todo el contenido agregado dentro de contenedor flex
  } else if (
    //creando condicional en caso de búsqueda sin resultados
    searchNameResult.toString() === "" && //creando condición de nombre sin resultado
    searchNumberResult.toString() === "" && //agregando condición de número sin resultado
    searchTypeResult.toString() === "" //agregando condición de tipo sin resultado
  ) {
    const createMessage2 = document.createElement("div"); //creando div para agregar el mensaje
    createMessage2.id = "notfoundmessage"; //aisgnando un id al div
    createMessage2.className = "messages"; //asignado una clase al div
    createMessage2.innerHTML +=
      "<h2> Lo sentimos, tu búsqueda no ha dado resultados.</h2>"; //agregando el mensaje como h2 al div
    createMessage2.innerHTML += "<img src=./img/SadPikachu.png>"; //agregando imagen al div
    pokeContainer.insertAdjacentElement("beforeend", createMessage2); //insertando el div con todo el contenido agregado dentro de contenedor flex
  } else {
    //procesando resultados de búsqueda para mostrar en contenedor
    for (let i = 0; i < searchNameResult.length; i++) {
      //iterando por cada nombre en resultados para crear tarjetas
      const createPokebox = document.createElement("li"); //creando <li> para cada pokemon
      const pokeName = searchNameResult[i].name; //almacenando nombre de cada pokemon
      const pokeNum = searchNameResult[i].num; //almacenando número de cada pokemon
      createPokebox.className = "pokeLi"; //asignando clase a cada li
      createPokebox.id = "pokeLi" + [i]; //asignando id a cada li
      createPokebox.innerHTML += pokeNum.toString(); //agregando número de pokemon a cada li
      createPokebox.innerHTML += "<br>"; //agregando línea vacía a cada li
      createPokebox.innerHTML += `<img src= "${searchNameResult[i].img}" alt= "pokeImg${searchNameResult[i].name}" class="image" id="${searchNameResult[i].id}">`; //agregando imagen a cada li
      createPokebox.innerHTML += "<br>"; //agregando línea vacía a cada li
      createPokebox.innerHTML += pokeName.toUpperCase(); //agregando nombre de pokemon a cada li
      pokeContainer.insertAdjacentElement("beforeend", createPokebox); //insertando cada li dentro de contenedor flex
      openPokeDialog(); //llamando función para abrir elemento dialog
    }
    for (let i = 0; i < searchNumberResult.length; i++) {
      //iterando por cada número en resultados para crear tarjetas
      const createPokebox = document.createElement("li"); //creando li para cada pokemon
      const pokeName = searchNumberResult[i].name; //almacenando nombre de cada pokemon
      const pokeNum = searchNumberResult[i].num; //almacenando número de cada pokemon
      createPokebox.className = "pokeLi"; //asignando clase a cada li
      createPokebox.id = "pokeLi" + [i]; //asignando id a cada li
      createPokebox.innerHTML += pokeNum.toString(); //agregando número de pokemon a cada li
      createPokebox.innerHTML += "<br>"; //agregando línea vacía a cada li
      createPokebox.innerHTML += `<img src= "${searchNumberResult[i].img}" alt= "pokeImg${searchNumberResult[i].name}" class="image" id="${searchNumberResult[i].id}">`; //agregando imagen a cada li
      createPokebox.innerHTML += "<br>"; //agregando línea vacía a cada li
      createPokebox.innerHTML += pokeName.toUpperCase(); //agregando nombre de pokemon a cada li
      pokeContainer.insertAdjacentElement("beforeend", createPokebox); //insertando cada li dentro de contenedor flex
      openPokeDialog(); //llamando función para abrir elemento dialog
    }
    for (let i = 0; i < searchTypeResult.length; i++) {
      //iterando por cada tipo en resultados para crear tarjetas
      const createPokebox = document.createElement("li"); //creando li para cada pokemon
      const pokeName = searchTypeResult[i].name; //almacenando nombre de cada pokemon
      const pokeNum = searchTypeResult[i].num; //almacenando número de cada pokemon
      createPokebox.className = "pokeLi"; //asignando clase a cada li
      createPokebox.id = "pokeLi" + [i]; //asignando id a cada li
      createPokebox.innerHTML += pokeNum.toString(); //agregando número de pokemon a cada li
      createPokebox.innerHTML += "<br>"; //agregando línea vacía a cada li
      createPokebox.innerHTML += `<img src= "${searchTypeResult[i].img}" alt= "pokeImg${searchTypeResult[i].name}" class="image" id="${searchTypeResult[i].id}">`;
      createPokebox.innerHTML += "<br>"; //agregando línea vacía a cada li
      createPokebox.innerHTML += pokeName.toUpperCase(); //agregando imagen a cada li
      pokeContainer.insertAdjacentElement("beforeend", createPokebox); //insertando cada li dentro de contenedor flex
      openPokeDialog(); //llamando función para abrir elemento dialog
    }
  }
});
//====================FUNCIONES PARA ORDENAR DATA======================
function select(e) {
  //creando función select
  selectMenu.addEventListener("change", addActionToSelect, false); //agregando event listener a menú select, cuando cambia ejecuta addActionToSelect
  e.preventDefault(); //evitando que se cargue de nuevo automáticamente
}
function addActionToSelect() {
  //creando función addActionToSelect
  switch (
    selectMenu.value //creando switch case, para cada valor del menú select
  ) {
  case "az": //declarando primer caso de switch
    {
      const sorted = orderListAZ(); //asignando a una variable la lista de li en pantalla ordenados de la A a la Z
      const pokeResult = []; //creando un array vacío como resultado
      sorted.forEach((pokemon) => {
        //declarando qué hacer por cada uno de los li ordenados de la A a la Z
        pokeResult.push(
          //indicando que se debe agregar el elemento siguiente al final del array pokeResult
          data.pokemon.find(
            //buscando dentro de la data desde archivo pokemon.js
            (pokemonArrData) => pokemon === pokemonArrData.name //entregando cada pokemon que coincida con cualquier elemento dentro de la data con una propiedad name igual
          )
        );
      });
      dataFunctions.createPokebox(pokeResult); //creando cada tarjeta para mostrar en pantalla de cada pokemon dentro del resultado
      openPokeDialog(); //llamando función para abrir elemento dialog
    }
    break; //terminando primer caso
  case "za": //declarando segundo caso de switch
    {
      const sortedRev = orderListZA(); //asignando a una variable la lista de li en pantalla ordenados de la Z a la A
      const pokeResult = []; //creando un array vacío como resultado
      sortedRev.forEach((pokemon) => {
        //declarando qué hacer por cada uno de los li ordenados de la Z a la A
        pokeResult.push(
          //indicando que se debe agregar el elemento soguiente al final del array pokeResult
          data.pokemon.find(
            //buscando dentro de la data desde archivo pokemon.js
            (pokemonArrData) => pokemon === pokemonArrData.name //entregando cada pokemon que coincida con cualquier elemento dentro de la data con una propiedad name igual
          )
        );
      });
      dataFunctions.createPokebox(pokeResult); //creando cada tarjeta para mostrar en pantalla de cada pokemon dentro del resultado
      openPokeDialog(); //llamando función para abrir elemento dialog
    }
    break; //terminando segundo caso
  case "09": //declarando tercer caso de switch
    {
      const sortedNum = orderList09(); //asignando a una variable la lista de li en pantalla ordenados numéricamente
      const pokeResult = []; //creando un array vacío como resultado
      sortedNum.forEach((pokemon) => {
        //declarando qué hacer por cada uno de los li ordenados numéricamente
        pokeResult.push(
          //indicando que se debe agregar el elemento soguiente al final del array pokeResult
          data.pokemon.find(
            //buscando dentro de la data desde archivo pokemon.js
            (pokemonArrData) => pokemon === pokemonArrData.num //entregando cada pokemon que coincida con cualquier elemento dentro de la data con una propiedad num igual
          )
        );
      });
      dataFunctions.createPokebox(pokeResult); //creando cada tarjeta para mostrar en pantalla de cada pokemon dentro del resultado
      openPokeDialog(); //llamando función para abrir elemento dialog
    }
    break; //terminando tercer caso
  case "90": //declarando cuarto caso de switch
    {
      const sortedNumRev = orderList90(); //asignando a una variable la lista de li en pantalla ordenados numéricamente de forma descendente
      const pokeResult = []; //creando un array vacío como resultado
      sortedNumRev.forEach((pokemon) => {
        //declarando qué hacer por cada uno de los li ordenados numéricamente de forma descendente
        pokeResult.push(
          //indicando que se debe agregar el elemento soguiente al final del array pokeResult
          data.pokemon.find(
            //buscando dentro de la data desde archivo pokemon.js
            (pokemonArrData) => pokemon === pokemonArrData.num //entregando cada pokemon que coincida con cualquier elemento dentro de la data con una propiedad num igual
          )
        );
      });
      dataFunctions.createPokebox(pokeResult); //creando cada tarjeta para mostrar en pantalla de cada pokemon dentro del resultado
      openPokeDialog(); //llamando función para abrir elemento dialog
    }
    break; //terminando cuarto caso
  default: //declarando caso default vacío, aunque no es mandatorio
  }
}

function orderListAZ() {
  //declarando función para ordenar de la A a la Z
  const onScreenList = document.querySelectorAll("li"); //seleccionando todos los li en pantalla
  const sortedList = []; //creando array vacío para almacenar resultado
  for (let i = 0; i < onScreenList.length; i++) {
    //iterando la lista de li en pantalla
    sortedList.push(onScreenList[i].innerText.slice(5).toLowerCase()); //agregando el texto del nombre en cada li al array resultado
  }
  return sortedList.sort(); //ordenar y retornar de la A a la Z el array de resultados
}

function orderListZA() {
  //declarando función para ordenar de la Z a la A
  const onScreenList = document.querySelectorAll("li"); //seleccionando todos los li en pantalla
  const sortedList = []; //creando array vacío para almacenar resultado
  for (let i = 0; i < onScreenList.length; i++) {
    //iterando la lista de li en pantalla
    sortedList.push(onScreenList[i].innerText.slice(5).toLowerCase()); //agregando el texto del nombre en cada li al array resultado
  }
  return sortedList.sort().reverse(); //ordenar de la A a la Z, invertir el orden y retornar el array de resultados
}

function orderList09() {
  //declarando función para ordenar numéricamente
  const onScreenList = document.querySelectorAll("li"); //seleccionando todos los li en pantalla
  const sortedList = []; //creando array vacío para almacenar resultado
  for (let i = 0; i < onScreenList.length; i++) {
    //iterando la lista de li en pantalla
    sortedList.push(onScreenList[i].innerText.slice(0, 3)); //agregando el texto del número en cada li al array resultado
  }
  return sortedList.sort(); //ordenar y retornar el array de resultados ordenado numéricamente
}

function orderList90() {
  //declarando función para ordenar numéricamente de forma descendente
  const onScreenList = document.querySelectorAll("li"); //seleccionando todos los li en pantalla
  const sortedList = []; //creando array vacío para almacenar resultado
  for (let i = 0; i < onScreenList.length; i++) {
    //iterando la lista de li en pantalla
    sortedList.push(onScreenList[i].innerText.slice(0, 3)); //agregando el texto del número en cada li al array resultado
  }
  return sortedList.sort().reverse(); //ordenar el array de resultados ordenado numéricamente, reverir el orden y retornar el resultado
}

window.addEventListener("load", select); //ejecutando función select al cargar la página

//===================FUNCIONES PARA FILTRAR CON CHECKBOX======================
function filterSelect(e) {  //creando función select
  filterMenu.addEventListener("change", addActionToFilter, false); //agregando event listener a menú select, cuando cambia ejecuta addActionToSelect
  e.preventDefault(); //evitando que se cargue de nuevo automáticamente
}
function addActionToFilter() {
  //creando función addActionToSelect
  switch (
    filterMenu.value //creando switch case, para cada valor del menú select
  ) {
  case "fire":
    {
      const result = dataFunctions.checkFilter("fire");
      dataFunctions.createPokebox(result);
      openPokeDialog();
    }
    break;
  case "water":
    {
      const result = dataFunctions.checkFilter("water");
      dataFunctions.createPokebox(result);
      openPokeDialog();
    }
    break;
  case "poison":
    {
      const result = dataFunctions.checkFilter("poison");
      dataFunctions.createPokebox(result);
      openPokeDialog();
    }
    break;
  case "ice":
    {
      const result = dataFunctions.checkFilter("ice");
      dataFunctions.createPokebox(result);
      openPokeDialog();
    }
    break;
  case "fairy":
    {
      const result = dataFunctions.checkFilter("fairy");
      dataFunctions.createPokebox(result);
      openPokeDialog();
    }
    break;
  case "rock":
    {
      const result = dataFunctions.checkFilter("rock");
      dataFunctions.createPokebox(result);
      openPokeDialog();
    }
    break;
  case "normal":
    {
      const result = dataFunctions.checkFilter("normal");
      dataFunctions.createPokebox(result);
      openPokeDialog();
    }
    break;
  case "ground":
    {
      const result = dataFunctions.checkFilter("ground");
      dataFunctions.createPokebox(result);
      openPokeDialog();
    }
    break;
  case "dark":
    {
      const result = dataFunctions.checkFilter("dark");
      dataFunctions.createPokebox(result);
      openPokeDialog();
    }
    break;
  case "ghost":
    {
      const result = dataFunctions.checkFilter("ghost");
      dataFunctions.createPokebox(result);
      openPokeDialog();
    }
    break;
  case "flying":
    {
      const result = dataFunctions.checkFilter("flying");
      dataFunctions.createPokebox(result);
      openPokeDialog();
    }
    break;
  case "dragon":
    {
      const result = dataFunctions.checkFilter("dragon");
      dataFunctions.createPokebox(result);
      openPokeDialog();
    }
    break;
  case "steel":
    {
      const result = dataFunctions.checkFilter("steel");
      dataFunctions.createPokebox(result);
      openPokeDialog();
    }
    break;
  case "bug":
    {
      const result = dataFunctions.checkFilter("bug");
      dataFunctions.createPokebox(result);
      openPokeDialog();
    }
    break;
  case "electric":
    {
      const result = dataFunctions.checkFilter("electric");
      dataFunctions.createPokebox(result);
      openPokeDialog();
    }
    break;
  case "psychic":
    {
      const result = dataFunctions.checkFilter("psychic");
      dataFunctions.createPokebox(result);
      openPokeDialog();
    }
    break;
  case "grass":
    {
      const result = dataFunctions.checkFilter("grass");
      dataFunctions.createPokebox(result);
      openPokeDialog();
    }
    break;
  case "fighting":
    {
      const result = dataFunctions.checkFilter("fighting");
      dataFunctions.createPokebox(result);
      openPokeDialog();
    }
    break;
  default:
  }
}

window.addEventListener("load", filterSelect); //ejecutando función filterSelect al cargar la página
//====================FUNCIONES PARA MOSTRAR DIALOG======================
function openPokeDialog() {
  //declarando función para abrir elemento dialog
  const pokeLiOnScreen = document.querySelectorAll("li"); //seleccionando cada elemento li en pantalla
  pokeDialog.style.display = "flex"; //cambiando estilo de display de none a flex para mostrar dialog
  pokeLiOnScreen.forEach((pokemon) => {
    //recorriendo por cada pokemon dentro de la lista de li
    pokemon.addEventListener("click", () => {
      //agregando event listener para que al hacer click ejecute lo siguiente
      showDialog(); //ejecutando función showDialog para mostrar elemento dialog
      printPokeDetails(pokemon.innerText.slice(5).toLowerCase()); //mostrando dentro del elemento dialog información del pokemon al que se le hizo click
    });
  });
}

function printPokeDetails(pokemon) {
  //declarando función para agregarr detalles del nombre del pokemon que recibe como parámetro
  const pokeData = data.pokemon; //declarando variable que almacena la data desde pokemon.js
  const pokeDialogUpperDiv = document.createElement("div"); //creando div superior que irá dentro del dialog
  const pokeDialogMiddleDiv = document.createElement("div"); //creando div intermedio que irá dentro del dialog
  const pokeDialogLowerDiv = document.createElement("div"); //creando div inferior que irá dentro del dialog
  const pokeDialogLowestDiv = document.createElement("div"); //creando div adicional que irá dentro del dialog
  const pokeDetails = pokeData.find((poke) => pokemon === poke.name); //buscando dentro de la data el nombre del pokemon que coincide con el ingresado
  const pokeTypes = pokeDetails.type; //declarando variable que almacena los tipos de pokemon
  const pokeImgSrcArr = dataFunctions.createImgSrcArr(pokeTypes); //declarando variable que almacena función createImgSrcArr
  const createTypeImg = dataFunctions.createImg(pokeImgSrcArr); //declarando variable que almacena función createImg
  const pokeResistant = pokeDetails.resistant; //declarando variable que almacena resistencias de pokemon
  const pokeWeakness = pokeDetails.weaknesses; //declarando variable que almacena debilidades de pokemon
  const pokeResistantTranslated = dataFunctions.translateType(pokeResistant); //declarando variable que almacena resistencias de pokemon traducidas
  const pokeWeaknessTranslated = dataFunctions.translateType(pokeWeakness); //declarando variable que almacena debilidades de pokemon traducidas
  const pokeAttackQuick = pokeDetails["quick-move"]; //declarando variable que almacena ataques rápidos de pokemon
  const pokeAttackSpecial = pokeDetails["special-attack"]; //declarando variable que almacena ataques cargados de pokemon
  const pokeAttackQuickList = dataFunctions.showAttacks(pokeAttackQuick); //declarando variable que almacena función showAttacks para ataques rápidos
  const pokeAttackSpecialList = dataFunctions.showAttacks(pokeAttackSpecial); //declarando variable que almacena función showAttacks para ataques cargados
  const pokeEvolutionsResult = dataFunctions.joinEvolutions(pokeDetails); //declarando variable que almacena función joinEvolutions
  pokeDialogUpperDiv.className = "dialog-div"; //agregando el atributo clase al div superior
  pokeDialogUpperDiv.id = "dialog-upper-div"; //agregando el atributo id al div superior
  pokeDialogMiddleDiv.className = "dialog-div"; //agregando el atributo clase al div intermedio
  pokeDialogLowerDiv.className = "dialog-lower-div"; //agregando el atributo clase al div inferior
  pokeDialogLowerDiv.id = "dialog-lower-div"; //agregando el atributo id al div inferior
  pokeDialogLowestDiv.className = "dialog-div"; //agregando el atributo clase al div adicional
  pokeDialogLowestDiv.id = "dialog-lowest-div"; //agregando el atributo id al div adicional
  pokeDialogUpperDiv.innerHTML += `<h2>${
    pokeDetails.num
  }</h2><h2>${pokeDetails.name.toUpperCase()}</h2><h2 id="img-container">${createTypeImg}</h2>`; //agregando el número, nombre y tipo de pokemon al div superior
  pokeDialogMiddleDiv.innerHTML += `<img src= "${pokeDetails.img}" alt= "pokeImg${pokeDetails.name}" class="image">`; //agregando imagen al div intermedio
  pokeDialogLowerDiv.innerHTML += `<h3> Resistente a: ${pokeResistantTranslated.join(
    ", "
  )}<h3><h3>Débil frente a: ${pokeWeaknessTranslated.join(
    ", "
  )}</h3><h3>Ataque(s) rápido(s): ${pokeAttackQuickList}</h3><h3>Ataque(s) cargado(s): ${pokeAttackSpecialList}</h3><h3>Tasa de Aparación: ${dataFunctions.evaluateCaptureRate(
    pokeDetails["spawn-chance"]
  )}<br>Tasa de Captura: ${dataFunctions.evaluateCaptureRate(
    pokeDetails.encounter["base-capture-rate"]
  )}<br>Tasa de Huída: ${dataFunctions.evaluateCaptureRate(
    pokeDetails.encounter["base-flee-rate"]
  )}</h3>`; //agregando otros detalles al div inferior
  pokeDialogLowestDiv.innerHTML += `<h3>Evoluciones: ${pokeEvolutionsResult}</h3>`; //agregando evoluciones al div intermedio
  pokeDialog.insertAdjacentElement("beforeend", pokeDialogUpperDiv); //agregando el div superior al elemento dialog
  pokeDialog.insertAdjacentElement("beforeend", pokeDialogMiddleDiv); //agregando el div intermedio al elemento dialog
  pokeDialog.insertAdjacentElement("beforeend", pokeDialogLowerDiv); //agregando el div inferior al elemento dialog
  pokeDialog.insertAdjacentElement("beforeend", pokeDialogLowestDiv); //agregando el div inferior al elemento dialog
}

function showDialog() {
  //declarando función para mostrar elemento dialog
  pokeDialog.insertAdjacentElement("beforeend", closeBttn); //agregando botón de cerrar al elemento dialog
  pokeDialog.showModal(); //abre elemento dialog como ventana modal
  closePokeDialog(); //ejecuta función para cerrar dialog al presionar el botón cerrar
}

function closePokeDialog() {
  //declarando función para dar acción al botón cerrar
  const pokeDialogCloseBttn = document.getElementById("close-button"); //almacenando botón cerrar en una variable
  pokeDialogCloseBttn.addEventListener("click", () => closeDialog()); //agregando event listener para que ejecute función closeDialog al hacer click en botón cerrar
}

function closeDialog() {
  //declarando función para cerrar el elemento dialog
  pokeDialog.close(); //cerrando elemento dialog
  pokeDialog.innerHTML = ""; //vaciando contenedor para que cuando se vuelva a abrir solo muestre la nueva data
}
//==============FUNCIONES PARA CONTAR POKEMONES EN PANTALLA================
countPokeDialogBttn.addEventListener("click", () => {
  //agregando event listener para que al hacer click ejecute lo siguiente
  showCountDialog(); //ejecutando función showCountDialog para mostrar elemento dialog
});

function countPokeOnScreen() {
  const pokeLiOnScreen = document.getElementsByTagName("li"); //seleccionando cada elemento li en pantalla
  return pokeLiOnScreen.length;
}

function showCountDialog() {
  //declarando función para mostrar elemento dialog
  const pokeLiOnScreen = countPokeOnScreen(); //declarando variable que almacena función countPokeOnScreen
  const messageContainer = document.createElement("h2");
  messageContainer.id = "message-container";
  messageContainer.className = "message-container";
  messageContainer.innerHTML = `En este momento hay ${pokeLiOnScreen} pokemon(es) en pantalla.`;
  countPokeDialog.insertAdjacentElement("beforeend", messageContainer);
  countPokeDialog.insertAdjacentElement("beforeend", closeCountBttn); //agregando botón de cerrar al elemento dialog
  countPokeDialog.showModal(); //abre elemento dialog como ventana modal
  closeCountPokeDialog(); //ejecuta función para cerrar dialog al presionar el botón cerrar
}

function closeCountPokeDialog() {
  //declarando función para dar acción al botón cerrar
  const pokeDialogCloseBttn = document.getElementById("count-close-button"); //almacenando botón cerrar en una variable
  pokeDialogCloseBttn.addEventListener("click", () => closeCountDialog()); //agregando event listener para que ejecute función closeDialog al hacer click en botón cerrar
}

function closeCountDialog() {
  //declarando función para cerrar el elemento dialog
  countPokeDialog.close(); //cerrando elemento dialog
  countPokeDialog.innerHTML = ""; //vaciando contenedor para que cuando se vuelva a abrir solo muestre la nueva data
}

window.addEventListener("load", openPokeDialog()); //ejecutando función openPokeDialog al cargar la página
