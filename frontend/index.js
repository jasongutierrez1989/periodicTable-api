let elementsFetch = fetch(`http://localhost:3000/elements`)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    return json
  });

let categoriesFetch = fetch(`http://localhost:3000/categories`)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    return json
  });

let elementsArray = [];

async function convertArray() {
  elementsArray = new Array(await elementsFetch);

  addIndexNum(18, "col", false);
  addIndexNum(7, "row", true);
  for (let i = 0; i < 118; i++) {
    let grid = document.getElementById('container');
    let textnode = document.createTextNode(elementsArray[0][i].symbol);
    let textnode2 = document.createTextNode(elementsArray[0][i].atomic_number);
    let textDiv = document.createElement('div');
    let textDiv2 = document.createElement('div');
    textDiv.id = "symbol";
    textDiv2.id = "anum";
    let newDiv = document.createElement("div");
    newDiv.className = "element " + "category-" + elementsArray[0][i].category_id;
    newDiv.id = 'e' + elementsArray[0][i].atomic_number;
    textDiv.appendChild(textnode);
    textDiv2.appendChild(textnode2);
    newDiv.appendChild(textDiv2);
    newDiv.appendChild(textDiv);
    grid.appendChild(newDiv);

    addBlankDivs(i, 0, 8);
    addBlankDivs(i, 3, 2);
    addBlankDivs(i, 11, 2);
    addBlankDivs(i, 56, 1);
    addBlankDivs(i, 87, 1);
    addBlankDivs(i, 118, 21);

  }
  categoriesArray = new Array(await categoriesFetch);


  let tableDiv = document.createElement('div');
  tableDiv.id = 'table';

  for (let i = 0; i < 9; i++) {
    let grid = document.getElementById('container');
    let textnode = document.createTextNode(categoriesArray[0][i].name);
    let textDiv = document.createElement('div');
    textDiv.id = "category-" + (i + 1);
    textDiv.className = "categories";
    textDiv.appendChild(textnode);
    tableDiv.appendChild(textDiv);
    grid.appendChild(tableDiv);
  }

  addBlankDivs(1, 1, 21);

  for (let i = 0; i < elementSelect.length; i++) {
    elementSelect[i].addEventListener("mouseenter", async function() {
      let bigElement = document.getElementById('bigElementInner');
      bigElement.classList.remove('category-1', 'category-2', 'category-3', 'category-4', 'category-5', 'category-6', 'category-7', 'category-8', 'category-9', 'category-10');

      let elementFetch = fetch(`http://localhost:3000/elements/` + (i + 1))
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          return json
        });

      elementNew = await elementFetch;

      let textnode = document.createTextNode(elementNew.atomic_number);
      let textnode2 = document.createTextNode(elementNew.symbol);
      let textnode3 = document.createTextNode(elementNew.name);
      let textnode4 = document.createTextNode(elementNew.weight);
      let atomicNode = document.getElementById('BA');
      let symbolNode = document.getElementById('BS');
      let nameNode = document.getElementById('BN');
      let weightNode = document.getElementById('BW');
      bigElement.classList.add("category-" + elementNew.category_id);
      atomicNode.textContent = textnode.textContent;
      symbolNode.textContent = textnode2.textContent;
      nameNode.textContent = textnode3.textContent;
      weightNode.textContent = textnode4.textContent;
    })
  }

  let categorySelect = document.getElementsByClassName('categories');

  for (let i = 0; i < categorySelect.length; i++) {
    categorySelect[i].addEventListener("mouseenter", function() {
      for (let j = 0; j < elementSelect.length; j++) {
        let k = i + 1;
        if (elementSelect[j].classList.contains(('category-' + k)) != true) {
          elementSelect[j].style.opacity = "50%";
        }
      }
    })
    categorySelect[i].addEventListener("mouseleave", function() {
      for (let j = 0; j < elementSelect.length; j++) {
        let k = i + 1;
        if (elementSelect[j].classList.contains(('category-' + k)) != true) {
          elementSelect[j].style.opacity = "100%";
        }
      }
    })
  }

}

function addIndexNum(a, b, c) {
  let i = 0;
  while (i < a) {
    let grid = document.getElementById('container');
    let newDiv = document.createElement("div");
    let textnode = document.createTextNode(i+1);
    textnode.id = "index";
    newDiv.appendChild(textnode);
    newDiv.className = "index";
    if (c) {
      newDiv.id = b + "-" + (i+1);
    }
    else {
      newDiv.id = b;
    }
    grid.appendChild(newDiv);
    i ++;
  }
}

function addBlankDivs(a, b, c) {
  if (a == b) {
    let count = 0;
    while (count < c) {
      let grid = document.getElementById('container');
      let newDiv = document.createElement("div");
      newDiv.className = "blank";
      grid.appendChild(newDiv);
      count ++;
    }
  }
}

//python -m SimpleHTTPServer

convertArray();
let elementSelect = document.getElementsByClassName('element');
