class elementClass {
  constructor(atomic_number, symbol, name, weight, category_id, group_id, period_id) {
    this.atomic_number = atomic_number;
    this.symbol = symbol;
    this.name = name;
    this.weight = weight;
    this.category_id = category_id;
    this.group_id = group_id;
    this.period_id = period_id;
  }

  toArray(){
    let array = [this.atomic_number, this.symbol, this.name,  this.weight];

    return array;
  }

  toTextNode() {
    let atomicText = document.createTextNode(this.atomic_number),
    symbolText = document.createTextNode(this.symbol),
    nameText = document.createTextNode(this.name),
    weightText = document.createTextNode(this.weight);
    let array = [atomicText, symbolText, nameText, weightText];

    return array;
  }

  addClassId1(elementContainer, elementDisplay, atomicDiv, symbolDiv, nameDiv, weightDiv) {
    atomicDiv.id = 'BATemp';
    symbolDiv.id = 'BSTemp';
    nameDiv.id = 'BNTemp';
    weightDiv.id = 'BWTemp';
    elementDisplay.id = 'bigElementTemp';
    elementContainer.id = 'temp';
  }

  addClassId2(elementDisplay, atomicDiv, symbolDiv) {
    atomicDiv.id = "anum";
    symbolDiv.id = "symbol";
    elementDisplay.className = 'element ' + (" category-" + this.category_id + ' period-' + this.period_id + " group-" + this.group_id) ;
    elementDisplay.id = 'e' + this.atomic_number;
  }

  addTextToDivs(textArray, divArray) {
    for (let i = 0; i < textArray.length; i++) {
      if (textArray[i].textContent != "null") {
        divArray[i].appendChild(textArray[i]);
      }
    }
  }

  createDivs2() {
    let array = [];

    if (this.name != null ) {
      let elementContainer = document.createElement('div');
      let elementDisplay = document.createElement('div');
      let atomicDiv = document.createElement('div');
      let symbolDiv = document.createElement('div');
      let nameDiv = document.createElement('div');
      let weightDiv = document.createElement('div');
      let tempArray = [atomicDiv, symbolDiv, nameDiv, weightDiv];
      this.addClassId1(elementContainer, elementDisplay, atomicDiv, symbolDiv, nameDiv, weightDiv);
      this.addTextToDivs(this.toTextNode(), tempArray);
      array = [elementContainer, elementDisplay, atomicDiv, symbolDiv, nameDiv, weightDiv];
    }
    else {
      let elementDisplay = document.createElement('div');
      let atomicDiv = document.createElement('div');
      let symbolDiv = document.createElement('div');
      let tempArray = [atomicDiv, symbolDiv]
      this.addClassId2(elementDisplay, atomicDiv, symbolDiv);
      this.addTextToDivs(this.toTextNode(), tempArray);
      array = [elementDisplay, atomicDiv, symbolDiv];
    }

    return array;
  }

  appender(array, identifier) {
    let grid = document.getElementById(identifier);
    if (array.length >= 5){
      grid.classList.add('category-' + this.category_id);
      for (let i = 0; i < array.length; i++) {
        grid.appendChild(array[i]);
      }
    }
    else {
      for (let i = 1; i < array.length; i++) {
        array[0].appendChild(array[i]);
      }
      grid.appendChild(array[0]);
    }
  }

  bigElementAppender(textArray, divArray, identifier){
    for(let i = 0; i < textArray.length; i++) {
      divArray[i].textContent = textArray[i];
    }
    identifier.classList.add("category-" + elementNew.category_id);
  }

  elementLocator(key, identifier) {
    if (key == 1) {
      let element = document.getElementById(identifier);
      return element;
    }
    else {
      let elements = document.getElementsByClassName(identifier);
      return elements;
    }
  }
}
