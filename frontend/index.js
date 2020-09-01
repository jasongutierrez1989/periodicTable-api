const elementSelect = document.getElementsByClassName('element');

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
let categoriesArray = [];

async function drawPeriodicTable() {
  elementsArray = new Array(await elementsFetch);
  categoriesArray = new Array(await categoriesFetch);

  addIndexNum(18, "col", false, 'group');
  addIndexNum(7, "row", true, 'period');

  drawElements();

  let tableDiv = document.createElement('div');
  tableDiv.id = 'table';
  let grid = document.getElementById('container');
  grid.appendChild(tableDiv);

  drawCategories();

  addBlankDivs(1, 1, 21);

  hoverEffect('category', 'categories', 'mouseenter', 'mouseleave', elementSelect);
  hoverEffect('group', 'group', 'mouseenter', 'mouseleave', elementSelect);
  hoverEffect('period', 'period', 'mouseenter', 'mouseleave', elementSelect);
  elementDetail();
  setBigElement();
}

async function drawElements() {
  for (let i = 0; i < elementsArray[0].length; i++) {
    let grid = document.getElementById('container');
    let gridElement = new elementClass(elementsArray[0][i].atomic_number, elementsArray[0][i].symbol, null, null, elementsArray[0][i].category_id, elementsArray[0][i].group_id, elementsArray[0][i].period_id);
    let elementDiv = gridElement.createDivs2();
    gridElement.appender(elementDiv, 'container');

    addBlankDivs(i, 0, 8);
    addBlankDivs(i, 3, 2);
    addBlankDivs(i, 11, 2);
    addBlankDivs(i, 56, 1);
    addBlankDivs(i, 87, 1);
    addBlankDivs(i, 118, 21);
  }
}

async function drawCategories() {
  for (let i = 0; i < 9; i++) {
    let gridCategory = new categoryClass(categoriesArray[0][i].name, categoriesArray[0][i].id);
    let categoryDiv = gridCategory.createDivs();
    gridCategory.appender(categoryDiv, 'table');
  }
}

async function setBigElement() {
  for (let i = 0; i < elementSelect.length; i++) {
    elementSelect[i].addEventListener("mouseenter", async function() {
      let bigElementInner = document.getElementById('bigElementInner');
      bigElementInner.classList.remove('category-1', 'category-2', 'category-3', 'category-4', 'category-5', 'category-6', 'category-7', 'category-8', 'category-9', 'category-10');

      let elementFetch = fetch(`http://localhost:3000/elements/` + (i + 1))
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          return json
        });

      elementNew = await elementFetch;
      let bigElement = new elementClass(elementNew.atomic_number, elementNew.symbol, elementNew.name, elementNew.weight);

      let atomicNode = document.getElementById('BA');
      let symbolNode = document.getElementById('BS');
      let nameNode = document.getElementById('BN');
      let weightNode = document.getElementById('BW');
      bigElementArray = bigElement.toArray();
      bigElement.bigElementAppender(bigElementArray, [atomicNode, symbolNode, nameNode, weightNode], bigElementInner);
    })
  }
}

async function elementDetail () {
  let allElements = document.getElementsByClassName('element');
    for (let i = 0; i < allElements.length; i++) {
      allElements[i].addEventListener('click', async function () {
        let elementFetch = fetch(`http://localhost:3000/elements/` + (i + 1))
          .then(function(response) {
            return response.json();
          })
          .then(function(json) {
            return json
          });

        let detailFetch = fetch(`http://localhost:3000/details/0/` + (i + 1) + '/0/0')
          .then(function(response) {
            return response.json();
          })
          .then(function(json) {
            return json
          });

      let newElement = await elementFetch;
      let newDiv = document.createElement('div');
      let detail = await detailFetch;
      let detailElement = new detailClass(detail.info , detail.category_id , detail.element_id , detail.group_id , detail.period_id);
      let domArray = detailElement.elementGet(['container', 'detailHold', 'detailText']);
      let editBtn = document.createElement('BUTTON');
      editBtn.innerHTML = "Edit";
      let goBack = document.createElement('BUTTON');
      goBack.innerHTML = "Go Back";
      goBack.addEventListener('click', function() {
        window.location.reload();
      })

      detailElement.addRemoveClass(domArray[0], domArray[1]);
      detailElement.addText(domArray[2]);
      domArray[1].appendChild(newDiv);
      domArray[1].appendChild(editBtn);
      domArray[1].appendChild(goBack);
      let bigElementSave = new elementClass(newElement.atomic_number, newElement.symbol, newElement.name, newElement.weight, newElement.category_id, newElement.group_id, newElement.period_id);
      let elementDiv = bigElementSave.createDivs2();
      bigElementSave.appender(elementDiv, 'detailView');
      editBtn.addEventListener('click', function() {
        detailElement.toggleEditor(['detailText', 'detailInfo', 'editor']);
        editBtn.classList.add('none');
      });

      let submit = document.getElementById('submit');
      submit.addEventListener('click', function() {
        let current = document.getElementById('detailText');
        let newInfo = document.getElementById('detailInfo');
        if (newInfo.value != current.innerText) {
          detailElement.submitEdit(['detailText', 'detailInfo', 'editor']);
          editBtn.classList.remove('none');
        }
        else {
          alert("Must make an edit to the text in order to submit");
          event.preventDefault();
        }
      });
    });
  }
}



function hoverEffect (className, plural, activity1, activity2, array) {
  let selector = document.getElementsByClassName(plural);
  for (let i = 0; i < selector.length; i++) {
    selector[i].addEventListener(activity1, function() {
      for (let j = 0; j < array.length; j++) {
        let k = i + 1;
        if (array[j].classList.contains((className + '-' + k)) != true) {
          array[j].classList.add('inactive');
        }
      }
    })
    selector[i].addEventListener(activity2, function() {
      for (let j = 0; j < array.length; j++) {
        let k = i + 1;
        if (array[j].classList.contains(('inactive')) == true) {
          array[j].classList.remove('inactive');
        }
      }
    })
  }
}


function addIndexNum(a, b, c, d) {
  let i = 0;
  while (i < a) {
    let grid = document.getElementById('container');
    let newDiv = document.createElement("div");
    let textnode = document.createTextNode(i+1);
    textnode.id = "index";
    newDiv.appendChild(textnode);
    newDiv.className = "index";
    newDiv.classList.add(d);
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

drawPeriodicTable();
