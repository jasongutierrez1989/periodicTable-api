//let grid = document.getElementById('container');

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

  addIndexNum(18, "col", false, 'group');
  addIndexNum(7, "row", true, 'period');
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
  categoriesArray = new Array(await categoriesFetch);


  let tableDiv = document.createElement('div');
  tableDiv.id = 'table';
  let grid = document.getElementById('container');
  grid.appendChild(tableDiv);

  for (let i = 0; i < 9; i++) {
    let gridCategory = new categoryClass(categoriesArray[0][i].name, categoriesArray[0][i].id);
    let categoryDiv = gridCategory.createDivs();
    gridCategory.appender(categoryDiv, 'table');
  }

  addBlankDivs(1, 1, 21);

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

    hoverEffect('category', 'categories', 'mouseenter', 'mouseleave', elementSelect);
    hoverEffect('group', 'group', 'mouseenter', 'mouseleave', elementSelect);
    hoverEffect('period', 'period', 'mouseenter', 'mouseleave', elementSelect);
    elementDetail();

    async function elementDetail () {
      let maybe = document.getElementsByClassName('element');
        for (let i = 0; i < maybe.length; i++) {
          maybe[i].addEventListener('click', async function () {
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
          let test = document.getElementById('container');
          let test2 = document.getElementById('detailHold');
          let test3 = document.getElementById('detailText');
          test.className = 'none';
          let newDiv = document.createElement('div');

          let btn = document.createElement('BUTTON');
          btn.innerHTML = "Go Back";
          let editBtn = document.createElement('BUTTON');
          editBtn.innerHTML = "Edit";

          let detail = await detailFetch;
          test3.textContent = detail.info;
          test2.appendChild(newDiv);
          test2.appendChild(btn);
          test2.appendChild(editBtn);
          test2.classList.remove('none');
          let bigElementSave = new elementClass(newElement.atomic_number, newElement.symbol, newElement.name, newElement.weight, newElement.category_id, newElement.group_id, newElement.period_id);
          let elementDiv = bigElementSave.createDivs2();
          bigElementSave.appender(elementDiv, 'detailView');
          function toggleEditor() {
             let theText = document.getElementById('detailHold');
             let theEditor = document.getElementById('detailInfo');
             let editorArea = document.getElementById('editor');
             let subject = theText.innerHTML;
             subject = subject.replace(new RegExp("<br />", "gi"), 'n');
             subject = subject.replace(new RegExp("<br />", "gi"), 'n');
             subject = subject.replace(new RegExp("<", "gi"), '<');
             subject = subject.replace(new RegExp(">", "gi"), '>');
             theEditor.value = subject;
             theText.style.display = 'none';
             editorArea.style.display = 'inline';
          }

          function doEdit() {
             let theText = document.getElementById('detailView');
             let theEditor = document.getElementById('detailHold');
             let editorArea = document.getElementById('editor');

             //this is where you would call your AJAX update script
             //e.g., doXMLRequest(data);
             //you probably want to make your DB update BEFORE converting for display

             //set text to be value in editor
             //correct line breaks, prevent HTML injection
             let subject = theEditor.value;
             theText.innerHTML = subject;

             //hide editor, show text
             theText.style.display = 'inline';
             editorArea.style.display = 'none';
          }
          btn.addEventListener('click', function () {
            window.location.reload();
          })
          editBtn.addEventListener('click', function() {
             let theText = document.getElementById('detailText');
             let theEditor = document.getElementById('detailInfo');
             let editorArea = document.getElementById('editor');
             let subject = theText.innerHTML;
             theEditor.value = subject;

             //hide text, show editor
             theText.style.display = 'none';
             editorArea.style.display = 'inline';
          })

          let btnSubmit = document.getElementById("submit");
          btnSubmit.addEventListener("click", function(){
            let theText = document.getElementById('detailText');
            let theEditor = document.getElementById('detailInfo');
            let editorArea = document.getElementById('editor');
            let subject = theEditor.value;
            theText.innerHTML = subject;
            theText.style.display = 'inline';
            editorArea.style.display = 'none';
            let formData = {
              info: theText.textContent
            };

            let configObject = {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify(formData)
            };

            fetch(`http://localhost:3000/details/0/` + (i + 1) + '/0/0', configObject)
              .then(function(response) {
                return response.json();
              })
              .then(function(object) {
                return object;
              });
          });
        });
      }
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

convertArray();

let elementSelect = document.getElementsByClassName('element');
